import axiosInstance from "../libs/axiosInstance";
import Blog from "../utils/classes/BlogClass";

const blogService = {
    getBlogs: async ({ page, limit, search, status, tags, categoryId, isFeatured, isPublish }) => {
        try {
            const response = await axiosInstance.get(`/blogs`,
                {
                    params: {
                        page,
                        limit,
                        status,
                        search,
                        tags,
                        categoryId,
                        isFeatured,
                        isPublish
                    }
                }
            );
            return {
                ...response.data,
                blogs: response.data.blogs.map(b => new Blog(b))
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch Blogs');
        }
    },
    getBlogById: async ({ blogId }) => {
        try {
            const response = await axiosInstance.get(`/blog/${blogId}`);
            return {
                ...response.data,
                blog: new Blog(response.data.blog)
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch Blog');
        }
    },
    getTags: async () => {
        try {
            const response = await axiosInstance.get(`/tags/blog`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch Blogs');
        }
    },
}

export default blogService;