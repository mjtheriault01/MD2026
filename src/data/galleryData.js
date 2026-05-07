const CDN      = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,e_improve:50,e_vibrance:20,e_sharpen:50,c_fill,g_auto'
const CDN_FACE = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,e_improve:50,e_vibrance:20,e_sharpen:50,c_fill,g_faces,z_0.8'
// CARD/SQ/TALL use face-aware gravity so heads aren't cropped; WIDE keeps g_auto for scenic shots
const CARD = `${CDN_FACE},w_800,h_600`
const SQ   = `${CDN_FACE},w_600,h_600`
const TALL = `${CDN_FACE},w_600,h_800`
const WIDE = `${CDN},w_1200,h_800`

const CDN_VIDEO = 'https://res.cloudinary.com/dikkdclum/video/upload/q_auto,f_mp4'

const md26  = (id) => `md26/${id}`
const vid   = (id) => `md26_videos/${id}.mp4`

// ─── Milestone carousel expansions ───────────────────────────────────────────

export const sparkPhotos = [
  `${CARD}/${md26('big_rock_date')}`,
  `${CARD}/${md26('bears_game')}`,
  `${CARD}/${md26('cubs_game')}`,
  `${CARD}/${md26('2nd_anniversary')}`,
  `${CARD}/${md26('2nd_anniversary_2')}`,
  `${CARD}/${md26('sky_diving')}`,
  `${CARD}/${md26('rock_climbing')}`,
  `${CARD}/${md26('new_years_2021')}`,
]

export const promisePhotos = [
  `${CARD}/${md26('engagement_moment_on_ski_hill')}`,
  `${CARD}/${md26('engagement_weekend_diamond_lake_snow_heart')}`,
  `${CARD}/${md26('engagement_dinner')}`,
  `${CARD}/${md26('endgagement_dinner_2')}`,
  `${CARD}/${md26('engagement_dt_naperville')}`,
  `${CARD}/${md26('engagement_photos_dt_naperville')}`,
]

export const unionPhotos = [
  `${CARD}/${md26('wedding_at_church')}`,
  `${CARD}/${md26('wedding_dance')}`,
  `${CARD}/${md26('wedding_side_by_side')}`,
  `${CARD}/${md26('wedding_post_pics')}`,
]

export const celebrationPhotos = [
  `${CARD}/${md26('reception_2_walking_down')}`,
  `${CARD}/${md26('reception_2_1st_dance')}`,
  `${CARD}/${md26('reception_2_us')}`,
  `${CARD}/${md26('reception_2_cake_cut')}`,
  `${CARD}/${md26('reception_2_dance')}`,
  `${CARD}/${md26('recetption_2_silly_pic_us')}`,
]

export const taylorPhotos = [
  `${CARD}/${md26('taylor_born_and_mommy')}`,
  `${CARD}/${md26('taylor_hospital_swaddle')}`,
  `${CARD}/${md26('taylor_hospital_with_mom_eyes_open')}`,
  `${CARD}/${md26('taylor_arabesque_swaddle')}`,
  `${CARD}/${md26('taylor_little_miracle')}`,
  `${CARD}/${md26('tay_smile_fresh_at_home')}`,
  `${CARD}/${md26('touchdown_taylor_just_brought_home')}`,
  `${CARD}/${md26('taylor_4_months')}`,
  `${CARD}/${md26('tay_baptism')}`,
  `${CARD}/${md26('taylor_1st_swim_with_mom')}`,
  `${CARD}/${md26('taylor_1st_christmas')}`,
  `${CARD}/${md26('tay_and_mom_cuddles')}`,
  `${CARD}/${md26('mom_and_tay_1st_mothers_day')}`,
]

export const halliePhotos = [
  `${CARD}/${md26('hallie_born_with_mom')}`,
  `${CARD}/${md26('hallie_born_1')}`,
  `${CARD}/${md26('hallie_mom_cuddle_hospital')}`,
  `${CARD}/${md26('hallie_sleeping_outfit_hospital')}`,
  `${CARD}/${md26('us_with_hallie_mom_and_dad_fresh')}`,
  `${CARD}/${md26('hallie_and_tay_holding_hands_hallie_fresh_home')}`,
  `${CARD}/${md26('hallie_mom_cuddles_home_fresh')}`,
  `${CARD}/${md26('baby_hallie')}`,
  `${CARD}/${md26('hallie_and_mom_cuddles')}`,
  `${CARD}/${md26('more_baby_hallie_cuddles')}`,
  `${CARD}/${md26('hallie_curled_up_to_mom')}`,
]

// ─── Maldives gallery (used below the feature section) ───────────────────────

export const maldivesPhotos = [
  { src: `${WIDE}/${md26('maldives_sunrise')}`,                         label: 'Sunrise over the Indian Ocean' },
  { src: `${WIDE}/${md26('maldives_infinity_with_our_villa_in_back')}`, label: 'Our villa' },
  { src: `${WIDE}/${md26('maldives_most_beautiful_woman_bridgett')}`,   label: 'The most beautiful woman' },
  { src: `${WIDE}/${md26('maldives_us')}`,                              label: 'Us' },
  { src: `${WIDE}/${md26('maldives_matching_shirts')}`,                 label: 'Matching' },
  { src: `https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,e_improve:50,e_vibrance:20,e_sharpen:50,c_fill,g_auto,w_1200,h_800/${md26('maldives_5_8')}`,  label: 'Hurawalhi' },
  { src: `https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,e_improve:50,e_vibrance:20,e_sharpen:50,c_fill,g_auto,w_1200,h_800/${md26('maldives_5_8_2')}`, label: 'Hurawalhi' },
  { src: `https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,e_improve:50,e_vibrance:20,e_sharpen:50,c_fill,g_auto,w_1200,h_800/${md26('maldives_5_8_3')}`, label: 'Hurawalhi' },
  { src: `${WIDE}/${md26('maldives_5_8_night')}`,                       label: 'Hurawalhi at night' },
  { src: `${WIDE}/${md26('maldives_kashibo_dinner')}`,                  label: 'Kashibo dinner' },
  { src: `${WIDE}/${md26('maldives_dolphin_cruse')}`,                   label: 'Dolphin cruise' },
  { src: `${WIDE}/${md26('maldives_dolphin_cruse_2')}`,                 label: 'Dolphin cruise' },
  { src: `${WIDE}/${md26('maldives_scuba')}`,                           label: 'Scuba diving' },
  { src: `${WIDE}/${md26('maldives_sunset')}`,                          label: 'Maldives sunset' },
]

// ─── "You As A Mom" section photos + memory videos ───────────────────────────

export const momPhotos = [
  { src: `${SQ}/${md26('mom_and_tay_1st_mothers_day')}`,               caption: "First Mother's Day", type: 'image' },
  { src: `${TALL}/${md26('tay_and_mom_cuddles')}`,                     caption: 'Taylor & Mom', type: 'image' },
  { src: `${SQ}/${md26('taylor_smile_with_mom_while_sleeping')}`,      caption: 'Pure peace', type: 'image' },
  { src: `${SQ}/${md26('mama_cuddles')}`,                               caption: 'Mama cuddles', type: 'image' },
  { src: `${TALL}/${md26('tube_cuddles_taylor_and_mom')}`,             caption: "Safe in Mom's arms", type: 'image' },
  { src: `${SQ}/${md26('mom_and_tay_cuddles_fresh_at_home')}`,        caption: 'Fresh home', type: 'image' },
  { src: `${SQ}/${md26('belle_tea_party_mom_and_tay')}`,              caption: 'Tea party royalty', type: 'image' },
  { src: `${SQ}/${md26('tay_and_mom_summer_smiles')}`,                caption: 'Summer smiles', type: 'image' },
  { src: `${TALL}/${md26('mom_in_crib_with_hallie')}`,                caption: 'In the crib together', type: 'image' },
  { src: `${SQ}/${md26('hallie_mom_cuddle_hospital')}`,               caption: 'Fresh arrival', type: 'image' },
  { src: `${SQ}/${md26('hallie_and_mom_cuddles')}`,                   caption: 'Hallie & Mom', type: 'image' },
  { src: `${SQ}/${md26('hallie_curled_up_to_mom')}`,                  caption: 'Curled up', type: 'image' },
  { src: `${TALL}/${md26('mom_and_hal_cuddles')}`,                    caption: 'Hallie & Mom', type: 'image' },
  { src: `${SQ}/${md26('cuddles_with_mom_and_hallie')}`,              caption: 'Cuddle time', type: 'image' },
  { src: `${SQ}/${md26('mom_and_girls_in_bed')}`,                     caption: 'Morning cuddles', type: 'image' },
  { src: `${SQ}/${md26('mom_reading_to_girls')}`,                     caption: 'Story time', type: 'image' },
  { src: `${SQ}/${md26('mom_reading_to_girls_spring_2026')}`,        caption: 'Reading together', type: 'image' },
  { src: `${TALL}/${md26('whole_family_reading_tays_bed')}`,         caption: 'Bedtime stories', type: 'image' },
  { src: `${SQ}/${md26('taylor_ballet_prep')}`,                      caption: 'Ballet days', type: 'image' },
  { src: `${SQ}/${md26('tay_and_momma_classroom_visit_daddy')}`,     caption: 'Classroom visit', type: 'image' },
  { src: `${SQ}/${md26('mom_and_tay_silly')}`,                       caption: 'Being silly', type: 'image' },
  { src: `${TALL}/${md26('mom_and_girls_silly')}`,                    caption: 'Silly time', type: 'image' },
  { src: `${SQ}/${md26('mom_and_girls_silly_at_dinner')}`,           caption: 'Dinner laughs', type: 'image' },
  { src: `${SQ}/${md26('oberweiss_mom_and_girls')}`,                  caption: 'Ice cream run', type: 'image' },
  { src: `${SQ}/${md26('blackberry_mom_and_girls')}`,                caption: 'Blackberry Farm', type: 'image' },
  { src: `${TALL}/${md26('bridgett_girls')}`,                        caption: 'Her girls', type: 'image' },
  { src: `${SQ}/${md26('bridgett_girls_2')}`,                        caption: 'Her whole world', type: 'image' },
  { src: `${SQ}/${md26('mom_and_hallie_silly')}`,                    caption: 'Hallie & Mom silly', type: 'image' },
  { src: `${SQ}/${md26('mom_and_hallie')}`,                          caption: 'Mom & Hallie', type: 'image' },
  { src: `${SQ}/${md26('hallie_taylor_and_mom_smiles')}`,            caption: 'All three smiles', type: 'image' },
  { src: `${SQ}/${md26('hallie_taylor_and_mom')}`,                   caption: 'The three of them', type: 'image' },
  { src: `${TALL}/${md26('mom_with_girls_frozen_on_ice')}`,          caption: 'Frozen on ice', type: 'image' },
  { src: `${SQ}/${md26('strawberry_picking_summer_2025')}`,          caption: 'Strawberry picking', type: 'image' },
  { src: `${SQ}/${md26('mom_and_tay_movie_cuddles_summer_2024')}`,  caption: 'Movie night', type: 'image' },
  { src: `${SQ}/${md26('tay_oooo_face_with_mom')}`,                 caption: 'That face', type: 'image' },
  { src: `${TALL}/${md26('tay_bike_mothers_day_2025')}`,            caption: 'First bike ride', type: 'image' },
  { src: `${SQ}/${md26('mother_s_day_2025')}`,                      caption: "Mother's Day 2025", type: 'image' },
  { src: `${SQ}/${md26('mothers_day_2024')}`,                       caption: "Mother's Day 2024", type: 'image' },
  { src: `${SQ}/${md26('mom_asleep_on_couch_spring_2026_with_taylor')}`, caption: 'A quiet moment', type: 'image' },
  { src: `${SQ}/${md26('hallie_bridge')}`,                          caption: 'Hallie & Bridgett', type: 'image' },
  { src: `${TALL}/${md26('momma_taylor_backyard_summer')}`,         caption: 'Backyard summer', type: 'image' },
  { src: `${SQ}/${md26('momma_taylor_boat_grants')}`,               caption: 'Boat day', type: 'image' },
  // Memory videos
  { src: `${CDN_VIDEO}/${vid('bridgett_hallie_playtime')}`,         caption: 'Bridgett & Hallie', type: 'video' },
  { src: `${CDN_VIDEO}/${vid('taylor_baking_muffins_with_mom')}`,   caption: 'Baking muffins', type: 'video' },
  { src: `${CDN_VIDEO}/${vid('mom_tossing_tay_silly')}`,            caption: 'Being silly', type: 'video' },
]

// ─── Adventures horizontal strip ─────────────────────────────────────────────

export const adventures = [
  { src: `${WIDE}/${md26('maldives_sunrise')}`,                         label: 'Maldives' },
  { src: `${WIDE}/${md26('cayman_islands_spring_2021')}`,               label: 'Cayman Islands' },
  { src: `${WIDE}/${md26('cayman_spring_2021_spots_beach')}`,           label: 'Cayman Beach' },
  { src: `${WIDE}/${md26('door_county')}`,                              label: 'Door County' },
  { src: `${WIDE}/${md26('galena_balloons_summer_2025')}`,              label: 'Galena, IL' },
  { src: `${WIDE}/${md26('carousel_blackberry_farm_summer_2025')}`,     label: 'Blackberry Farm' },
  { src: `${WIDE}/${md26('family_xmas_blackberry')}`,                   label: 'Blackberry Farm Christmas' },
  { src: `${WIDE}/${md26('snowmobile_colorado')}`,                      label: 'Colorado' },
  { src: `${WIDE}/${md26('starved_rock_hiking')}`,                      label: 'Starved Rock' },
  { src: `${WIDE}/${md26('great_wolf_lodge_family_pic_summer_2024')}`,  label: 'Great Wolf Lodge' },
  { src: `${WIDE}/${md26('grants_lake_house')}`,                        label: 'Lake House' },
  { src: `${WIDE}/${md26('indiana_dunes')}`,                            label: 'Indiana Dunes' },
  { src: `${WIDE}/${md26('lake_geneva_timeberridge')}`,                 label: 'Lake Geneva' },
  { src: `${WIDE}/${md26('kings_island')}`,                             label: 'Kings Island' },
  { src: `${WIDE}/${md26('sky_diving')}`,                               label: 'Skydiving' },
  { src: `${WIDE}/${md26('rock_climbing')}`,                            label: 'Rock climbing' },
]

// ─── "The Girls" section ─────────────────────────────────────────────────────

export const girlsPhotos = [
  { src: `${SQ}/${md26('taylor_holding_hallie_1st_time')}`,              caption: 'The first hello', type: 'image' },
  { src: `${SQ}/${md26('hallie_and_tay_holding_hands_hallie_fresh_home')}`, caption: 'Already best friends', type: 'image' },
  { src: `${TALL}/${md26('sister_cuddles')}`,                            caption: 'Sister cuddles', type: 'image' },
  { src: `${SQ}/${md26('tay_and_hallie')}`,                             caption: 'The duo', type: 'image' },
  { src: `${SQ}/${md26('silly_tubby_sisters')}`,                        caption: 'Bath time chaos', type: 'image' },
  { src: `${SQ}/${md26('daddys_drawer_sisters')}`,                      caption: "Daddy's drawer", type: 'image' },
  { src: `${TALL}/${md26('sisters_awesome_smiles_summer_2025')}`,       caption: 'Summer 2025', type: 'image' },
  { src: `${SQ}/${md26('hal_and_tay_sisters')}`,                        caption: 'Two peas', type: 'image' },
  { src: `${SQ}/${md26('tay_and_hallie_tub_hallie_smile')}`,           caption: "Hallie's grin", type: 'image' },
  { src: `${SQ}/${md26('tay_and_hallie_2')}`,                          caption: 'Sisters', type: 'image' },
  { src: `${SQ}/${md26('family_4th_of_july_2025')}`,                    caption: '4th of July 2025', type: 'image' },
  { src: `${SQ}/${md26('xmas_eve_2025')}`,                             caption: 'Christmas Eve 2025', type: 'image' },
  { src: `${TALL}/${md26('blackberry_farm_family_fall_2024')}`,         caption: 'Blackberry Farm fall', type: 'image' },
  { src: `${SQ}/${md26('sugar_grove_pumpkin_patch_fall_2023')}`,       caption: 'Pumpkin patch 2023', type: 'image' },
  { src: `${SQ}/${md26('sugar_grove_pumpkins_fall_2024')}`,            caption: 'Pumpkin patch 2024', type: 'image' },
  { src: `${SQ}/${md26('family_smiles_silly')}`,                        caption: 'Silly family', type: 'image' },
  // "Tay says I love you Hallie" video
  { src: `${CDN_VIDEO}/${vid('tay_says_i_love_you_hallie')}`,          caption: 'I love you, Hallie ♡', type: 'video' },
]

// ─── Special message video/audio URLs (used in popup buttons) ────────────────

export const specialMessages = {
  grammy:  `https://res.cloudinary.com/dikkdclum/video/upload/q_auto,f_mp4/${vid('grammy_video')}`,
  taylor1: `${CDN_VIDEO}/${vid('taylor_1')}`,
  taylor2: `${CDN_VIDEO}/${vid('taylor_2')}`,
  hallie:  `${CDN_VIDEO}/${vid('hallie_talking')}`,
  img1478: `${CDN_VIDEO}/${vid('img_1478')}`,
  img3904: `${CDN_VIDEO}/${vid('img_3904')}`,
}

// ─── "Messages to Mommy" special section videos ───────────────────────────────

export const messagesToMommy = {
  taylor: [
    { src: `${CDN_VIDEO}/${vid('taylor_1')}`, label: 'Message 1' },
    { src: `${CDN_VIDEO}/${vid('taylor_2')}`, label: 'Message 2' },
    { src: `${CDN_VIDEO}/${vid('taylor_3')}`, label: 'Message 3' },
    { src: `${CDN_VIDEO}/${vid('taylor_4')}`, label: 'Message 4' },
  ],
  hallie: [
    { src: `${CDN_VIDEO}/${vid('hallie_1')}`, label: 'Message 1' },
    { src: `${CDN_VIDEO}/${vid('hallie_2')}`, label: 'Message 2' },
  ],
  grammy: `${CDN_VIDEO}/${vid('grammy_video')}`,
  dad: [
    { src: `${CDN_VIDEO}/${vid('mikes_thoughts')}`, label: 'A message from Mike' },
  ],
}
