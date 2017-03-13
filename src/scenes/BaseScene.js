import { Component } from 'react';

export default class BaseScene extends Component {
  forceRefreshUpdate() {
    console.log('forceRefreshUpdate', this.refreshData);
    if (this.refreshData) {
      this.refreshData();
    }
  }
}
