// utils/badgeUtils.js

const badgeConfig = {
    course: (item) => {
        if (item.deletedAt) {
            return [{ label: "Deleted", color: "#B71C1C" }];
        }

        const badges = [];

        if (item.isPublish) {
            badges.push({ label: "Publish", color: "#008B47" });
        }

        if (item.isFeatured) {
            badges.push({ label: "Featured", color: "#FFA000" });
        }

        return badges;
    },

    blog: (item) => {
        if (item.deletedAt) {
            return [{ label: "Deleted", color: "#B71C1C" }];
        }

        const badges = [];

        if (item.isDraft) {
            badges.push({ label: "Draft", color: "#9E9E9E" });
        }

        if (item.isPublished) {
            badges.push({ label: "Published", color: "#1976D2" });
        }

        if (item.isPinned) {
            badges.push({ label: "Pinned", color: "#FFC107" });
        }

        return badges;
    },

    // Tambahkan konfigurasi lain (misal: event, product, user, dsb)
};

/**
 * Fungsi utama untuk mendapatkan badge berdasarkan tipe entitas
 * @param {string} type - tipe data, contoh: 'course', 'blog'
 * @param {object} item - data object yang ingin dimapping
 * @returns {Array<{label: string, color: string}>}
 */
export function getBadges(type, item) {
    if (!badgeConfig[type]) return [];
    return badgeConfig[type](item);
}
