require('../');

// ported Jasmine assertions used in specs
global.expect = function(e) {
    return {
        toBe: function(a) {
            return e === a;
        },
        toEqual: function(a) {
            return e === a;
        },
        toBeDefined: function() {
            return typeof w !== undefined;
        },
        toBeTruthy: function() {
            return e;
        },
        toBeFalsy: function() {
            return !e;
        },
        toBeNull: function() {
            return e === null;
        },
        toBeCloseTo: function(a, p) {
            return Math.abs(e - a) < (Math.pow(10, -p) / 2);
        },
        not: {
            toBe: function(a) {
                return e !== a;
            },
        }
    }
};

