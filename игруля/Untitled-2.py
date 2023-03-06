def main(a):
    #a = 'begin{ decl [ "bian"."atema_106" ]=: \'maleve\'; },{ decl [ "reenxe"."xein" ."enlaor_984" ] =:\'ceat_212\'; },end'
    a = a.replace("=", " ")
    a = a.replace('{', ' ')
    a = a.replace("]", ' ')
    a = a.replace("end", ' ')
    a = a.replace("begin", ' ')
    a = a.replace("decl", ' ')
    a = a.replace(',', ' ')
    a = a.replace(':', ' ')
    a = a.replace('}', ' ')
    a = a.replace('[', ' ')
    a = a.replace(';', ' ')
    b = a.split()
    k = {}
    r=[]
    print(b)
    for i in b:
            if not("\'" in i):
                c = i.split('.')
                print(c)
                for j in c:
                    j = j.replace(' ', '')
                    j = j.replace('"', '')
                    print(j)
                    if (j!=''):
                        r.append(j)
            else:
                i = i.replace("'", '')
                print(i)
                k[i]=r
                r = []
    print(k)

main('begin{ decl [ "inus"."ataran_180" . "ragedi"."qubexe"]=:\'orvequ_905\';\n}, { decl ["gees" ."orerla_621"] =:\'alediri_565\';}, {decl ["gebies".\n"bigeor_243" ] =:\'oninat_481\'; }, { decl [ "soon_33" . "enrama_602" .\n"rece_446"] =: \'abi\'; }, end')

