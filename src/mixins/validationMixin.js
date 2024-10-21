export const validationMixin = {
    data() {
      return {
        fields: {},
        errors: {}
      }
    },
    methods: {
      validateField(fieldName, value, rules) {
        this.errors[fieldName] = []
        
        rules.split('|').forEach(rule => {
          const [ruleName, ruleValue] = rule.split(':')
          
          switch (ruleName) {
            case 'required':
              if (!value || value.trim() === '') {
                this.errors[fieldName].push('This field is required')
              }
              break
            case 'min':
              if (value.length < parseInt(ruleValue)) {
                this.errors[fieldName].push(`Minimum length is ${ruleValue} characters`)
              }
              break
            case 'max':
              if (value.length > parseInt(ruleValue)) {
                this.errors[fieldName].push(`Maximum length is ${ruleValue} characters`)
              }
              break
            case 'email':
              // eslint-disable-next-line no-case-declarations
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (!emailRegex.test(value)) {
                this.errors[fieldName].push('Invalid email format')
              }
              break
            case 'numeric':
              if (isNaN(value)) {
                this.errors[fieldName].push('This field must be a number')
              }
              break
            case 'date_format':
              // eslint-disable-next-line no-case-declarations
              const dateRegex = /^\d{4}-\d{2}-\d{2}$/
              if (!dateRegex.test(value)) {
                this.errors[fieldName].push('Invalid date format (YYYY-MM-DD)')
              }
              break
          }
        })
  
        this.$set(this.fields, fieldName, {
          dirty: true,
          invalid: this.errors[fieldName].length > 0
        })
      },
      validateForm() {
        let isValid = true
        for (const fieldName in this.fields) {
          if (this.fields[fieldName].invalid) {
            isValid = false
            break
          }
        }
        return isValid
      },
      resetValidation() {
        this.fields = {}
        this.errors = {}
      },
      getFieldError(fieldName) {
        return this.errors[fieldName] && this.errors[fieldName].length > 0
          ? this.errors[fieldName][0]
          : null
      }
    }
  }