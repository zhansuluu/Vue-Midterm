import { createApp } from 'vue';

const app = createApp({});

app.directive('validate', {
  bind(el, binding, vnode) {
    el.addEventListener('input', () => {
      const value = el.value
      const validators = binding.value.split('|')
      let isValid = true

      validators.forEach(validator => {
        switch (validator) {
          case 'required':
            isValid = isValid && value.trim() !== ''
            break
          case 'numeric':
            isValid = isValid && !isNaN(value)
            break
          case 'date_format:yyyy-MM-dd':
            isValid = isValid && /^\d{4}-\d{2}-\d{2}$/.test(value)
            break
        }
      })

      vnode.context.$set(vnode.context.fields, el.id, { invalid: !isValid })
    })
  }
})