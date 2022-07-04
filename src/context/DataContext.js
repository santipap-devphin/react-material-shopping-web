import { createContext , useState , useEffect , useRef } from "react";
import { createTheme } from '@mui/material/styles';
import listitem from '../data/product/products.json'
const DataContext = createContext({});

export const DataProvider = ({children}) => { 

    const [menuBar, setMenuBar] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
     });
     const [scroll, setScroll] = useState(0);
     const [headerTop, setHeaderTop] = useState(0);
     const [sizeScreen , setSizeScreen] = useState(0);
     const [detactMobile , setDetactMobile] = useState(false);
     const [statusDelCart , setStatusDelCart] = useState(false);
     const [pos , setPos] = useState(false);
     const myRef = useRef(null);
     const [items, setItems] =  useState(0);
     const [products , setProducts] = useState([]);
     const [totalPrice , setTotalPrice] = useState(0);
     const [reData , setRedata] = useState([]);
     const [auth , setAuth] = useState({});
     const [relateProduct , setRelateProduct] = useState(JSON.parse(localStorage.getItem('relateproduct')))
     const [listCartProduct , setListCartProduct] = useState(JSON.parse(localStorage.getItem('cartproduct')));
     const [listWishList , setListWishList] = useState(JSON.parse(localStorage.getItem('wishlist')));
     const [listCompare , setListCompare] = useState(JSON.parse(localStorage.getItem('compare')));
     const [userLogin , setUserLogin] = useState(JSON.parse(localStorage.getItem('userlogin')))
     var newArr = [];
     const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setMenuBar({ ...menuBar, [anchor]: open });
      };

      const handleTop = () => {
      
        window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
        setPos(false);

      };

      const handleScroll = () => {
  
        //console.log(window.scrollY)
        if (window.scrollY > 700) {
                setPos(true);
        } else {
                setPos(false);
        }
    
        setScroll(window.scrollY);
        };

      useEffect(() => {
        const header = document.querySelector(".sticky-bar");
        setHeaderTop(header.offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

      useEffect(() => {
  
        setSizeScreen(window.screen.availWidth)
        if(window.screen.availWidth < 768){
              setDetactMobile(true)
        }
    
      },[])

      useEffect(()=> {

        listitem.forEach((val , index)=>{
            
             Object.keys(val).map((renew) => {
                 for(var i=0; i < val[renew].length; i++){

                        newArr.push(val[renew][i]);
                 }
                 
               

             });

        })

        setRedata(newArr)
      },[])



      const theme = createTheme({
        root: {
          margin: "0px",
          padding: "0px"
        }
        , palette: {
          primary: {
            main: "#fdbe33",
          },
          action: {
            disabledBackground: '#696969',
            disabled: '#696969'
            
          }
          
        },
        typography: {
          fontFamily: "Kanit",
          fontWeightBold:100,
          fontWeightLight: 300,
        }
      });

    const styles = {
        paperContainer: {
            backgroundImage: `url(${'../../assets/img/slider-36.jpg'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        },
        cardBg: {
          backgroundImage: `url(${'../../assets/img/banner-51.png'})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
        bgShip: {
           backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#303030',
           
        },
        cardfooter: {
          backgroundImage: `url(${'../../assets/img/banner-54.png'})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
        notchedOutline: {
          borderWidth: "1px",
          borderColor: "yellow !important"
        }
        ,
        bgFooter:{
          backgroundColor:"#fdbe33",
          textAlign:"center",
          color:"#fff",
          padding:"20px"
        },
        bgFooterGray:{
          backgroundColor:"#f6f6f8",
          textAlign:"center",
          color:"#fff",
          padding:"20px"
         },
        textWhite:{
          color:"#fff"
        }
        ,
        textBlack:{
          color:"#000"
        }
        ,bgTextField:{
          backgroundColor:" #2e7d32" ,
          color: "#fff"
        }
        
      };

   return (
            <DataContext.Provider value={{menuBar , setMenuBar , scroll , setScroll , headerTop , setHeaderTop , sizeScreen , setSizeScreen
             ,detactMobile , setDetactMobile , pos , setPos , toggleDrawer , handleTop , myRef , items, setItems , theme , styles , setListCartProduct , 
             listCartProduct , statusDelCart , setStatusDelCart , products , setProducts , totalPrice , setTotalPrice , reData , setRedata , relateProduct , setRelateProduct ,
             listWishList , setListWishList , listCompare , setListCompare , userLogin , setUserLogin , auth , setAuth
            }}>
                {children}
            </DataContext.Provider>
       )

}



export default DataContext;