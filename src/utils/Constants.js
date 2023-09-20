// import { Login } from "@mui/icons-material"

export const project_ID= 'b8cjykmftj1r';

export const Song_URL= 'https://academics.newtonschool.co/api/v1/music/song'

export const Album_URL= 'https://academics.newtonschool.co/api/v1/music/album'

export const more_Songs_URL= 'https://academics.newtonschool.co/api/v1/music/album?limit=100'

export const filter_Songs_URL=  'https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}'

export const latest_Songs_URL= 'https://academics.newtonschool.co/api/v1/music/song?sort={"release":1}'

export const paginations_Songs_URL= 'https://academics.newtonschool.co/api/v1/music/song?';

export const current_Song_URL= 'https://academics.newtonschool.co/api/v1/music/album/:id'

// export const search_Song_URL= fetch('https://academics.newtonschool.co/api/v1/music/song?filter={"title":"search_term_here"}', {
//     headers: {
//         'projectId': 'YOUR_PROJECT_ID'
//     }
// })

export const album_Current_URL= 'https://academics.newtonschool.co/api/v1/music/album/:id'

export const artist_URL= 'https://academics.newtonschool.co/api/v1/music/artist/:id'

// export const Login_URL= fetch('https://academics.newtonschool.co/api/v1/user/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'projectId': 'YOUR_PROJECT_ID'
//     },
//     body: JSON.stringify({
//         email: 'user_email',
//         password: 'user_password',
//         appType: 'music',
//     })
// })

// export const signUp= fetch('https://academics.newtonschool.co/api/v1/user/signup', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'projectId': 'YOUR_PROJECT_ID'
//     },
//     body: JSON.stringify({
//         name: 'user_name',
//         email: 'user_email',
//         password: 'user_password',
//         appType: 'music',
//     })
// })

// export const update_Password= fetch('https://academics.newtonschool.co/api/v1/user/updateMyPassword', {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json',
//         'projectId': 'YOUR_PROJECT_ID'
//     },
//     body: JSON.stringify({
//         name: 'user_name',
//         email: 'user_email',
//         passwordCurrent: 'current_password',
//         password: 'user_new_password',
//         appType: 'music',
//     })
// })