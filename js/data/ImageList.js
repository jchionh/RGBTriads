/**
 * User: jchionh
 * Date: 4/28/24
 * Time: 11:03 PM
 */

// namespace
wa.data = wa.data || {};

wa.data.RGBTriadListURLs = [
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
    //"images/avp_fight_1.png",
    "images/bobble_1.png",
    //"images/ddsom_fight_1.png",
    //"images/ddsom_fight_2.png",
    //"images/ff_fight_1.png",
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
    //"images/outrun_game_1.png",
    //"images/outrun_score_1.png",
    //"images/outrun_title_1.png",
    //"images/sf2_fight_1.png",
    //"images/sfa3_fight_1.png",
    "images/sfcd_fight_1.png",
    //"images/sim_fight_1.png",
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
        settings: new wa.data.DemoSettings(),
    },
    {
        desc: "[PSX] Final Fantasy VII",
        url: "video/final_fantasy_7_intro_long.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.113,
            // Scanlines
            scanLinesDensity: 92,
            scanLinesOpacity: 0.228,
        },
    },
    {
        desc: "[PSX] Final Fantasy VIII",
        url: "video/final_fantasy_8_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.30,
            // vignette
            vigFade: 45,
        },
    },
    {
        desc: "[PSX] Final Fantasy IX",
        url: "video/final_fantasy_9_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.044,
        },
    },
    {
        desc: "[PSX] Metal Gear Solid",
        url: "video/metal_gear_solid_intro_long.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.251,
            // Scanlines
            scanLinesDensity: 90,
            scanLinesOpacity: 0.238,
        },
    },
    {
        desc: "[Arcade] Alien Vs Predator",
        url: "video/alien_vs_predator_intro.mp4",
        settings: new wa.data.DemoSettings(),
    },
    {
        desc: "[Arcade] Captain Commando",
        url: "video/captain_commando_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.94,
        },
    },
    {
        desc: "[Arcade] Outrun",
        url: "video/outrun_gameplay.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.94,
            // Scanlines
            scanLinesOpacity: 0.145,
            // Vignette
            fStop: 16.0,
        },
    },
    {
        desc: "[Arcade] Street Fighter 2 Hyper Fighting",
        url: "video/street_fighter_2_hyper_fighting_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.94,
        },
    },
    {
        desc: "[Arcade] Street Fighter Alpha 2",
        url: "video/street_fighter_alpha_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.94,
        },
    },
    {
        desc: "[Arcade] Street Fighter Alpha 3",
        url: "video/street_fighter_alpha_3_intro.mp4",
        settings: new wa.data.DemoSettings(),
    },
    {
        desc: "[Arcade] The Final Fight",
        url: "video/final_fight_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.251,
        },
    },
    {
        desc: "[Genesis] Burning Force",
        url: "video/burning_force_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.871,
            // Scanlines
            scanLinesDensity: 90,
            scanLinesOpacity: 0.238,
        },
    },
    {
        desc: "[Genesis] Comix Zone",
        url: "video/comix_zone_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.113,
            // Scanlines
            scanLinesDensity: 96,
            scanLinesOpacity: 0.25,
        },
    },
    {
        desc: "[Genesis] Castlevania: Bloodlines",
        url: "video/castlevania_bloodlines_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.975,
            // Scanlines
            scanLinesDensity: 98,
            scanLinesOpacity: 0.187,
        },
    },
    {
        desc: "[Genesis] Gargoyles",
        url: "video/gargoyles_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.596,
            // Scanlines
            scanLinesDensity: 98,
            scanLinesOpacity: 0.187,
        },
    },
    {
        desc: "[Genesis] Gunstar Heroes",
        url: "video/gunstar_heroes_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.975,
            // Scanlines
            scanLinesDensity: 98,
            scanLinesOpacity: 0.187,
        },
    },
    {
        desc: "[Genesis] Sonic The Hedgehog",
        url: "video/sonic_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.182,
            // Scanlines
            scanLinesDensity: 98,
            scanLinesOpacity: 0.165,
        },
    },
    {
        desc: "[Genesis] Streets of Rage 2",
        url: "video/streets_of_rage_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.182,

            // Scanlines
            scanLinesOpacity: 0.176,
        },
    },
    {
        desc: "[Genesis] Thunder Force IV",
        url: "video/thunder_force_4_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.28,

            // Scanlines
            scanLinesOpacity: 0.156,
        },
    },
    {
        desc: "[Genesis] Zero Wing",
        url: "video/zero_wing_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),

            // Scanlines
            scanLinesDensity: 94,
            scanLinesOpacity: 0.187,
        },
    },
    {
        desc: "[SNES] Chrono Trigger",
        url: "video/chrono_trigger_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.354,

            // vignette
            vigOuterBorder: 0.831,
        },
    },
    {
        desc: "[SNES] Final Fantasy IV",
        url: "video/final_fantasy_4_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.415,

            // vignette
            vigOuterBorder: 0.878,
        },
    },
    {
        desc: "[SNES] Final Fantasy V",
        url: "video/final_fantasy_5_intro_long.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.354,

            // vignette
            vigOuterBorder: 0.808,
        },
    },
    {
        desc: "[SNES] Final Fantasy VI",
        url: "video/final_fantasy_6_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[SNES] Super Metriod",
        url: "video/super_metroid_intro.mp4",
        settings: new wa.data.DemoSettings(),
    },
    {
        desc: "[SNES] Super Mario World",
        url: "video/super_mario_world_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 1.733,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[SNES] The Legend of Zelda: A Link to the Past",
        url: "video/zelda_link_to_the_past.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            bBrightness: 1.363,
        },
    },
    {
        desc: "[Neo Geo] Garou: Mark of the Wolves",
        url: "video/garou_mark_of_the_wolves_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.251,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] The King of Fighters 98",
        url: "video/king_of_fighters_98_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.285,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug X",
        url: "video/metal_slug_x_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.251,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 2",
        url: "video/metal_slug_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 3",
        url: "video/metal_slug_3_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.423,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 4",
        url: "video/metal_slug_4_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Metal Slug 5",
        url: "video/metal_slug_5_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Neo Drift Out",
        url: "video/neo_drift_out_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.285,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Neo Turf Masters",
        url: "video/neo_turf_masters_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Samurai Shodown II",
        url: "video/samurai_shodown_II_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] The Last Blade 1",
        url: "video/the_last_blade_1_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] The Last Blade 2",
        url: "video/the_last_blade_2_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
    {
        desc: "[Neo Geo] Windjammers",
        url: "video/windjammers_intro.mp4",
        settings: {
            ...new wa.data.DemoSettings(),
            // RGB
            imageBrightness: 2.32,

            // vignette
            vigOuterBorder: 0.82,
        },
    },
];
