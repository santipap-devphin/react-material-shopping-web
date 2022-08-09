import React ,{useContext} from 'react';
import DataContext from '../../context/DataContext';
import { Stack , TextField , InputAdornment , Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const SectionLeft = ({searchData , setSearchData}) => {

  const {relateProduct} = useContext(DataContext);
  

  //console.log(relateProduct)
  return (
        <Stack spacing={1} sx={{color:"#000"}}>
                <TextField
                    label="ค้นหาบล๊อค"
                    id="searchblog"
                    InputProps={{
                        endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    variant="outlined"
                    size="small"
                     />
                     <Typography variant='h6'>สินค้าที่คุณสนใจ</Typography>
                     {
                        relateProduct.slice(0,3).map((item , index) => {

                              return ( <Stack key={index} spacing={2} sx={{pt:2 , pb:2}}>
                                          <Stack spacing={2} direction="row">
                                                <img src={item.image} alt='img-sidebar-text' style={{width:"20%"}}/>
                                                <Stack spacing={1}>
                                                <Typography variant='p'>{item.productTitle}</Typography>
                                                <Typography variant='h6'>ราคา <span style={{textDecoration:"line-through",}}>{item.productPrice} </span><span style={{paddingLeft:"5px",color:"#e81c2e"}}>{item.productPriceLast}</span></Typography>
                                                </Stack>
                                           </Stack>
                                     </Stack>)

                        })
                     }
         </Stack>
  )
}

export default SectionLeft