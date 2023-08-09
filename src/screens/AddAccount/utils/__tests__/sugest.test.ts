import { findNextChildCode } from "../sugest"

describe('Sugest', () => {
    it('Cenário 1: Diante do cenário onde já existam as contas 1, 1.2, 1.2.1, 1.2.5. Se o usuário selecionar o pai 1.2 a aplicação deve sugerir 1.2.6:', () => {
        const notesCodes: any = [{code:'1.2.1'}, {code:'1.2.5'}]

        const parentCode = '1.2'

        const sugestedCode = findNextChildCode(notesCodes, parentCode)

        expect(sugestedCode).toEqual('1.2.6')
    }) 

    it('Cenário 2: Diante do cenário onde já existam as contas 1, 1.2, 1.2.1, 1.2.999. Se o usuário selecionar o pai 1.2 a aplicação deve sugerir 1.3:', () => {
        const notesCodes: any = [{code:'1.2.1'}, {code:'1.2.999'}]

        const parentCode = '1.2'

        const sugestedCode = findNextChildCode(notesCodes, parentCode)

        expect(sugestedCode).toEqual('1.3')
    })    

    it('Cenario 3: Se atente para criar uma lógica que consiga sugerir o novo pai 9 com o próximo filho 9.11 caso você tente buscar um código para o pai 9.9.999.999 em um plano de contas que já tenha os seguintes registros.', () => {
        const notesCodes: any = [{code: '9.9.999.999.998'}, {code:'9.9.999.999.999'},{code: '9.10'}]

        const parentCode = '9.9.999.999'

        const sugestedCode = findNextChildCode(notesCodes, parentCode)

        expect(sugestedCode).toEqual('9.11')
    }) 
       
    it('Should ...', () => {
        const notesCodes: any = [{code: '2.5.3'}, {code:'2.5.2'},{code: '2.5.1'}]

        const parentCode = '2.5'

        const sugestedCode = findNextChildCode(notesCodes, parentCode)

        expect(sugestedCode).toEqual('2.5.4')
    })

    it('Should ...', () => {
        const notesCodes: any = []

        const parentCode = '2.5'

        const sugestedCode = findNextChildCode(notesCodes, parentCode)

        expect(sugestedCode).toEqual('2.5.1')
    })

    it('Should ...', () => {
        const notesCodes: any = [{code: '2.5.998'}, {code:'2.5.999'}]

        const parentCode = '2.5'

        const sugestedCode = findNextChildCode(notesCodes, parentCode)

        expect(sugestedCode).toEqual('2.6')
    })

    it('Should ...', () => {
        const notesCodes: any = [{code: '2.999.998'}, {code:'2.999.999'}]

        const parentCode = '2.999'

        const sugestedCode = findNextChildCode(notesCodes, parentCode)

        expect(sugestedCode).toEqual('3')
    })


})