import { HiHome, HiUser, HiClipboardList, HiBookOpen, HiSparkles, HiSpeakerphone, HiLibrary, HiCog, HiCurrencyDollar, HiCreditCard, HiHashtag, HiFlag } from 'react-icons/hi';

const dataMenu = [
    {
        title: "Dashboard",
        link: "/admin/dashboard",
        icon: <HiHome size={20} />,
        isDropdown: false,
        dropdownData: null
    },
    {
        title: "Pengguna",
        link: "/admin/user",
        icon: <HiUser size={20} />,
        isDropdown: false,
        dropdownData: null
    },
    {
        title: "Kelas",
        link: "/admin/course",
        icon: <HiBookOpen size={20} />,
        isDropdown: false,
        dropdownData: null
    },

    {
        title: "Blog",
        link: "/admin/blog",
        icon: <HiSpeakerphone size={20} />,
        isDropdown: false,
        dropdownData: null
    },
    {
        title: "Invoice",
        link: "/admin/payments",
        icon: <HiCurrencyDollar size={20} />,
        isDropdown: false,
        dropdownData: null
    },
    {
        title: "Pengaturan",
        link: null,
        icon: <HiCog size={20} />,
        isDropdown: true,
        dropdownData: [
            {
                title: "Pembayaran",
                icon: <HiCreditCard size={20} />,
                link: "/admin/payment-method"
            },
            {
                title: "Region",
                icon: <HiFlag size={20} />,
                link: "/admin/region"
            },
            {
                title: "Category",
                icon: <HiHashtag size={20} />,
                link: "/admin/category"
            },
            {
                title: "Role",
                icon: <HiHashtag size={20} />,
                link: "/admin/role"
            },
        ]
    },

];

export default dataMenu