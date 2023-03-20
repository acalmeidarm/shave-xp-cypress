/// <reference types="cypress" />

import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import header from '../support/components/header'


describe('app', () => {
  context('quando submeto o formulario', () => {

    it('deve logar com sucesso', () => {
      const user = {
        name: 'Ana',
        email: 'ana@gmail.com',
        password: 'pwd123'
      }

      loginPage.submit(user.email, user.password)
      shaversPage.header.userShouldBeLoggedIn(user.name)

    })

    it('não deve logar com senha incorreta', () => {
      const user = {
        name: 'Ana',
        email: 'ana@gmail.com',
        password: 'abc123'
      }
      loginPage.submit(user.email, user.password)


      const message = ('Ocorreu um erro ao fazer login, verifique suas credenciais.')
      loginPage.noticeShouldBe(message)

    })

    it('não deve logar com email não cadastrado', () => {
      const user = {
        name: 'Ana',
        email: 'mariana@gmail.com',
        password: 'abc123'
      }

      loginPage.submit(user.email, user.password)


      const message = ('Ocorreu um erro ao fazer login, verifique suas credenciais.')
      loginPage.noticeShouldBe(message)

    })

    it('campos obrigatórios', () => {
      loginPage.submit()
      loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
    })
  })

  context('senha muito curta', () => {
    const passwords = [
      '1',
      '2',
      '123',
      '1234',
      '12345'
    ]
    passwords.forEach((p) => {
      it(`não deve logar com a senha:  ${p}`, () => {
        loginPage.submit('ana@gmail.com', p)

        loginPage.alertShouldBe('Pelo menos 6 caracteres')
      })

    });

  })

  context('emails incorretos', () => {
    const emails = [
      'ana&gmail.com',
      'ana.com.br',
      '@gmail.com',
      '@',
      'ana@',
      '121323',
      '@#$%&*(*&%$',
      'xpto123'


    ]
    emails.forEach((e) => {
      it(`não deve logar com o email:  ${e}`, () => {
        loginPage.submit(e, 'pwd123')
        loginPage.alertShouldBe('Informe um email válido')

      })
    })
  })
})