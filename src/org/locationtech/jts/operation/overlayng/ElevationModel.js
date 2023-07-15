import Coordinate from '../../geom/Coordinate.js'
import Double from '../../../../../java/lang/Double.js'
import MathUtil from '../../math/MathUtil.js'
import CoordinateSequenceFilter from '../../geom/CoordinateSequenceFilter.js'
export default class ElevationModel {
  constructor() {
    ElevationModel.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._extent = null
    this._numCellX = null
    this._numCellY = null
    this._cellSizeX = null
    this._cellSizeY = null
    this._cells = null
    this._isInitialized = false
    this._hasZValue = false
    this._averageZ = Double.NaN
    const extent = arguments[0], numCellX = arguments[1], numCellY = arguments[2]
    this._extent = extent
    this._numCellX = numCellX
    this._numCellY = numCellY
    this._cellSizeX = extent.getWidth() / numCellX
    this._cellSizeY = extent.getHeight() / numCellY
    if (this._cellSizeX <= 0.0) 
      this._numCellX = 1
    
    if (this._cellSizeY <= 0.0) 
      this._numCellY = 1
    
    this._cells = Array(numCellX).fill().map(() => Array(numCellY))
  }
  static create(geom1, geom2) {
    const extent = geom1.getEnvelopeInternal().copy()
    if (geom2 !== null) 
      extent.expandToInclude(geom2.getEnvelopeInternal())
    
    const model = new ElevationModel(extent, ElevationModel.DEFAULT_CELL_NUM, ElevationModel.DEFAULT_CELL_NUM)
    if (geom1 !== null) model.add(geom1)
    if (geom2 !== null) model.add(geom2)
    return model
  }
  getZ(x, y) {
    if (!this._isInitialized) this.init()
    const cell = this.getCell(x, y, false)
    if (cell === null) return this._averageZ
    return cell.getZ()
  }
  populateZ(geom) {
    if (!this._hasZValue) return null
    if (!this._isInitialized) this.init()
    geom.apply(new (class {
      get interfaces_() {
        return [CoordinateSequenceFilter]
      }
      filter(seq, i) {
        if (!seq.hasZ()) {
          this._isDone = true
          return null
        }
        if (Double.isNaN(seq.getZ(i))) {
          const z = this.getZ(seq.getOrdinate(i, Coordinate.X), seq.getOrdinate(i, Coordinate.Y))
          seq.setOrdinate(i, Coordinate.Z, z)
        }
      }
      isDone() {
        return this._isDone
      }
      isGeometryChanged() {
        return false
      }
    })())
  }
  getCell(x, y, isCreateIfMissing) {
    let ix = 0
    if (this._numCellX > 1) {
      ix = Math.trunc((x - this._extent.getMinX()) / this._cellSizeX)
      ix = MathUtil.clamp(ix, 0, this._numCellX - 1)
    }
    let iy = 0
    if (this._numCellY > 1) {
      iy = Math.trunc((y - this._extent.getMinY()) / this._cellSizeY)
      iy = MathUtil.clamp(iy, 0, this._numCellY - 1)
    }
    let cell = this._cells[ix][iy]
    if (isCreateIfMissing && cell === null) {
      cell = new ElevationCell()
      this._cells[ix][iy] = cell
    }
    return cell
  }
  add() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      geom.apply(new (class {
        get interfaces_() {
          return [CoordinateSequenceFilter]
        }
        filter(seq, i) {
          if (!seq.hasZ()) {
            this._hasZ = false
            
            return null
          }
          const z = seq.getOrdinate(i, Coordinate.Z)
          this.add(seq.getOrdinate(i, Coordinate.X), seq.getOrdinate(i, Coordinate.Y), z)
        }
        isDone() {
          return !this._hasZ
        }
        isGeometryChanged() {
          return false
        }
      })())
    } else if (arguments.length === 3) {
      const x = arguments[0], y = arguments[1], z = arguments[2]
      if (Double.isNaN(z)) return null
      this._hasZValue = true
      const cell = this.getCell(x, y, true)
      cell.add(z)
    }
  }
  init() {
    this._isInitialized = true
    let numCells = 0
    let sumZ = 0.0
    for (let i = 0; i < this._cells.length; i++) 
      for (let j = 0; j < this._cells[0].length; j++) {
        const cell = this._cells[i][j]
        if (cell !== null) {
          cell.compute()
          numCells++
          sumZ += cell.getZ()
        }
      }
    
    this._averageZ = Double.NaN
    if (numCells > 0) 
      this._averageZ = sumZ / numCells
    
  }
}
class ElevationCell {
  constructor() {
    ElevationCell.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._numZ = 0
    this._sumZ = 0.0
    this._avgZ = null
  }
  add(z) {
    this._numZ++
    this._sumZ += z
  }
  compute() {
    this._avgZ = Double.NaN
    if (this._numZ > 0) this._avgZ = this._sumZ / this._numZ
  }
  getZ() {
    return this._avgZ
  }
}
ElevationModel.ElevationCell = ElevationCell
ElevationModel.DEFAULT_CELL_NUM = 3
