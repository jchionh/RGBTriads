/**
 * User: jchionh
 * Date: 4/28/24
 * Time: 11:03 PM
 */

// namespace
wa.data = wa.data || {};

wa.data.RGBTriadListURLs = [
    "images/RGB5x14_256x256.png",
    "images/RGB5x15_256x256.png",
    //"images/RGB2x10_21x22.png",
    //"images/RGB2x7_21x16.png",
    //"images/RGB2x7_252x240.png",
    //"images/RGB2x7_28x24.png",
    "images/RGB4x14_256x256.png",
    "images/RGB5x14_256x256.png",
    "images/RGB5x15_256x256.png",
    //"images/RGB5x15_64x64.png",
];

wa.data.ImageListURLs = [
    "images/msx00941_large.png",
    "images/msx00941_small.png",
    "images/msx_plane_2.png",
    "images/bobble_1.png",
    "images/garou_fight_1.png",
    "images/garou_fight_2.png",
    "images/garou_title_1.png",
    "images/kof98_fight_1.png",
    "images/marco_slug_1.jpg",
    "images/marco_tank_1.jpg",
    "images/metal_slug_score.png",
    "images/metal_slug_tank_direct_1.png",
    "images/mgx_2p_building_1.png",
    "images/ms2_building_1.png",
    "images/ms2_bus_1.png",
    "images/ms2_explode_1.png",
    "images/ms2_feast_1.png",
    "images/ms2_tunnel_1.png",
    "images/ms2_tunnel_2.png",
    "images/msx_plane_1.png",
    "images/msx_plane_2.png",
    "images/msx_train_1.png",
    "images/msx_train_2.png",
    "images/neo_geo_1.png",
    "images/neo_geo_2.png",
    "images/ntm_demo_1.png",
    "images/ntm_intro_1.png",
    "images/ntm_title_1.png",
    "images/sfcd_fight_1.png",
    "images/ss2_fight_1.png",
    "images/ss2_title_1.png",
    "images/tf4_fight_1.png",
    "images/tf4_fight_2.png",
    "images/tf4_title_1.png",
    "images/zw_fight_1.png",
    "images/zw_intro_1.png",
    "images/zw_intro_2.png",
    "images/zw_intro_3.png",
    "images/zw_intro_4.png",
    "images/zw_intro_5.png",
    "images/zw_intro_6.png",
    "images/zw_intro_7.png",
    "images/zw_title_1.png",
];

wa.data.VideoListURLs = [
    {
        desc: "[Neo Geo] Metal Slug X (No Audio)",
        url: "video/metal_slug_x.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.3,
        },
    },
    {
        desc: "[Arcade] Alien Vs Predator",
        url: "video/alien_vs_predator_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.651,

            // Scanlines
            scanLinesDensity: 76,

            // vignette
            vigFade: 40,

            // video image values
            saturation: 0.364,
            brightness: 0.0,
            contrast: 0.093,
        },
    },
    {
        desc: "[Arcade] Captain Commando",
        url: "video/captain_commando_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.672,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.442,
            brightness: 0.015,
            contrast: 0.147,
        },
    },
    {
        desc: "[Arcade] Dungeons & Dragons: Shadow Over Mystara",
        url: "video/dnd_shadow_over_mystara_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.088,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.445,
            brightness: 0.015,
            contrast: 0.244,
        },
    },
    {
        desc: "[Arcade] Marvel Super Heroes",
        url: "video/marvel_super_heroes.mp4",
        settings:  {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.789,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.504,
            brightness: 0.093,
            contrast: 0.217,
        },
    },
    {
        desc: "[Arcade] Marvel vs Capcom",
        url: "video/marvel_vs_capcom.mp4",
        settings:  {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.789,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.504,
            brightness: 0.093,
            contrast: 0.217,
        },
    },
    {
        desc: "[Arcade] Marvel vs Street Fighter",
        url: "video/marvel_vs_street_fighter.mp4",
        settings:  {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.858,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.504,
            brightness: 0.093,
            contrast: 0.217,
        },
    },
    {
        desc: "[Arcade] Outrun (Passing Breeze)",
        url: "video/outrun_passing_breeze_z.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.479,
            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.145,
            // Vignette
            fStop: 16.0,

            // video image values
            saturation: 0.519,
            brightness: 0.085,
            contrast: 0.403,
        },
    },
    {
        desc: "[Arcade] Outrun (Magical Sound Shower)",
        url: "video/outrun_magical_sound_shower_z.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.479,
            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.145,
            // Vignette
            fStop: 16.0,

            // video image values
            saturation: 0.519,
            brightness: 0.085,
            contrast: 0.403,
        },
    },
    {
        desc: "[Arcade] Outrun (Splash Wave)",
        url: "video/outrun_splash_wave_z.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.479,
            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.145,
            // Vignette
            fStop: 16.0,

            // video image values
            saturation: 0.519,
            brightness: 0.085,
            contrast: 0.403,
        },
    },
    {
        desc: "[Arcade] Street Fighter 2 Hyper Fighting",
        url: "video/street_fighter_2_hyper_fighting_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.513,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.265,
            brightness: 0.085,
            contrast: 0.194,
        },
    },
    {
        desc: "[Arcade] Street Fighter Alpha",
        url: "video/street_fighter_alpha_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.309,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.217,
            brightness: 0.116,
            contrast: 0.147,
        },
    },
    {
        desc: "[Arcade] Street Fighter Alpha 2",
        url: "video/street_fighter_alpha_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.513,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.271,
            brightness: 0.093,
            contrast: 0.155,
        },
    },
    {
        desc: "[Arcade] Street Fighter Alpha 3",
        url: "video/street_fighter_alpha_3_intro.mp4",
        settings:  {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.444,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.271,
            brightness: 0.093,
            contrast: 0.217,
        },
    },
    {
        desc: "[Arcade] The Final Fight",
        url: "video/final_fight_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.944,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.155,
            brightness: 0.023,
            contrast: 0.178,
        },
    },
    {
        desc: "[Arcade] The Punisher",
        url: "video/the_punisher.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.835,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.468,
            brightness: 0.079,
            contrast: 0.256,
        },
    },
    {
        desc: "[Arcade] The Simpsons",
        url: "video/the_simpsons_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.789,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.468,
            brightness: -0.086,
            contrast: 0.256,
        },
    },
    {
        desc: "[Arcade] X-Men: Children of the Atom",
        url: "video/xmen_children_of_the_atom.mp4",
        settings:  {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.181,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.504,
            brightness: 0.093,
            contrast: 0.217,
        },
    },
    {
        desc: "[Arcade] X-Men vs Street Fighter",
        url: "video/xmen_vs_street_fighter.mp4",
        settings:  {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.789,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.504,
            brightness: 0.093,
            contrast: 0.217,
        },
    },
    {
        desc: "[Genesis] Comix Zone",
        url: "video/comix_zone_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.883,
            // Scanlines
            scanLinesDensity: 66,
            scanLinesOpacity: 0.25,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.387,
            brightness: 0.101,
            contrast: 0.318,
        },
    },
    {
        desc: "[Genesis] Castlevania: Bloodlines",
        url: "video/castlevania_bloodlines_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.536,
            // Scanlines
            scanLinesDensity: 68,
            scanLinesOpacity: 0.187,
            // vignette
            vigFade: 40,
            // video image values
            saturation: 0.302,
            brightness: 0.124,
            contrast: 0.256,
        },
    },
    {
        desc: "[Genesis] Gunstar Heroes",
        url: "video/gunstar_heroes_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.584,
            // Scanlines
            scanLinesDensity: 66,
            scanLinesOpacity: 0.187,
            // video image values
            saturation: 0.426,
            brightness: 0.101,
            contrast: 0.349,
        },
    },
    {
        desc: "[Genesis] Sonic The Hedgehog",
        url: "video/sonic_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.617,
            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.165,
            // video image values
            saturation: 0.372,
            brightness: 0.093,
            contrast: 0.294,
        },
    },
    {
        desc: "[Genesis] Streets of Rage 2",
        url: "video/streets_of_rage_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.513,

            // Scanlines
            // Scanlines
            scanLinesDensity: 66,
            scanLinesOpacity: 0.176,
            // video image values
            saturation: 0.387,
            brightness: 0.077,
            contrast: 0.232,
        },
    },
    {
        desc: "[Genesis] Thunder Force IV",
        url: "video/thunder_force_4_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.651,

            // Scanlines
            scanLinesDensity: 68,
            scanLinesOpacity: 0.191,
            // video image values
            saturation: 0.434,
            brightness: 0.116,
            contrast: 0.395,
        },
    },
    {
        desc: "[Genesis] Zero Wing",
        url: "video/zero_wing_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),

            // RGB
            imageBrightness: 1.582,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.315,

            // video image values
            saturation: 0.442,
            brightness: 0.163,
            contrast: 0.294,
        },
    },
    {
        desc: "[Neo Geo] Garou: Mark of the Wolves",
        url: "video/garou_mark_of_the_wolves_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.134,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 70,
            scanLinesOpacity: 0.342,
            // video image values
            saturation: 0.340,
            brightness: 0.023,
            contrast: 0.248,
        },
    },
    {
        desc: "[Neo Geo] The King of Fighters 98",
        url: "video/king_of_fighters_98_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.185,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.311,
            // video image values
            saturation: 0.294,
            brightness: 0.015,
            contrast: 0.294,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug X",
        url: "video/metal_slug_x_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 2",
        url: "video/metal_slug_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
           // RGB
           imageBrightness: 1.868,

           // vignette
           vigOuterBorder: 0.82,

           // Scanlines
           scanLinesDensity: 76,
           scanLinesOpacity: 0.25,
           // video image values
           saturation: 0.232,
           brightness: 0.085,
           contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 3",
        url: "video/metal_slug_3_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 4",
        url: "video/metal_slug_4_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 5",
        url: "video/metal_slug_5_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] Neo Drift Out",
        url: "video/neo_drift_out_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] Neo Turf Masters",
        url: "video/neo_turf_masters_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] Samurai Shodown II",
        url: "video/samurai_shodown_II_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] The Last Blade 1",
        url: "video/the_last_blade_1_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[Neo Geo] The Last Blade 2",
        url: "video/the_last_blade_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.868,

            // vignette
            vigOuterBorder: 0.82,

            // Scanlines
            scanLinesDensity: 76,
            scanLinesOpacity: 0.25,
            // video image values
            saturation: 0.232,
            brightness: 0.085,
            contrast: 0.139,
        },
    },
    {
        desc: "[PSX] Castlevania: Symphony of the Night",
        url: "video/castlevania_symphony_of_the_night_30.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.962,

            // vignette
            vigFade: 45,
            // Scanlines
            scanLinesDensity: 90,
            scanLinesOpacity: 0.241,

            // video image values
            saturation: 0.403,
            brightness: 0.015,
            contrast: 0.178,
            // vignette
            vigFade: 40,
        },
    },
    {
        desc: "[PSX] Final Fantasy VII",
        url: "video/final_fantasy_7_intro_long.mp4",
        settings: {
            ...new wa.data.DemoSettings(),

            // RGB
            imageBrightness: 1.927,

            // vignette
            vigFade: 40,
            // Scanlines
            scanLinesDensity: 90,
            scanLinesOpacity: 0.228,

            // video image values
            saturation: 0.395,
            brightness: 0.031,
            contrast: 0.186,
            // vignette
            vigFade: 40,
        },
    },
    {
        desc: "[PSX] Final Fantasy VIII",
        url: "video/final_fantasy_8_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.962,

            // vignette
            vigFade: 45,
            // Scanlines
            scanLinesDensity: 90,
            scanLinesOpacity: 0.228,

            // video image values
            saturation: 0.387,
            brightness: 0.015,
            contrast: 0.263,
            // vignette
            vigFade: 40,
        },
    },
    {
        desc: "[PSX] Final Fantasy IX",
        url: "video/final_fantasy_9_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.962,

            // vignette
            vigFade: 45,
            // Scanlines
            scanLinesDensity: 90,
            scanLinesOpacity: 0.241,

            // video image values
            saturation: 0.403,
            brightness: 0.015,
            contrast: 0.178,
            // vignette
            vigFade: 40,
        },
    },
    {
        desc: "[PSX] Metal Gear Solid",
        url: "video/metal_gear_solid_intro_long.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.169,

            // vignette
            vigFade: 45,
            // Scanlines
            scanLinesDensity: 90,
            scanLinesOpacity: 0.207,

            // video image values
            saturation: 0.426,
            brightness: 0.015,
            contrast: 0.015,
            // vignette
            vigFade: 40,
        },
    },
    {
        desc: "[SNES] Chrono Trigger",
        url: "video/chrono_trigger_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.717,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigOuterBorder: 0.831,
            // video image values
            saturation: 0.349,
            brightness: 0.116,
            contrast: 0.302,
        },
    },
    {
        desc: "[SNES] Final Fantasy IV",
        url: "video/final_fantasy_4_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.789,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigOuterBorder: 0.878,
            // video image values
            saturation: 0.356,
            brightness: 0.101,
            contrast: 0.248,
        },
    },
    {
        desc: "[SNES] Final Fantasy V",
        url: "video/final_fantasy_5_intro_long.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.824,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigOuterBorder: 0.808,
            // video image values
            saturation: 0.256,
            brightness: 0.093,
            contrast: 0.341,
        },
    },
    {
        desc: "[SNES] Final Fantasy VI",
        url: "video/final_fantasy_6_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.824,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigOuterBorder: 0.82,
            // video image values
            saturation: 0.318,
            brightness: 0.077,
            contrast: 0.186,
        },
    },
    {
        desc: "[SNES] Super Metriod",
        url: "video/super_metroid_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.824,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigOuterBorder: 0.82,
            // video image values
            saturation: 0.186,
            brightness: 0.085,
            contrast: 0.194,
        }
    },
    {
        desc: "[SNES] Super Mario World",
        url: "video/super_mario_world_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.548,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigOuterBorder: 0.82,
            // video image values
            saturation: 0.248,
            brightness: 0.108,
            contrast: 0.318,
        },
    },
    {
        desc: "[SNES] The Legend of Zelda: A Link to the Past",
        url: "video/zelda_link_to_the_past.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.611,
            // Scanlines
            scanLinesDensity: 76,
            // vignette
            vigOuterBorder: 0.82,
            // video image values
            saturation: 0.217,
            brightness: 0.101,
            contrast: 0.287,
        },
    },
]