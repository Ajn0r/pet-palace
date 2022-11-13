import { rest } from "msw";

const baseURL = "https://pet-palace-api.herokuapp.com/"

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 4,
        username: "Maja",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 4,
        profile_image: "https://res.cloudinary.com/majascloud/image/upload/v1/media/images/IMG_4594_ulunjh"
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
];