import tooltipDirective from './Tooltip/'
import VClickOutside from '@/directives/click-outside/VClickOutside'
// register all directives
const directives = (app) => {
  tooltipDirective(app)
  app.directive('click-outside', VClickOutside)
}

export default directives
