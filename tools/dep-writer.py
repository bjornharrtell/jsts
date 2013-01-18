from sys import argv, stdout, stderr
from os.path import realpath, basename, split, join, exists
from re import compile, search, DOTALL
from os import sep

def modules(content):
    '''
    '''
    pattern = compile(r'\bjsts(\.\w+)+\b')
    index = 0

    while True:
        match = pattern.search(content, index)
        
        if not match:
            break
        
        index = match.end()

        yield match

def requirements(filename, module):
    '''
    '''
    head, tail = split(realpath(filename))
    
    while tail and tail != module:
        head, tail = split(head)
    
    content = open(filename).read()
    requirements, seen = set(), set()
    
    for match in modules(content):
        parts = match.group().split('.')
        
        for index in range(1, len(parts)):
            reqname = sep.join(parts[:index+1]) + '.js'
            reqpath = join(head, reqname)
            
            if reqpath in seen:
                continue
            
            seen.add(reqpath)
            
            if not exists(reqpath):
                continue
            
            if realpath(filename) == realpath(reqpath):
                continue
                
            requirements.add(reqname)

    return list(requirements)

if __name__ == '__main__':

    filename = argv[1]
    contents = open(filename).read()
    preamble = search(r'^/\*.+?\*/', contents, DOTALL)
    required = sorted(requirements(filename, 'jsts'))
    
    if not required:
        print >> stderr, 'Skipping', filename
        exit()
    
    print >> stderr, 'Fixing', filename
    out = open(filename, 'w')
    
    if preamble:
        out.write(preamble.group())
        index = preamble.end()
    else:
        index = 0
    
    out.write('\n\n/**\n')
    out.write(' * Other modules referenced here:\n')
    
    for file in required:
        out.write(' * @requires %(file)s\n' % locals())
    
    out.write(' */\n')
    out.write(contents[index:])
    out.close()
