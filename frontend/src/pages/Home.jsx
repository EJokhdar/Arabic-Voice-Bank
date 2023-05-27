import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import solve from "../assets/solve-team.jpeg";
import alfaisal from "../assets/alfaisal.jpeg";
import campus from "../assets/campus.jpeg";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="upper-layer">
        <div className="contentHome">
          <div className="card-home">
            <div className="image-home">
              <img src={solve} className="solve" alt="solveathon" />
            </div>
            <div className="text-home">
              <h1 className="about-project">عن المشروع</h1>
              <p className="about-p">
                يوجد أكثر من 10,000 مريض يعانون من مرض الخلايا العصبية الحركية
                (MND) في المملكة العربية السعودية. في حين تم تطوير العديد من
                الجهود والحلول في الخارج لتحسين جودة حياة مرضى MND الآخرين عن
                طريق بنك الأصوات وتوليد الأصوات الاصطناعية لهم ، إلا أنه لم يتم
                بذل أي جهد لتضمين اللغة العربية. من واجبنا كأمة عربية مساعدة
                المرضى العرب. هنا في مختبر الذكاء الاصطناعي بجامعة الفيصل ،
                شعرنا بأن المسؤولية لإنشاء بنك أصوات عربي في المنطقة العربية تقع
                على عاتقنا. تحت إشراف الدكتورة أريج الوابل ، قام ثلاثة طلاب
                بتنفيذ هذا المشروع.
              </p>
            </div>
          </div>
          <div className="card-home">
            <div className="text-home">
              <Link to="https://coe.alfaisal.edu/pdf/centers/AI%20Center%20&%202021%20Calendar%20.pdf">
                <h1 className="AICenter">مركز الذكاء الاصطناعي</h1>
              </Link>
              <p className="AI-p">
                مركز الذكاء الاصطناعي في جامعة الفيصل هو مركز متميز في البحث
                والتعليم والنظرية والممارسة في مجال الذكاء الاصطناعي. يستضيف
                المركز مجموعات بحثية متنوعة تقوم بإجراء بحوث رائدة في جميع
                مجالات الذكاء الاصطناعي بما في ذلك: الروبوتات ، التعلم الآلي ،
                التعلم العميق ، معالجة اللغة الطبيعية ، الرؤية والتعلم ، الرعاية
                الصحية ، سياسات الذكاء الاصطناعي الملكية و الفكرية ، الفنون
                والذكاء الاصطناعي المتصل بالعلوم الإدراكية والعصبية. يقوم أعضاء
                هيئة التدريس لدينا بإجراء بحوث عالمية المستوى ويتم التعرف عليهم
                لتطوير شراكات مع الصناعة والمجتمع التجاري ، وتنتج الشركات
                الناشئة التابعة لنا تقنيات ناشئة في نطاق الطب الحيوي والفنون.
              </p>
            </div>
            <div className="image-home">
              <img src={alfaisal} className="alfaisal" alt="ai" />
            </div>
          </div>
          <div className="card-home">
            <div className="image-home">
              <img src={campus} className="campus" alt="campus" />
            </div>
            <div className="text-home">
              <Link to="https://www.alfaisal.edu/en/">
                <h1 className="university">عن الجامعة</h1>
              </Link>
              <p className="university-p">
                تأسست جامعة الفيصل عام 2002 وهي مؤسسة تعليمية معتمدة بالكامل من
                المركز الوطني للتقويم والاعتماد الأكاديمي في المملكة العربية
                السعودية. ويتميز الحرم الجامعي الخلاب بالتصميم المعماري، حيث يقع
                على أراضي قصر صاحب الجلالة الملك فيصل بن عبدالعزيز رحمه الله في
                العاصمة، الرياض. وتعتبر جامعة الفيصل الجوهرة الثمينة في مؤسسة
                الملك فيصل العالمية. تضم الجامعة أكثر من 3000 طالبًا يمثلون أكثر
                من 40 دولة، حيث يتم تسجيل الطلاب الجامعيين في إحدى الكليات الخمس
                في الجامعة: الأعمال، الهندسة، الطب، العلوم، والصيدلة. كما يتاح
                للطلاب فرصة مواصلة دراستهم في الحرم الجامعي من خلال الحصول على
                درجة الدراسات العليا في إحدى التخصصات المتاحة في الأعمال،
                الهندسة، علوم النانو، العلوم الطبية، وعلوم الصحة.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
