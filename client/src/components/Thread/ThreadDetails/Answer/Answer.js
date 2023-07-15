import React from 'react'
import { Grid, Typography, Avatar, Chip, Stack } from '@mui/material'
import myStyle from './style'
import like from '../../../../images/like.png'
import accept from '../../../../images/accept.png'
import newbie from '../../../../images/newbie.png'
import beginner from '../../../../images/beginner.png'
import competent from '../../../../images/competent.png'
import expert from '../../../../images/expert.png'
import beginnerBadge from '../../../../images/badge1.png'
import angular from '../../../../images/angular.png'
import jquery from '../../../../images/jquery.png'
import rails from '../../../../images/rails.png'
import react from '../../../../images/react.png'
import vuejs from '../../../../images/vuejs.png'
import java from '../../../../images/java.png'


const Answer = ({ data }) => {
    var title = newbie;
    switch (data?.userID?.title) {
        case "Beginner":
            title = beginner;
            break;
        case "Competent":
            title = competent;
            break;
        case "Expert":
            title = expert;
            break;
        default:
            title = newbie;
    }
    var badges = [];

    data?.userID?.badges?.map((badge) => {
        if (badge.split(" ")[1] === "Beginner") {
            badges.push({
                title: badge,
                image: beginnerBadge
            })
        }
        else {
            switch (badge.split(" ")[0]) {
                case "Angular":
                    badges.push({
                        title: badge,
                        image: angular
                    })
                    break;
                case "Java":
                    badges.push({
                        title: badge,
                        image: java
                    })
                    break;
                case "Jquery":
                    badges.push({
                        title: badge,
                        image: jquery
                    })
                    break;
                case "Rails":
                    badges.push({
                        title: badge,
                        image: rails
                    })
                    break;
                case "React":
                    badges.push({
                        title: badge,
                        image: react
                    })
                    break;
                case "Vuejs":
                    badges.push({
                        title: badge,
                        image: vuejs
                    })
                    break;
                default:
                    break;
            }
        }
        return badge
    })
    return (
        <>
            <Grid container p={3}>
                <Grid item xs={2} display='flex' justifyContent='start' alignItems='center' flexDirection='column'>
                    <Avatar alt="like icon" src={like} />
                    <Typography component='span'>
                        {(data?.userID?.title && (data?.userID?.title !== "Newbie")) && <img src={accept} alt="certificated icon" style={{ width: '24px', height: '24px' }} />}
                    </Typography>
                </Grid>
                <Grid item xs={10} sx={myStyle.answer}>
                    <Typography component="div" className='bodyText'>
                        {data?.content}
                    </Typography>
                    {data?.image && <img alt="Question answer" src={data?.image} style={{ maxWidth: '100%', marginTop: '8px' }} />}
                    <Grid item xs={12} sx={{ padding: "0 16px 0 16px" }} display='flex' justifyContent='space-between'>
                        <Typography component="span">
                            {new Date().getDate() - new Date(data?.createdAt).getDate()} days ago by {data?.userID?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ padding: "0 16px 0 16px", marginY: '8px' }}>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                            <Chip
                                avatar={<Avatar alt="title" src={title} />}
                                label={data?.userID?.title ? data?.userID?.title : "Newbie"}
                                variant="outlined"
                                sx={{
                                    fontWeight: '700'
                                }}
                            />
                            {badges?.map((badge, index) => (
                                <Chip
                                    key={index}
                                    avatar={<Avatar alt="badge-img" src={badge.image} />}
                                    label={badge.title}
                                    variant="outlined"
                                    sx={{
                                        fontWeight: '200'
                                    }}
                                />
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export default Answer