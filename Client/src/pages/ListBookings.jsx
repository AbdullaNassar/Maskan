import { useParams } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  CalendarCheck,
  DollarSign,
  CreditCard,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  CalendarX,
  Search,
  BookOpen,
} from "lucide-react";

import { useListBookings } from "../features/booking/useListBookings";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import { formatDate, formatNumber, formatPrice } from "../utils/helper";
import { useTranslation } from "react-i18next";
import SEO from "../component/SEO";

export default function ListBookings() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const { data, error, isLoading } = useListBookings(id);

  // handel loading and error states
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error?.message} />;

  // handle empty state
  if (!data.results) return <NoBookings />;

  return (
    <div className="mt-8 space-y-12">
      <SEO
        title={`Bookings for ${data?.bookings?.[0].listing?.title} | Maskn`}
        description={`View and manage all bookings for ${data?.bookings?.[0].listing?.title}, Egypt on Maskn.`}
      />
      <h2 className="text-xl font-semibold">
        {t("profile.Bookings details for")}{" "}
        {lang === "en"
          ? `${data?.bookings?.[0].listing?.title}`
          : `${data?.bookings?.[0].listing?.arTitle}`}
      </h2>
      <TotalBookingsMinimal data={data} />
      <div className="grid sm:grid-cols-2 gap-x-2 gap-y-4">
        {data.bookings.map((list) => {
          return <ListItem key={list._id} list={list} />;
        })}
      </div>
    </div>
  );
}

const TotalBookingsMinimal = ({ data }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div className="bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-500 p-6">
      <div className="flex items-center">
        <div className="bg-blue-100 rounded-full p-3 mr-4">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">
            {t("profile.Total Bookings")}
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            {formatNumber(data.results.toLocaleString(), lang)}
          </h2>
        </div>
      </div>
    </div>
  );
};
function ListItem({ list }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const getPaymentStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-gray-800",
          icon: CheckCircle,
        };
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          icon: Clock,
        };
      case "failed":
      case "cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: CreditCard,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: CreditCard,
        };
    }
  };

  const paymentStyle = getPaymentStatusStyle(list.paymentStatus);
  const PaymentIcon = paymentStyle.icon;
  return (
    <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 bg-opacity-20 rounded-full p-2">
            <User className="h-6 w-6 text-gray-700" />
          </div>
          <div className="text-gray-700">
            <h2 className="text-xl font-semibold text-gray-700">
              {list.guest.userName}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <Mail className="h-4 w-4 text-blue-700" />
              <span className="text-blue-700 text-sm">{list.guest.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Check-in and Check-out dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                {t("profile.Check-in")}
              </p>
              <p className="text-green-800">{formatDate(list.checkIn, lang)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <CalendarCheck className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">
                {t("profile.Check-out")}
              </p>
              <p className="text-red-700">{formatDate(list.checkOut, lang)}</p>
            </div>
          </div>
        </div>

        {/* Price and Payment Status */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">
                {t("profile.Total Price")}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(list.totalPrice, lang)}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-full ${paymentStyle.bg}`}
          >
            <PaymentIcon className={`h-4 w-4 ${paymentStyle.text}`} />
            <span
              className={`text-sm font-medium ${paymentStyle.text} capitalize`}
            >
              {t("profile.paid")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const NoBookings = ({
  showCreateButton = false,
  onCreateBooking,
  illustration = "calendar",
}) => {
  const illustrations = {
    calendar: <CalendarX className="h-16 w-16 text-gray-400" />,
    search: <Search className="h-16 w-16 text-gray-400" />,
    users: <Users className="h-16 w-16 text-gray-400" />,
    book: <BookOpen className="h-16 w-16 text-gray-400" />,
  };
  const { t } = useTranslation();

  return (
    <div className="mt-8 flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
      <SEO
        title={`Bookings | Maskn`}
        description={`View and manage all bookings, Egypt on Maskn.`}
      />
      {/* Icon/Illustration */}
      <div className="bg-gray-50 rounded-full p-6 mb-6">
        {illustrations[illustration]}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {t("lists.No Bookings Yet")}
      </h3>

      {/* Message */}
      <p className="text-gray-600 mb-6 max-w-md">
        {t("lists.There are no bookings available at the moment.")}
      </p>

      {/* Optional Create Button */}
      {showCreateButton && (
        <button
          onClick={onCreateBooking}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create First Booking
        </button>
      )}
    </div>
  );
};
