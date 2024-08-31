import {useSelector} from 'react-redux'
const FullscreenLoader = () => {
    const settings = useSelector(
        (state) => state.settings.loader
    );
    return (
        <>
            <div className={settings+ "LoadingOverlay"}>
                <div className='Line-Progress'>
                    <div className='indeterminate'></div>
                </div>
            </div>
        </>
    )
}

export default FullscreenLoader;