// ? configurations of the frontend (names, functions, etc.)

const config = {
    mobileScreenWidth: "800px",
    name: {
        short: "PERN",
        long: "PERN Boilerplate",
        link: 'https://www.linkedin.com/in/michelangelodefrancesco/'
    },
    palette: {
        primaryColor: "#86DAF1",
        secondaryColor: "#F3ff45"
    },
    theme: {
        roundLoader:{
            color: "#86DAF1"
        },
        forceTextColor: {
            //light: "#eaa",
            //dark: "#ada"
        },
        header: {
            enabled: true,
            color:"#86DAF1",
            shadow: true
        },
        sidebar: {
            enabled: true,
            drawerWidth: 240,
            activeColor:"#86DAF1"
        },
        bottomNavigation:{
            enabled:true,
            showLabels: false,
            showOnDesktop: false,
            activeColor:"#86DAF1"
        }

    }
}
export default config