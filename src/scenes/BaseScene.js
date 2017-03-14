import { Component } from 'react';

export default class BaseScene extends Component {
  forceRefreshUpdate() {
    if (this.refreshData) {
      this.refreshData();
    }
  }
}
