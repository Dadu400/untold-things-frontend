import BannerImage from '../../assets/icons/banner.png';
import BannerImage2 from '../../assets/icons/banner-without-border.png';

function Banner() {
    return (
        <section className="w-[86%] md:w-[80%] max-w-[900px] mx-auto mt-5 mb-4 md:my-8">
            <img src={BannerImage}  alt="Banner" className="block dark:hidden" />
            <img src={BannerImage2} alt="Banner" className="hidden dark:block" />
        </section>
    );
}

export default Banner;
