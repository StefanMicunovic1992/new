import { useSelector } from 'react-redux';
import ComponentForhHelloMesage from '../DivWithHelloMesage/ComponentForhHelloMesage';
import SelectedPodcast from '../SelectedPodcast/SelectedPodcast';


function MainDiv(){
    
    const idOfSelectedPodcast = useSelector((state) => state.onePodcast.selectedPodcast);

    return(
        <section id='mainSection'>
            {
                idOfSelectedPodcast.length>0?<SelectedPodcast></SelectedPodcast>:<ComponentForhHelloMesage></ComponentForhHelloMesage>
            }
        </section>
    )
}



export default MainDiv