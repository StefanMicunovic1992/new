import { useSelector } from 'react-redux';
import ComponentForhHelloMesage from '../DivWithHelloMesage/ComponentForhHelloMesage';
import SelectedPodcast from '../SelectedPodcast/SelectedPodcast';



function MainDiv(){
    
    const idOfSelectedPodcast = useSelector((state) => state.onePodcast.selectedPodcast);

    return(
            idOfSelectedPodcast.length>0?<SelectedPodcast></SelectedPodcast>:<ComponentForhHelloMesage></ComponentForhHelloMesage>
    )
}



export default MainDiv