/* eslint-env jasmine */
'use strict'
import { add, calculations, deleteLastDigit, totalDelete } from './logic.js'

describe('calculator logic', function () {
  describe('add new value', function () {
    it('should throw an exception if value is not a string', function () {
      const keyValue = true
      const totalCalculator = '6'

      let errorExeption
      try {
        add(keyValue, totalCalculator)
      } catch (error) {
        errorExeption = error
      }

      expect(errorExeption).toBeDefined()
      expect(errorExeption instanceof TypeError).toBeTruthy()
      expect(errorExeption.message).toBe(`${keyValue} is not a string`)
    })

    it('should throw an exception totalCalculator is not a string', function () {
      const keyValue = '2'
      const totalCalculator = 5

      let errorExeption
      try {
        add(keyValue, totalCalculator)
      } catch (error) {
        errorExeption = error
      }

      expect(errorExeption).toBeDefined()
      expect(errorExeption instanceof TypeError).toBeTruthy()
      expect(errorExeption.message).toBe(`${totalCalculator} is not a string`)
    })

    it('should concatenate when added arithmetic operator to zero', function () {
      const keyValue = '/'
      const totalCalculator = '0'

      const result = add(keyValue, totalCalculator)
      expect(result).toBe('0/')
    })

    it('should replace zero when adding a number', function () {
      const keyValue = '4'
      const totalCalculator = '0'

      const result = add(keyValue, totalCalculator)
      expect(result).toBe('4')
    })

    it('should replace zero preceded by an arithmetic operator when adding a number to it', function () {
      let keyValue = '4'
      let totalCalculator = '2+0'
      let result = add(keyValue, totalCalculator)
      expect(result).toBe('2+4')

      keyValue = '4'
      totalCalculator = '2*3/8-0'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('2*3/8-4')

      keyValue = '4'
      totalCalculator = '2+4*5/1.0*0'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('2+4*5/1.0*4')
    })

    it('should concatenate the added value', function () {
      const keyValue = '4'
      const totalCalculator = '6'

      const result = add(keyValue, totalCalculator)
      expect(result).toBe('64')
    })

    it('should concatenate a dot if can add decimals', function () {
      const keyValue = '.'

      let totalCalculator = '6+'
      let result = add(keyValue, totalCalculator)
      expect(result).toBe('6+.')

      totalCalculator = '2'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('2.')

      totalCalculator = '6/2.3*4'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('6/2.3*4.')
    })

    it('should  not concatenate a dot if can\'t add decimals', function () {
      const keyValue = '.'

      let totalCalculator = '2.'
      let result = add(keyValue, totalCalculator)
      expect(result).toBe('2.')

      totalCalculator = '1*3.4'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('1*3.4')
    })

    it('should concatenate an operator if the last digit is a number', function () {
      const keyValue = '*'

      let totalCalculator = '2'
      let result = add(keyValue, totalCalculator)
      expect(result).toBe('2*')

      totalCalculator = '1/3.4'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('1/3.4*')
    })

    it('should concatenate an operator if the last digit is a number', function () {
      const keyValue = '*'

      let totalCalculator = '2'
      let result = add(keyValue, totalCalculator)
      expect(result).toBe('2*')

      totalCalculator = '1/3.4'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('1/3.4*')
    })

    it('should change the operator if the last digit is an operator', function () {
      let keyValue = '+'
      let totalCalculator = '7-'
      let result = add(keyValue, totalCalculator)
      expect(result).toBe('7+')

      keyValue = '*'
      totalCalculator = '1*3.4/'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('1*3.4*')
    })

    it('should not add an operator if the last digit is a dot', function () {
      let keyValue = '*'
      let totalCalculator = '2.'
      let result = add(keyValue, totalCalculator)
      expect(result).toBe('2.')

      keyValue = '/'
      totalCalculator = '4+3.'
      result = add(keyValue, totalCalculator)
      expect(result).toBe('4+3.')
    })
  })

  describe('calculate result', function () {
    it('should calculate the result of the given operation', function () {
      let totalCalculator = '6+9-2*12/4'
      let result = calculations(totalCalculator)
      expect(result).toBe('9')

      totalCalculator = '2.2+9.93-2.509*13.02/3.12'
      result = calculations(totalCalculator)
      expect(result).toBe('1.66')
    })
  })

  describe('delete last digit', function () {
    it('should remove the last digit from totalCalculator', function () {
      let totalCalculator = '2'
      let result = deleteLastDigit(totalCalculator)
      expect(result).toBe('0')

      totalCalculator = '23+45-'
      result = deleteLastDigit(totalCalculator)
      expect(result).toBe('23+45')
    })
  })

  describe('total delete', function () {
    it('should reset the content of the calculator', function () {
      const totalCalculator = '23+44-2*7/5'
      const result = totalDelete(totalCalculator)
      expect(result).toBe('0')
    })
  })
})
