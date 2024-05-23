
const fs = require( 'fs' );

// --------------------------------------------------

const v4_icons = require( './v4_icons.json' );

const v6_icons =
{
	'solid': require( './v6_icons.solid.json' ),
	'regular': require( './v6_icons.regular.json' ),
	'brands': require( './v6_icons.brands.json' ),
};

const v4_v6_official_remapping = require( './v4_v6_official_remapping.json' );

// --------------------------------------------------

var v4_v6_remapping = {};
var v4_v6_remapping_compressed = {};

// --------------------------------------------------

console.log( '\n---\n' );

console.log( 'Total v4 icons: ' + v4_icons.length );
console.log( 'Total official remaps: ' + Object.keys( v4_v6_official_remapping ).length );

// --------------------------------------------------
// Loop over all v4 icons first to establish what (if anything) needs doing with each

console.log( '\n---\n' );

console.log( 'First pass: applying the official remapping...' );

var invalid_remaps = [];
var missing_remaps = [];

v4_icons.forEach( v4_glyph =>
{
	var official_remap = v4_v6_official_remapping[ v4_glyph ];

	// Icon doesn't exist in remap
	if( official_remap == undefined )
	{
		missing_remaps.push( v4_glyph );
		return;
	}
	// Icon does exist in remap...
	else if( official_remap != undefined )
	{
		// ...but isn't a valid v6 icon
		if( v6_icons[ official_remap.collection ].indexOf( official_remap.glyph ) === -1 )
		{
			invalid_remaps.push( v4_glyph );
			return;
		}
		// ...or is a valid v6 icon
		else
		{
			// Cool - keep this one!
			v4_v6_remapping[ v4_glyph ] = official_remap;

			return;
		}
	}
});

console.log( 'Invalid remaps: ' + invalid_remaps.length );
console.log( 'Missing remaps: ' + missing_remaps.length );
console.log( 'Total remaps so far: ' + Object.keys( v4_v6_remapping ).length );

// --------------------------------------------------

console.log( '\n---\n' );

console.log( 'Searching for same-name missing mappings...' );

for( var v4_glyph_key in v4_icons )
{
	var v4_glyph = v4_icons[ v4_glyph_key ];

	// Skip if we already have a remap for this icon
	if( v4_v6_remapping[ v4_glyph ] !== undefined ) continue;

	// Iterate over each v6 collection to see if we can find a match
	for( var collection in v6_icons )
	{
		// If we find a match...
		if( v6_icons[ collection ].indexOf( v4_glyph ) !== -1 )
		{
			// Add it to our remapping
			v4_v6_remapping[ v4_glyph ] =
			{
				collection: collection,
				glyph: v4_glyph,
			};

			break;
		}
	}
}

console.log( 'Total remaps so far: ' + Object.keys( v4_v6_remapping ).length );

// --------------------------------------------------

console.log( '\n---\n' );

console.log( 'Applying manual remaps...' );

var fuzzy_remaps =
{
	// From the "Invalid remaps" in the official list
	"bank" : "building-columns",
	"behance-square" : "square-behance",
	"facebook-square" : "square-facebook",
	"git-square" : "square-git",
	"github-square" : "square-github",
	"google-plus-square" : "square-google-plus",
	"lastfm-square" : "square-lastfm",
	"odnoklassniki-square" : "square-odnoklassniki",
	"pinterest-square" : "square-pinterest",
	"reddit-square" : "square-reddit",
	"shield" : "shield",
	"snapchat-square" : "square-snapchat",
	"steam-square" : "square-steam",
	"tumblr-square" : "square-tumblr",
	"twitter-square" : "square-twitter",
	"viadeo-square" : "square-viadeo",
	"vimeo-square" : "square-vimeo",
	"xing-square" : "square-xing",
	"youtube-square" : "square-youtube",

	// What's left
	"adjust" : "circle-half-stroke",
	"ambulance" : "truck-medical",
	"american-sign-language-interpreting" : "hands-asl-interpreting",
	"angle-double-down" : "hands-asl-interpreting",
	"angle-double-left" : "angles-left",
	"angle-double-right" : "angles-right",
	"angle-double-up" : "angles-up",
	"archive" : "box-archive",
	"arrow-circle-down" : "circle-arrow-down",
	"arrow-circle-left" : "circle-arrow-left",
	"arrow-circle-right" : "circle-arrow-right",
	"arrow-circle-up" : "circle-arrow-up",
	"assistive-listening-systems" : "ear-listen",
	"balance-scale" : "scale-balanced",
	"beer" : "beer-mug-empty",
	"birthday-cake" : "cake-candles",
	"blind" : "person-walking-with-cane",
	"check-circle" : "circle-check",
	"check-square" : "square-check",
	"chevron-circle-down" : "circle-chevron-down",
	"chevron-circle-left" : "circle-chevron-left",
	"chevron-circle-right" : "circle-chevron-right",
	"chevron-circle-up" : "circle-chevron-up",
	"coffee" : "mug-saucer",
	"cog" : "gear",
	"cogs" : "gears",
	"columns" : "table-columns",
	"cut" : "scissors",
	"deaf" : "ear-deaf",
	"edit" : "pen-to-square",
	"ellipsis-h" : "ellipsis",
	"ellipsis-v" : "ellipsis-vertical",
	"envelope-square" : "square-envelope",
	"exclamation-circle" : "circle-exclamation",
	"exclamation-triangle" : "triangle-exclamation",
	"fast-backward" : "backward-fast",
	"fast-forward" : "forward-fast",
	"female" : "person-dress",
	"fighter-jet" : "jet-fighter",
	"h-square" : "square-h",
	"heartbeat" : "heart-pulse",
	"history" : "clock-rotate-left",
	"home" : "house",
	"info-circle" : "circle-info",
	"low-vision" : "eye-low-vision",
	"magic" : "wand-magic-sparkles",
	"male" : "person",
	"map-signs" : "signs-post",
	"mars-stroke-h" : "mars-stroke-right",
	"mars-stroke-v" : "mars-stroke-up",
	"medkit" : "suitcase-medical",
	"minus-circle" : "circle-minus",
	"minus-square" : "square-minus",
	"mouse-pointer" : "arrow-pointer",
	"paint-brush" : "paintbrush",
	"pause-circle" : "circle-pause",
	"phone-square" : "square-phone",
	"play-circle" : "circle-play",
	"plus-circle" : "circle-plus",
	"plus-square" : "square-plus",
	"question-circle" : "circle-question",
	"random" : "shuffle",
	"rss-square" : "square-rss",
	"save" : "floppy-disk",
	"search" : "magnifying-glass",
	"search-minus" : "magnifying-glass-minus",
	"search-plus" : "magnifying-glass-plus",
	"share-alt" : "share-nodes",
	"share-alt-square" : "square-share-nodes",
	"share-square" : "share-from-square",
	"shopping-bag" : "bag-shopping",
	"shopping-basket" : "basket-shopping",
	"shopping-cart" : "cart-shopping",
	"sign-language" : "hands",
	"space-shuttle" : "shuttle-space",
	"step-backward" : "backward-step",
	"step-forward" : "forward-step",
	"sticky-note" : "note-sticky",
	"stop-circle" : "circle-stop",
	"subway" : "train-subway",
	"tasks" : "list-check",
	"th" : "table-cells",
	"th-large" : "table-cells-large",
	"th-list" : "table-list",
	"thermometer-empty" : "temperature-empty",
	"thermometer-full" : "temperature-full",
	"thermometer-half" : "temperature-half",
	"thermometer-quarter" : "temperature-quarter",
	"thermometer-three-quarters" : "temperature-three-quarters",
	"times" : "xmark",
	"times-circle" : "circle-xmark",
	"tint" : "droplet",
	"transgender-alt" : "transgender",
	// "tripadvisor" : "",
	"undo" : "arrow-rotate-left",
	"university" : "building-columns",
	"unlink" : "link-slash",
	"unlock-alt" : "unlock-keyhole",
	"user-circle" : "circle-user",
	"user-md" : "user-doctor",
	"user-times" : "user-xmark",
	"volume-down" : "volume-low",
	"volume-up" : "volume-high",
	"window-close" : "rectangle-xmark",
};

for( var v4_glyph in fuzzy_remaps )
{
	// Iterate over each v6 collection to see if we can find a match
	for( var collection in v6_icons )
	{
		// If we find a match...
		if( v6_icons[ collection ].indexOf( fuzzy_remaps[ v4_glyph ] ) !== -1 )
		{
			// Add it to our remapping
			v4_v6_remapping[ v4_glyph ] =
			{
				collection: collection,
				glyph: fuzzy_remaps[ v4_glyph ],
			};

			break;
		}
	}
}

console.log( 'Total remaps so far: ' + Object.keys( v4_v6_remapping ).length );

// --------------------------------------------------

console.log( '\n---\n' );

console.log( 'What\'s left?' );

var remainder = [];

for( var v4_glyph_key in v4_icons )
{
	var v4_glyph = v4_icons[ v4_glyph_key ];

	if( v4_v6_remapping[ v4_glyph ] == undefined )
	{
		remainder.push( v4_glyph );
	}
}

console.log( JSON.stringify( remainder , null , 4 ) );

// --------------------------------------------------

console.log( '\n---\n' );

console.log( 'Compressing...' );

var collection_codes =
{
	'regular': 0,
	'solid': 1,
	'brands': 2,
};

for( var v4_glyph in v4_v6_remapping )
{
	var remap = v4_v6_remapping[ v4_glyph ];

	var v6_glyph = remap.glyph;
	var v6_collection = remap.collection;

	if( v4_glyph == v6_glyph )
	{
		v4_v6_remapping_compressed[ v4_glyph ] = collection_codes[ v6_collection ];
	}
	else
	{
		v4_v6_remapping_compressed[ v4_glyph ] = [ collection_codes[ v6_collection ] , v6_glyph ];
	}
}

// --------------------------------------------------

console.log( '\n---\n' );

var output_path = './output/v4_v6_remapping.json';
console.log( 'Writing to ' + output_path );
fs.writeFileSync( output_path , JSON.stringify( v4_v6_remapping , null , '\t' ) );

var output_path_compressed = './output/v4_v6_remapping_compressed.json';
console.log( 'Writing to ' + output_path_compressed );
fs.writeFileSync( output_path_compressed , JSON.stringify( v4_v6_remapping_compressed ) );

// --------------------------------------------------

// console.log( JSON.stringify( v4_v6_remapping , null , '\t' ) );

console.log( '\n---\n' );

console.log( 'Done!\n' );

// --------------------------------------------------
