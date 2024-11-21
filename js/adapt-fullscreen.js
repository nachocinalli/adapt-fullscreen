import Adapt from 'core/js/adapt';
import FullscreenNavView from './FullscreenNavView';
import NavigationButtonModel from 'core/js/models/NavigationButtonModel';
import navigation from 'core/js/navigation';

class Fullscreen extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, { 'app:dataReady': this.onDataReady });
  }

  static get courseConfig() {
    return Adapt.course.get('_fullscreen');
  }

  static get globalsConfig() {
    return Adapt.course.get('_globals')?._extensions?._fullscreen;
  }

  get isEnabled() {
    return Boolean(Fullscreen.courseConfig?._isEnabled);
  }

  onDataReady() {
    if (!this.isEnabled) return;
    this.setupListeners();
  }

  setupListeners() {
    this.listenToOnce(Adapt, 'router:location', this.setupView);
  }

  setupView() {
    if ($('.nav__navigationfullscreen').length) return;
    const { _navOrder = 100, _showLabel = true, navLabel = '', _navTooltip = {} } = Fullscreen.globalsConfig ?? {};
    const model = new NavigationButtonModel({
      _id: 'navigationfullscreen',
      _order: _navOrder,
      _classes: 'btn-icon nav__btn nav__navigationfullscreen fullscreen__nav',
      _iconClasses: 'icon-video-fullscreen',
      _role: 'button',
      _showLabel,
      ariaLabel: navLabel,
      _navTooltip,
      _courseConfig: Fullscreen.courseConfig
    });

    navigation.addButton(
      new FullscreenNavView({
        model
      })
    );
  }

  remove() {
    $('.nav__navigationfullscreen').remove();
  }
}

export default new Fullscreen();
