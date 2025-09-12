import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
import SEO from "../component/SEO";

export default function Contact() {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("contact.nameRequired")),
      email: Yup.string()
        .email(t("contact.emailInvalid"))
        .required(t("contact.emailRequired")),
      message: Yup.string().required(t("contact.messageRequired")),
    }),
    onSubmit: (values, { resetForm }) => {
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
      };

      emailjs
        .send(serviceID, templateID, templateParams, publicKey)
        .then(() => {
          toast.success(t("contact.toastSuccess"));
          resetForm();
        })
        .catch((error) => {
          console.error(error);
          toast.error(t("contact.toastError"));
        });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <SEO
        title="Contact Maskn | Rent Apartments & Homes in Egypt"
        description="Need help? Contact Maskn for assistance with your bookings and listings."
      />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {t("contact.Get in Touch")}
                </h2>
                <div className="w-12 h-1 bg-[#C69963] rounded-full"></div>
              </div>

              {/* Name Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-sm">
                  {t("contact.nameLabel")}
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="w-full border-2 border-gray-200 focus:border-[#C69963] focus:ring-2 focus:ring-[#C69963]/20 px-4 py-3 rounded-xl outline-none text-sm transition-all duration-200 bg-gray-50 hover:bg-text-50"
                    placeholder={t("contact.nameLabel")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                </div>

                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-2 flex items-center">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-sm">
                  {t("contact.emailLabel")}
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full border-2 border-gray-200 focus:border-[#C69963] focus:ring-2 focus:ring-[#C69963]/20 px-4 py-3 rounded-xl outline-none text-sm transition-all duration-200 bg-gray-50 hover:bg-text-50"
                    placeholder={t("contact.emailLabel")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-2 flex items-center">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-3 text-sm">
                  {t("contact.messageLabel")}
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    rows="4"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className="w-full border-2 border-gray-200 focus:border-[#C69963] focus:ring-2 focus:ring-[#C69963]/20 px-4 py-3 rounded-xl outline-none resize-none text-sm transition-all duration-200 bg-gray-50 hover:bg-text-50"
                    placeholder={t("contact.msgPlaceholder")}
                  />
                  <div className="absolute top-3 right-0 pr-3 flex items-start pointer-events-none"></div>
                </div>
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-xs mt-2 flex items-center">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#C69963] hover:bg-[#b8935a] text-white py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg text-sm flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>{t("contact.submit")}</span>
              </button>

              {/* Contact Info */}
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2">
            <div className="relative h-96 lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                // src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Contact Us"
                className="w-full h-full object-contain"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C69963]/80 via-[#C69963]/60 to-transparent"></div>

              {/* Content Overlay */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
