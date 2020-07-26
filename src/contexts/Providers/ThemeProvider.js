import React, { Component, createContext } from 'react'
import { Trans } from 'react-i18next'

export const ThemeContext = createContext('theme')

class ThemeProvider extends Component {


  snackbar = {
    open: false,
    type: 'info',

    //link: null,
    //linkMessage: null,
    //data:null,
    autoHideDuration: 2000,
    message: null,
    options: {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
    }
  }


  setInstallEvent = installEvent => this.setState({ installEvent })

  toggleMuiType = () => {
    let { muiType } = this.state
    localStorage.setItem('theme', muiType === 'light' ? "dark" : "light");
    //console.log(muiType === 'light' ? "dark" : "light")
    this.setState({ muiType: muiType === 'light' ? "dark" : "light" })
  }

  setMuiType = (muiType) => {
    this.setState({ muiType })
  }

  setHeaderVisisble = headerVisible => this.setState({ headerVisible })

  dialog = {
    title: "Message",
    message: null,
    moreInfo: null,
    open: false,
    icon: null,
    modal: false,
    inputlabel: <Trans>setData</Trans>,
    err: null
  }

  showDialog = type => options => this.setState({
    dialog: {
      ...this.dialog,
      type,
      ...options,
      open: true,
    }
  })

  hideDialog = () => this.setState({
    dialog: {
      ...this.state.dialog,
      open: false,
    }
  })

  setNotificationRequestDialogVisible = value => this.setState({ notificationRequestDialogVisible: value })

  showSnackbar = type => options => this.setState({
    snackbar: {
      ...this.snackbar,
      type,
      ...options,
      open: true,
    }
  })

  hideSnackbar = () => this.setState({
    snackbar: {
      ...this.state.snackbar,
      open: false,
    }
  })

  setTitle = (title, icon) => {
    this.setState({
      title, icon
    })
  }

  toggleSidebar = () => this.setState(state => {
    return { sidebarOpen: !state.sidebarOpen }
  })

  setUIReportDownloader = (UIReportDownloader) => this.setState({UIReportDownloader})

  setSidebarOpen = sidebarOpen => this.setState({ sidebarOpen })


  state = {

    muiType: localStorage.getItem('theme') || "light",// ? mui theme 
    toggleMuiType: this.toggleMuiType,// ? mui theme 
    setMuiType: this.setMuiType,

    UIReportDownloader: false,
    setUIReportDownloader: this.setUIReportDownloader,
    title: "", // ? Header and SEO title
    icon: null, // ? Header Icon
    setTitle: this.setTitle,// ? set title and icon

    headerVisible: true,//? header visible or not
    setHeaderVisible: this.setHeaderVisisble, //? header visible or not

    //sidebarOpen: !Boolean(window.md.mobile()),
    sidebarOpen: !Boolean(window.md.mobile()),
    setSidebarOpen: this.setSidebarOpen,
    toggleSidebar: this.toggleSidebar,

    setInstallEvent: this.setInstallEvent,

    dialog: {},
    showSuccessDialog: this.showDialog("success"),
    showErrorDialog: this.showDialog("error"),
    showInfoDialog: this.showDialog("info"),
    showWarningDialog: this.showDialog("warning"),
    showDialog: this.showDialog("info"),
    hideDialog: this.hideDialog,

    snackbar: this.snackbar,
    showSuccessNotification: this.showSnackbar("success"),
    showErrorNotification: this.showSnackbar("error"),
    showInfoNotification: this.showSnackbar("info"),
    showWarningNotification: this.showSnackbar("warning"),
    showNotification: this.showSnackbar('info'),
    hideSnackbar: this.hideSnackbar,
  }


  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeProvider