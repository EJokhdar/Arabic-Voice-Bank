import Navbar from "../layouts/Navbar";
import recording_ui from "../assets/recording-ui.jpeg";
import Footer from "../layouts/Footer";
const Help = () => {
  return (
    <>
      <Navbar />
      <div className="upper-layer">
        <div className="contentHome">
          <div className="card-home">
            <div>
              <img
                src={recording_ui}
                className="recording-ui"
                alt="recording UI"
              />
            </div>
            <div>
              <h1 className="help-h1">واجهة التسجيل</h1>
              <p>
                تتكون واجهة التسجيل من أربعة أزرار، وهذه الأزرار هي "السابق، بدء
                التسجيل، الاستماع، التالي".
              </p>
              <ul className="help-ul">
                <li>- يقوم زر "السابق" بأخذك إلى النص السابق.</li>
                <li>
                  - يقوم زر "بدء التسجيل" ببدء تسجيل صوتك. سيتحول إلى "إيقاف
                  التسجيل" بمجرد الضغط عليه. يمكنك الضغط على "إيقاف التسجيل"
                  لإيقاف تسجيل صوتك.
                </li>
                <li>
                  - يقوم زر "الاستماع" بإعادة تشغيل التسجيل الصوتي الذي سجلته
                  للتو.
                </li>
                <li>- يقوم زر "التالي" بأخذك إلى النص التالي.</li>
                <li>
                  - تحت الأزرار يمكنك رؤية شريط التقدم الخاص بك لتسجيلات النص.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Help;
