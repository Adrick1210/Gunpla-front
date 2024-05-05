import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="showcase">
          <img
            src="https://shop.bandaicollectors.com.mx/cdn/shop/collections/HeadersCategorias-1920-x-480-Gunpla.jpg?v=1703908536"
            alt="banner"
          />
        </div>
        <div className="showcase">
          <img
            src="https://pbs.twimg.com/media/GH3XVBAWgAAD93F.jpg"
            alt="banner"
          />
        </div>
        <div className="showcase">
          <img
            src="https://itisagunpla.files.wordpress.com/2020/06/victory-2-box.jpg"
            alt="banner"
          />
        </div>
        <div className="showcase">
          <img
            src="https://cgtdownloads.blob.core.windows.net/images/images/MG_Sazabi_ver_KA_new_Boxart.webp"
            alt="banner"
          />
        </div>
        <div className="showcase">
          <img
            src="https://4.bp.blogspot.com/-FfJ9acb03Ug/TuoHGi5eJ6I/AAAAAAABnBI/epVUsbPodnQ/s1600/111.jpg"
            alt="banner"
          />
        </div>
      </Slider>
    </div>
  );
}
export default Carousel;
