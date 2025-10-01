import {ClipLoader} from 'react-spinners'
export default function Loading(){
    return(
        <div className="container mx-auto flex justify-center items-center h-[50vh]">
            <ClipLoader  color="#000000" size="70px" />
        </div>
    )
}