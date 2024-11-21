import Adapt from 'core/js/adapt';
import tooltips from 'core/js/tooltips';
import NavigationButtonView from 'core/js/views/NavigationButtonView';

export default class FullscreenNavView extends NavigationButtonView {
  events() {
    return {
      click: 'onFullscreen'
    };
  }

  attributes() {
    return {
      ...super.attributes(),
      'data-tooltip-id': this.model.get('_id')
    };
  }

  initialize(options) {
    super.initialize(options);
    this.setupEventListeners();
    this.render();

    tooltips.register({
      _id: this.model.get('_id'),
      ...(this.model.get('_navTooltip') || {})
    });
  }

  onFullscreen() {
    let iconClasses = 'icon-video-fullscreen';
    if (document.fullscreenElement) {
      iconClasses = 'icon-video-fullscreen';
      document.exitFullscreen();
    } else {
      iconClasses = 'icon-video-exit-fullscreen';
      document.documentElement.requestFullscreen();
    }
    this.model.set('_iconClasses', iconClasses);
  }

  setupEventListeners() {
    this.listenTo(Adapt, {
      fullscreen: this.onFullscreen
    });
  }

  static get template() {
    return 'fullscreenNav.jsx';
  }
}
