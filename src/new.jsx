// // import React, { useState, createContext, useContext, useEffect } from 'react';
// // import { FiPlus, FiTrash2, FiEdit2, FiSave, FiDownload, FiEye, FiEyeOff, FiChevronDown, FiChevronRight, FiPackage, FiCheckCircle, FiAlertCircle, FiCopy, FiLock, FiUnlock } from 'react-icons/fi';

// // // Enhanced Mock Data Structure
// // const mockData = {
// //   categories: {
// //     "Interior Design": {
// //       "Residential": {
// //         "Apartment": {
// //           "1 BHK": ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Entryway"],
// //           "2 BHK": ["Living Room", "Bedroom", "Bedroom 2", "Kitchen", "Bathroom", "Bathroom 2", "Entryway"],
// //           "3 BHK": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Balcony"],
// //           "4 BHK": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Bathroom 3", "Balcony", "Study Room"],
// //           "5 BHK": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Bedroom 5", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Bathroom 3", "Study Room", "Balcony", "Terrace"],
// //           "6 BHK": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Bedroom 5", "Bedroom 6", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Bathroom 3", "Bathroom 4", "Study Room", "Home Office", "Balcony", "Terrace"],
// //           "Studio Apartment": ["Living/Bedroom Area", "Kitchen", "Bathroom"],
// //           "Service Apartment": ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Laundry Room"],
// //           "Builder Floor Apartment": ["Living Room", "Master Bedroom", "Bedroom 2", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Balcony"],
// //           "Penthouse": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Terrace", "Home Office", "Media Room"],
// //           "Duplex Interior": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Study Room", "Balcony", "Terrace"]
// //         },
// //         "Raw House": ["Living Room", "Master Bedroom", "Bedroom 2", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Entryway", "Storage"],
// //         "Bungalow": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Garage", "Garden Space"],
// //         "Villa": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Bathroom 3", "Guest Room", "Home Office", "Media Room", "Garage", "Terrace", "Garden Space"],
// //         "Farm House": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Outdoor Lounge", "Storage", "Garden Space"],
// //         "Luxury Villa": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Bathroom 3", "Guest Room", "Home Office", "Media Room", "Wine Cellar", "Spa Room", "Fitness Room", "Garage", "Terrace", "Garden Space"],
// //         "Townhouse": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Home Office", "Garage", "Balcony"],
// //         "Row House": ["Living Room", "Master Bedroom", "Bedroom 2", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Terrace", "Small Garden"],
// //         "Independent House": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Pooja Room", "Garage", "Garden Space"],
// //         "Cluster Villa": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Garage", "Common Garden Access"],
// //         "Cottage": ["Living Room", "Master Bedroom", "Bedroom 2", "Kitchen", "Bathroom", "Garden Space"],
// //         "Haveli": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Courtyard", "Pooja Room", "Traditional Areas"],
// //         "Kothi": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Garage", "Garden Space"],
// //         "Mansion": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Bedroom 4", "Bedroom 5", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Bathroom 3", "Bathroom 4", "Guest Room", "Home Office", "Library", "Media Room", "Wine Cellar", "Spa Room", "Fitness Room", "Indoor Pool Area", "Garage", "Multiple Terraces", "Garden Space"],
// //         "Gated Community Villa": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Home Office", "Garage", "Terrace", "Garden Space"],
// //         "Weekend Home": ["Living Room", "Master Bedroom", "Bedroom 2", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Outdoor Lounge", "Garden Space"],
// //         "Beach Villa": ["Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Dining Room", "Bathroom 1", "Bathroom 2", "Guest Room", "Outdoor Lounge", "Beach Deck", "Garden Space"],
// //         "Hill View Cottage": ["Living Room", "Master Bedroom", "Bedroom 2", "Kitchen", "Dining Room", "Bathroom", "Balcony with View", "Garden Space"],
// //         "Treehouse": ["Living/Sleeping Area", "Small Kitchen", "Bathroom", "Outdoor Deck"]
// //       },
// //       "Commercial Space": {
// //         "Retail": {
// //           "Retail Display": ["Baby Products", "Shoes", "Perfumes", "Jewelry", "Fashion", "Watches", "Mobile Phones", "Toys", "Salons", "Cosmetics"],
// //           "Retail Stores": ["Clothing & Accessories", "Electronics & Gadgets", "Home & Living", "Beauty & Personal Care", "Sports & Outdoor", "Kids & Toys", "Groceries & Food", "Books & Stationery", "Automotive & Tools", "Pet Supplies", "Health & Wellness", "Furniture & Decor", "Jewelry & Watches", "Office Supplies & Equipment", "Garden & Outdoor Living", "Footwear", "Luggage & Travel Gear", "Music & Entertainment", "Arts & Crafts", "Specialty Foods & Gourmet Items", "Hardware & Home Improvement", "Fitness & Exercise Equipment", "Pharmacy & Drugstore", "Party Supplies & Gifts", "Discount & Variety Stores"]
// //         },
// //         "Hospitality": {
// //           "Hotels": ["Luxury Hotels", "Budget Hotels", "Boutique Hotels", "Hostels"],
// //           "Restaurants": ["Fine Dining", "Casual Dining", "Fast Food", "Buffets"],
// //           "Cafes": ["Coffee Shops", "Tea Houses", "Dessert Cafes", "Internet Cafes"],
// //           "Bars": ["Sports Bars", "Cocktail Lounges", "Wine Bars", "Pubs", "Nightclubs"]
// //         },
// //         "Healthcare": {
// //           "Clinics": ["Dental Clinics", "General Practice", "Specialized Clinics", "Outpatient Centers"],
// //           "Hospitals": ["General Hospitals", "Children's Hospitals", "Rehabilitation Centers", "Mental Health Facilities"],
// //           "Wellness Centers": ["Spas", "Massage Centers", "Nutrition Clinics", "Holistic Treatment Centers"]
// //         },
// //         "Educational Spaces": {
// //           "Schools": ["Primary Schools", "Secondary Schools", "Kindergartens", "Special Education Schools"],
// //           "Universities": ["Public Universities", "Private Colleges", "Technical Institutes", "Online Learning Centers"],
// //           "Training Centers": ["Vocational Schools", "Corporate Training Centers", "Language Institutes", "Art Schools"]
// //         },
// //         "Entertainment Venues": {
// //           "Theaters": ["Drama Theaters", "Opera Houses", "Dance Halls", "Amphitheaters"],
// //           "Cinemas": ["Multiplexes", "IMAX Theaters", "Drive-in Cinemas", "Independent Film Cinemas"],
// //           "Nightclubs": ["Dance Clubs", "Karaoke Bars", "Jazz Clubs", "Live Music Venues"],
// //           "Gaming Centers": ["Arcades", "eSports Arenas", "Virtual Reality Centers", "Bowling Alleys"]
// //         },
// //         "Industrial Spaces": {
// //           "Factories": ["Automobile Manufacturing", "Electronics Production", "Food Processing Plants", "Textile Mills"],
// //           "Warehouses": ["Distribution Centers", "Cold Storage Facilities", "Fulfillment Centers", "Self-Storage Units"],
// //           "Production Facilities": ["Printing Plants", "Assembly Lines", "Bottling Plants", "Chemical Plants"]
// //         },
// //         "Government & Public Spaces": {
// //           "Libraries": ["City Libraries", "University Libraries", "Research Libraries", "Digital Libraries"],
// //           "Community Centers": ["Youth Centers", "Senior Centers", "Recreation Centers", "Cultural Centers"],
// //           "Administrative Offices": ["Municipal Buildings", "Post Offices", "Courthouses", "Public Service Centers"]
// //         },
// //         "Transportation Hubs": {
// //           "Airports": ["International Airports", "Domestic Airports", "Regional Airports", "Private Airfields"],
// //           "Train Stations": ["Central Stations", "Suburban Stations", "High-Speed Rail Terminals", "Freight Depots"],
// //           "Bus Terminals": ["City Bus Stations", "Intercity Bus Terminals", "Shuttle Hubs", "Tourist Bus Stops"],
// //           "Ports & Harbors": ["Commercial Ports", "Fishing Harbors", "Cruise Ship Terminals", "Marinas"]
// //         },
// //         "Exhibition & Event Spaces": {
// //           "Convention Centers": ["Trade Show Venues", "Conference Centers", "Exhibition Halls", "Business Forums"],
// //           "Museums": ["Art Museums", "History Museums", "Science Centers", "Children's Museums"],
// //           "Galleries": ["Art Galleries", "Photography Studios", "Sculpture Exhibits", "Pop-up Exhibitions"],
// //           "Event Venues": ["Banquet Halls", "Concert Venues", "Open-Air Arenas", "Wedding Venues"]
// //         },
// //         "Sports Facilities": {
// //           "Gyms": ["Fitness Centers", "Yoga Studios", "Pilates Studios", "CrossFit Gyms"],
// //           "Stadiums": ["Football Stadiums", "Cricket Grounds", "Track and Field Arenas", "Multi-Purpose Arenas"],
// //           "Fitness Centers": ["Swimming Pools", "Sports Complexes", "Climbing Gyms", "Martial Arts Dojos"],
// //           "Recreational Facilities": ["Golf Courses", "Tennis Courts", "Skate Parks", "Ice Rinks"]
// //         }
// //       }
// //     },
// //     "Old Premises Renovation": {
// //       "Structural Renovation": ["Foundation Repair", "Wall Strengthening", "Column Repair", "Beam Renovation"],
// //       "Electrical System Overhaul": ["Rewiring", "Panel Upgrade", "Safety Systems", "Smart Home Integration"],
// //       "Plumbing and Drainage Renovation": ["Pipe Replacement", "Drainage System", "Water Tank", "Sewage System"],
// //       "Roof Repair and Waterproofing": ["Leak Repair", "Waterproofing", "Insulation", "Roof Replacement"],
// //       "Flooring Replacement or Polishing": ["Tile Replacement", "Wood Polishing", "Marble Restoration", "Carpet Installation"],
// //       "Wall Plastering and Painting": ["Surface Preparation", "Plastering", "Painting", "Texture Work"],
// //       "Ceiling Renovation (POP/False Ceiling)": ["POP Ceiling", "False Ceiling", "Lighting Integration", "Repair Work"],
// //       "Kitchen Remodeling": ["Cabinet Renovation", "Countertop Replacement", "Appliance Installation", "Layout Redesign"],
// //       "Bathroom Renovation": ["Sanitary Ware", "Tiling", "Plumbing Fixtures", "Ventilation"],
// //       "Window and Door Replacement": ["uPVC Windows", "Wooden Doors", "Aluminum Windows", "Smart Locks"],
// //       "Balcony/Veranda Upgradation": ["Flooring", "Railing", "Waterproofing", "Garden Setup"],
// //       "Façade Renovation": ["Exterior Paint", "Cladding", "Stone Work", "Glass Work"],
// //       "Staircase and Railing Refurbishment": ["Railing Replacement", "Step Repair", "Safety Features", "Design Upgrade"],
// //       "Woodwork and Carpentry Repair": ["Furniture Repair", "Door Repair", "Window Repair", "Custom Woodwork"],
// //       "Lighting and Fixtures Replacement": ["LED Installation", "Fixture Upgrade", "Smart Lighting", "Decorative Lighting"],
// //       "Interior Design Renovation": ["Space Planning", "Color Scheme", "Furniture Selection", "Decor"],
// //       "Insulation and Soundproofing": ["Thermal Insulation", "Sound Insulation", "Window Treatment", "Wall Treatment"],
// //       "Pest Control Treatment": ["Termite Treatment", "Rodent Control", "Insect Control", "Preventive Treatment"],
// //       "Heritage Building Restoration": ["Structural Restoration", "Facade Restoration", "Historic Preservation", "Documentation"],
// //       "Terrace Garden or Rooftop Development": ["Waterproofing", "Garden Setup", "Seating Area", "Irrigation System"],
// //       "Security System Upgradation": ["CCTV Installation", "Access Control", "Alarm System", "Smart Security"],
// //       "HVAC (Heating, Ventilation, and Air Conditioning) Renovation": ["AC Installation", "Ventilation System", "Heating System", "Duct Work"],
// //       "Lift Installation or Repair": ["New Lift Installation", "Lift Repair", "Modernization", "Safety Upgrade"],
// //       "Basement Renovation": ["Waterproofing", "Ventilation", "Storage Setup", "Utility Room"],
// //       "Landscape Renovation (Courtyard/Garden)": ["Garden Design", "Plantation", "Hardscape", "Lighting"]
// //     },
// //     "Curtain": {
// //       "Sheer Curtains": ["Light Filtering", "Privacy", "Decorative"],
// //       "Blackout Curtains": ["Complete Darkness", "Thermal Insulation", "Noise Reduction"],
// //       "Layered Curtains": ["Sheer + Blackout", "Decorative Layers", "Functional Layers"],
// //       "Drapes and Valances": ["Traditional Style", "Modern Style", "Custom Design"],
// //       "Roman Blinds": ["Fabric Options", "Motorized", "Manual"],
// //       "Roller Blinds": ["Blackout", "Sunscreen", "Translucent"],
// //       "Panel Curtains": ["Sliding Panels", "Room Dividers", "Large Windows"],
// //       "Pleated Curtains": ["Pinch Pleat", "Pencil Pleat", "Goblet Pleat"],
// //       "Eyelet Curtains": ["Modern Style", "Easy Installation", "Various Fabrics"],
// //       "Rod Pocket Curtains": ["Traditional Style", "Gathered Look", "Easy Hanging"],
// //       "Tab Top Curtains": ["Casual Style", "Loop Hanging", "Decorative"],
// //       "Tie-Back Curtains": ["Side Draping", "Decorative Ties", "Light Control"],
// //       "Motorized Curtains": ["Remote Control", "Smart Home Integration", "Automated"],
// //       "Curtain Pelmets": ["Fabric Pelmets", "Wooden Pelmets", "Decorative"],
// //       "Curtain Tracks and Rods": ["Metal Rods", "Wooden Rods", "Ceiling Tracks"],
// //       "Printed and Patterned Curtains": ["Floral", "Geometric", "Abstract"],
// //       "Embroidered Curtains": ["Hand Embroidered", "Machine Embroidered", "Designer"],
// //       "Velvet Curtains": ["Luxury Feel", "Thermal Insulation", "Rich Colors"],
// //       "Linen Curtains": ["Natural Look", "Breathable", "Casual Style"],
// //       "Silk Curtains": ["Premium Quality", "Elegant Look", "Luxury"]
// //     },
// //     "Interior Styling": {
// //       "Wall Art and Paintings": ["Canvas Art", "Framed Prints", "Wall Murals", "3D Wall Art"],
// //       "Statement Lighting Fixtures": ["Chandeliers", "Pendant Lights", "Floor Lamps", "Table Lamps"],
// //       "Rugs and Carpets": ["Area Rugs", "Runner Rugs", "Wall-to-Wall Carpet", "Custom Rugs"],
// //       "Cushion and Pillow Styling": ["Throw Pillows", "Floor Cushions", "Bolster Pillows", "Designer Cushions"],
// //       "Indoor Plants and Planters": ["Large Plants", "Small Plants", "Hanging Plants", "Planters"],
// //       "Mirror Decor": ["Wall Mirrors", "Floor Mirrors", "Decorative Mirrors", "Functional Mirrors"],
// //       "Accent Furniture Pieces": ["Accent Chairs", "Side Tables", "Consoles", "Ottomans"],
// //       "Modular Storage Units": ["Shelving Systems", "Cabinets", "Display Units", "Storage Boxes"],
// //       "Customized Wallpaper and Wall Panels": ["Printed Wallpaper", "Textured Panels", "3D Panels", "Custom Design"],
// //       "False Ceiling and Cove Lighting": ["POP Ceiling", "Gypsum Ceiling", "LED Cove", "Designer Ceiling"],
// //       "Textured Walls (Stucco, Brick, or Wood Panels)": ["Stucco Finish", "Exposed Brick", "Wood Panels", "Stone Cladding"],
// //       "Upholstery and Fabric Styling": ["Sofa Upholstery", "Chair Upholstery", "Curtain Fabric", "Bed Linen"],
// //       "Sofa Throws and Blankets": ["Cotton Throws", "Wool Blankets", "Designer Throws", "Knitted Blankets"],
// //       "Coffee Table Styling": ["Decorative Trays", "Books", "Candles", "Vases"],
// //       "Home Fragrance Styling (Diffusers/Candles)": ["Reed Diffusers", "Scented Candles", "Essential Oils", "Room Sprays"],
// //       "Photo Frames and Gallery Walls": ["Single Frames", "Multi-Frame Sets", "Gallery Wall Layout", "Custom Frames"],
// //       "Minimalist Decor Styling": ["Clean Lines", "Neutral Colors", "Functional Pieces", "Simple Design"],
// //       "Boho-Chic Interior Styling": ["Eclectic Mix", "Natural Materials", "Colorful Textiles", "Vintage Pieces"],
// //       "Vintage and Antique Decor Elements": ["Antique Furniture", "Vintage Accessories", "Retro Items", "Collectibles"],
// //       "Smart Home Integration for Interiors": ["Smart Lighting", "Voice Control", "Automated Systems", "Smart Appliances"]
// //     },
// //     "Fabrication": {
// //       "Furniture": {
// //         "Side Table": ["Metal Side Table", "Wooden Side Table", "Glass Top Side Table", "Custom Design"],
// //         "Coffee Table": ["Metal Coffee Table", "Wooden Coffee Table", "Glass Coffee Table", "Designer Table"],
// //         "Bookshelf": ["Wall-Mounted", "Freestanding", "Modular", "Custom Design"]
// //       },
// //       "Doors & Windows": {
// //         "Door": ["Metal Door", "Wooden Door", "Glass Door", "Fire Door"],
// //         "Window Frame": ["Aluminum Frame", "uPVC Frame", "Wooden Frame", "Steel Frame"],
// //         "Sliding Door": ["Glass Sliding Door", "Metal Sliding Door", "Wooden Sliding Door"]
// //       },
// //       "Railings": {
// //         "Staircase Railing": ["SS Railing", "Glass Railing", "Wooden Railing", "MS Railing"],
// //         "Balcony Railing": ["SS Railing", "Glass Railing", "Wrought Iron", "Cable Railing"],
// //         "Handrails": ["Wall Mounted", "Freestanding", "Designer", "Safety Rails"]
// //       },
// //       "Gates": {
// //         "Main Gate": ["Swing Gate", "Sliding Gate", "Automatic Gate", "Designer Gate"],
// //         "Sliding Gate": ["Manual", "Automatic", "Heavy Duty", "Residential"],
// //         "Swing Gate": ["Single Door", "Double Door", "Decorative", "Security Gate"]
// //       },
// //       "Structures": {
// //         "Industrial Sheds": ["Steel Structure", "Pre-Engineered", "Custom Design", "Warehouse Shed"],
// //         "Warehouse Structures": ["Steel Framework", "Roofing", "Cladding", "Mezzanine"],
// //         "Carports": ["Metal Carport", "Polycarbonate Roof", "Designer Carport", "Multi-Car"]
// //       },
// //       "Sheet Metal Fabrication": {
// //         "Ductwork": ["HVAC Ducts", "Exhaust Ducts", "Custom Ducts", "Industrial Ducts"],
// //         "Metal Cabinets": ["Storage Cabinet", "Tool Cabinet", "Electrical Cabinet", "Custom Cabinet"],
// //         "Panels": ["Wall Panels", "Ceiling Panels", "Decorative Panels", "Functional Panels"]
// //       },
// //       "Custom Fabrication": {
// //         "Customized Grills": ["Window Grills", "Door Grills", "Decorative Grills", "Safety Grills"],
// //         "Decorative Metal Artworks": ["Wall Art", "Sculptures", "Custom Design", "Artistic Pieces"],
// //         "Custom Metal Frames": ["Picture Frames", "Mirror Frames", "Structural Frames", "Display Frames"]
// //       },
// //       "Heavy Structural Fabrication": {
// //         "Beams": ["I-Beams", "H-Beams", "Box Beams", "Custom Beams"],
// //         "Columns": ["Steel Columns", "RCC Columns", "Composite Columns", "Decorative Columns"],
// //         "Trusses": ["Roof Trusses", "Bridge Trusses", "Industrial Trusses", "Custom Trusses"]
// //       },
// //       "Steel Fabrication": {
// //         "Steel Staircases": ["Straight Stairs", "Spiral Stairs", "L-Shaped", "U-Shaped"],
// //         "Steel Canopies": ["Entrance Canopy", "Parking Canopy", "Walkway Cover", "Designer Canopy"],
// //         "Steel Walkways": ["Industrial Walkway", "Garden Pathway", "Bridge", "Platform"]
// //       },
// //       "Aluminum Fabrication": {
// //         "Aluminum Doors": ["Sliding Door", "Swing Door", "Folding Door", "Designer Door"],
// //         "Aluminum Windows": ["Sliding Window", "Casement Window", "Fixed Window", "Designer Window"],
// //         "Aluminum Partitions": ["Office Partition", "Glass Partition", "Modular Partition", "Soundproof"]
// //       },
// //       "Stainless Steel Fabrication": {
// //         "Stainless Steel Kitchen Countertops": ["Custom Design", "Commercial Grade", "Residential", "Designer"],
// //         "Stainless Steel Railings": ["Balcony Railing", "Staircase Railing", "Safety Railing", "Designer Railing"],
// //         "Stainless Steel Shelving": ["Kitchen Shelves", "Storage Shelves", "Display Shelves", "Industrial Shelves"]
// //       },
// //       "Pipe Fabrication": {
// //         "Pipeline Systems": ["Water Pipeline", "Gas Pipeline", "Industrial Pipeline", "Custom Pipeline"],
// //         "Water Pipe Installations": ["Residential", "Commercial", "Industrial", "Custom"],
// //         "Gas Pipe Fabrication": ["LPG Pipeline", "PNG Pipeline", "Industrial Gas", "Safety Systems"]
// //       }
// //     }
// //   },
// //   subAreas: {
// //     "Living Room": ["Seating Area", "Entertainment Area", "Coffee Table Area", "Decorative Space", "Reading Nook", "TV Unit Area", "False Ceiling", "Flooring", "Wall Treatment", "Lighting"],
// //     "Bedroom": ["Sleeping Area", "Wardrobe", "Nightstand", "Dressing Area", "Study/Work Area", "Bed Area", "False Ceiling", "Flooring", "Wall Treatment", "Lighting"],
// //     "Dining Room": ["Dining Table", "Buffet/Sideboard", "Beverage Station", "Storage Cabinet", "Lighting", "Wall Decor"],
// //     "Kitchen": ["Cooking Area", "Storage", "Dining Area", "Pantry", "Counter Space", "Modular Kitchen", "Countertop", "Backsplash", "Flooring", "Lighting", "Appliances Area"],
// //     "Bathroom": ["Shower Area", "Toilet Area", "Sink/Vanity", "Storage Cabinet", "Bathtub Area", "Sanitary Ware", "Tiles", "Fittings", "Mirror & Storage", "Lighting"],
// //     "Guest Room": ["Bed Area", "Wardrobe", "Seating Area", "Desk Area"],
// //     "Laundry Room": ["Washer/Dryer", "Storage", "Folding Area"],
// //     "Pooja Room": ["Prayer Altar", "Storage", "Seating Area"],
// //     "Basement": ["Storage", "Utility Room", "Recreational Area", "Workshop Area"],
// //     "Media Room": ["Screen/Projector Area", "Seating Area", "Audio/Visual Equipment"],
// //     "Home Office": ["Desk Area", "Storage", "Meeting Area"],
// //     "Entryway": ["Coat Rack", "Shoe Rack", "Mirror", "Welcome Area"],
// //     "Garage": ["Car Parking", "Storage"],
// //     "Hallway": ["Passage", "Corridor"],
// //     "Balcony": ["Seating Area", "Garden Space"],
// //     "Terrace": ["Seating Area", "Plant Area"],
// //     "Study Room": ["Desk Area", "Bookshelves", "Reading Nook"],
// //     "Walk-In Closet": ["Clothing Storage", "Shoe Rack"],
// //     "Pet Room": ["Pet Bed", "Play Area", "Feeding Station"],
// //     "Shoe Room": ["Shoe Rack", "Storage Shelves"],
// //     "Store Room": ["Shelving", "Storage Bins"],
// //     "Server Room": ["Equipment Storage", "Cable Management Area"],
// //     "Servant Room": ["Sleeping Area", "Storage"],
// //     "Pantry": ["Food Storage", "Shelving"],
// //     "Library/Reading Room": ["Book Storage", "Reading Desk", "Lounge Area"],
// //     "Sunroom": ["Seating Area", "Plant Display", "Decorative Lighting Area"],
// //     "Wine Cellar": ["Wine Racks", "Tasting Area", "Storage for Accessories"],
// //     "Mudroom": ["Coat and Shoe Storage", "Cleaning Supplies Storage"],
// //     "Game Room": ["Game Tables", "Arcade Area", "Lounge Area"],
// //     "Bar Room": ["Bar Counter", "Beverage Display Area", "Seating Area"],
// //     "Spa Room": ["Jacuzzi Area", "Sauna", "Massage Area"],
// //     "Greenhouse": ["Planting Stations", "Watering Area", "Storage for Tools"],
// //     "Kids' Playroom": ["Toy Storage", "Activity Tables", "Cushioned Play Area"],
// //     "Music Room": ["Instrument Storage", "Practice Area", "Recording Setup"],
// //     "Craft Room": ["Art Supplies Storage", "Craft Table", "Display Shelves"],
// //     "Fitness Room": ["Cardio Equipment Area", "Weight Training Area", "Yoga/Meditation Corner"],
// //     "Meditation Room": ["Altar or Focal Point", "Cushioned Floor Area", "Incense/Lighting Area"],
// //     "Outdoor Lounge": ["Fire Pit Area", "Hammock or Swing Area", "Outdoor Dining Area"],
// //     "Workshop/Garage Studio": ["Workbench", "Tool Storage", "Project Area"],
// //     "Attic Room": ["Storage Nook", "Loft Bedroom", "Workspace"],
// //     "Atrium": ["Vertical Garden", "Seating Lounge", "Skylight Area"],
// //     "Co-Working Space": ["Shared Desks", "Conference Nook", "Breakout Area"],
// //     "Home Theater": ["Recliner Seating", "Soundproofing Area", "Concession Stand"],
// //     "Hobby Room": ["Model Crafting Area", "Train/Model Storage", "Display Area"],
// //     "Study Lounge": ["Group Study Area", "Presentation Corner", "Resource Library"],
// //     "Zen Garden": ["Stone Pathways", "Mini Waterfall/Fountain", "Bonsai Display Area"],
// //     "Indoor Pool Area": ["Pool Deck", "Changing/Shower Area", "Lounge Area"]
// //   },
// //   demographics: ["Young Adults (20-29)", "Adults (30-45)", "Senior Citizens (45+)", "Families with Kids", "Single Professionals", "Couples", "Joint Families"],
// //   budgetRanges: ["Low Budget (₹3L-₹10L)", "Medium Budget (₹10L-₹25L)", "High Budget (₹25L-₹50L)", "Premium (₹50L+)", "Ultra Luxury (₹1Cr+)"],
// //   cities: ["Surat", "Mumbai", "Ahmedabad", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Jaipur", "Lucknow", "Chandigarh", "Indore", "Vadodara"],
// //   services: {
// //     "False Ceiling": {
// //       materials: [
// //         { 
// //           name: "PVC Ceiling", 
// //           baseRate: 160, 
// //           unit: "sqft",
// //           brands: ["Supreme", "Sintex", "Vectus"],
// //           thickness: ["8mm", "10mm"],
// //           finish: ["Glossy", "Matte", "Wood Finish"]
// //         },
// //         { 
// //           name: "Metal Ceiling", 
// //           baseRate: 280, 
// //           unit: "sqft",
// //           brands: ["Armstrong", "Hunter Douglas", "Rockfon"],
// //           thickness: ["0.5mm", "0.7mm"],
// //           finish: ["Powder Coated", "Anodized", "Perforated"]
// //         },
// //         { 
// //           name: "Wooden Ceiling", 
// //           baseRate: 450, 
// //           unit: "sqft",
// //           brands: ["Greenply", "Century", "Local Teak"],
// //           thickness: ["12mm", "18mm", "25mm"],
// //           finish: ["Natural", "Stained", "Polished"]
// //         }
// //       ],
// //       subMaterials: {
// //         frame: ["MS Channel", "Wooden Batten", "GI Channel", "Aluminum Channel"],
// //         fasteners: ["Screws", "Nails", "Adhesives", "Hangers"],
// //         finishing: ["Putty", "Primer", "Paint", "Texture"]
// //       },
// //       labourRate: 40,
// //       wastage: 10,
// //       taxRate: 18
// //     },
// //     "Flooring": {
// //       materials: [
// //         { name: "Vitrified Tiles", baseRate: 85, unit: "sqft", brands: ["Kajaria", "Somany", "Johnson", "Nitco"], sizes: ["2x2", "2x4", "4x4"], finish: ["Glossy", "Matte", "Rustic"] },
// //         { name: "Ceramic Tiles", baseRate: 55, unit: "sqft", brands: ["Kajaria", "Somany", "Orient Bell"], sizes: ["1x1", "2x2"], finish: ["Glossy", "Matte"] },
// //         { name: "Wooden Flooring", baseRate: 350, unit: "sqft", brands: ["Greenply", "Century", "Armstrong", "Pergo"], types: ["Laminate", "Engineered", "Solid Wood"] },
// //         { name: "Marble", baseRate: 450, unit: "sqft", brands: ["Italian", "Indian", "Imported"], types: ["White Carrara", "Beige", "Black Marquina", "Green"], finish: ["Polished", "Honed", "Brushed"] },
// //         { name: "Granite", baseRate: 180, unit: "sqft", brands: ["Local", "Imported", "Indian Granite"], types: ["Polished", "Flamed", "Leather Finish"], colors: ["Black", "Brown", "Grey", "Multi-Color"] },
// //         { name: "Vinyl Flooring", baseRate: 120, unit: "sqft", brands: ["Armstrong", "Tarkett", "Forbo"], types: ["Sheet", "Plank", "Tile"] },
// //         { name: "Epoxy Flooring", baseRate: 200, unit: "sqft", brands: ["Asian Paints", "Berger", "Sika"], types: ["Self-Leveling", "Mortar", "Terrazzo"] },
// //         { name: "Mosaic Tiles", baseRate: 65, unit: "sqft", brands: ["Asian Granito", "Somany", "H&R Johnson"], sizes: ["Small Format", "Penny Round", "Hexagon"] },
// //         { name: "Porcelain Tiles", baseRate: 95, unit: "sqft", brands: ["Kajaria", "Somany", "RAK Ceramics"], sizes: ["2x2", "2x4", "Large Format"], finish: ["Glossy", "Matte", "Wood Effect"] }
// //       ],
// //       subMaterials: {
// //         base: ["Cement", "Sand", "Adhesive", "Leveling Compound"],
// //         grout: ["Standard Grout", "Epoxy Grout", "Flexible Grout"],
// //         sealant: ["None", "Basic Sealant", "Premium Sealant", "Nano Protection"],
// //         underlayment: ["Foam", "Cork", "Plywood", "Moisture Barrier"]
// //       },
// //       labourRate: 35,
// //       wastage: 8,
// //       taxRate: 18
// //     },
// //     "Wall Painting": {
// //       materials: [
// //         { name: "Emulsion", baseRate: 18, unit: "sqft", brands: ["Asian Paints", "Berger", "Nerolac", "Dulux"], types: ["Basic", "Premium", "Royal", "Luxury"], finish: ["Matte", "Silk", "Sheen"] },
// //         { name: "Distemper", baseRate: 12, unit: "sqft", brands: ["Asian Paints", "Berger", "Nerolac"], types: ["Acrylic", "Synthetic"] },
// //         { name: "Texture Paint", baseRate: 45, unit: "sqft", brands: ["Asian Paints", "Berger", "Dulux", "Nippon"], types: ["Sand", "Rustic", "Designer", "Metallic"] },
// //         { name: "Wallpaper", baseRate: 65, unit: "sqft", brands: ["D'Decor", "Asian Paints", "Nilaya", "Marshalls"], types: ["Vinyl", "Fabric", "3D", "Grass Cloth"] },
// //         { name: "Enamel Paint", baseRate: 25, unit: "sqft", brands: ["Asian Paints", "Berger", "Dulux"], types: ["Oil-Based", "Water-Based"], finish: ["Glossy", "Semi-Gloss"] },
// //         { name: "Wood Paint", baseRate: 30, unit: "sqft", brands: ["Asian Paints", "Berger", "ICA"], types: ["Stain", "Varnish", "PU Polish", "Melamine"] }
// //       ],
// //       subMaterials: {
// //         preparation: ["Putty", "Primer", "Wall Filler", "Crack Sealer"],
// //         tools: ["Roller", "Brush", "Spray Gun", "Masking Tape"]
// //       },
// //       labourRate: 12,
// //       wastage: 15,
// //       taxRate: 18
// //     },
// //     "Modular Kitchen": {
// //       materials: [
// //         { name: "HDHMR", baseRate: 1850, unit: "sqft", brands: ["Greenply", "Century", "Action Tesa"], finish: ["Laminate", "Acrylic", "PU Paint"], thickness: ["18mm", "19mm"] },
// //         { name: "Marine Ply", baseRate: 2400, unit: "sqft", brands: ["Greenply", "Century", "Kitply"], finish: ["Laminate", "Veneer", "PU Paint"], thickness: ["18mm", "19mm", "25mm"] },
// //         { name: "Membrane", baseRate: 3200, unit: "sqft", brands: ["Hafele", "Hettich", "Blum"], finish: ["Matte", "Glossy", "Textured"] },
// //         { name: "Plywood", baseRate: 1600, unit: "sqft", brands: ["Greenply", "Century", "Sharon"], finish: ["Laminate", "Veneer"], thickness: ["18mm", "19mm"] },
// //         { name: "MDF", baseRate: 1400, unit: "sqft", brands: ["Greenpanel", "Century", "National"], finish: ["Laminate", "Painted"], thickness: ["18mm", "25mm"] }
// //       ],
// //       subMaterials: {
// //         countertop: ["Granite", "Quartz", "Solid Surface", "Marble", "Corian"],
// //         hardware: ["Hafele", "Hettich", "Ebco", "Godrej", "Blum"],
// //         accessories: ["Plain Basket", "SS Basket", "Tandem Unit", "Magic Corner", "Cutlery Tray", "Pull-Out", "Bottle Pullout"],
// //         sink: ["Stainless Steel", "Granite Sink", "Ceramic Sink", "Quartz Sink"],
// //         faucets: ["Jaquar", "Grohe", "Kohler", "Delta"]
// //       },
// //       labourRate: 450,
// //       wastage: 12,
// //       taxRate: 18
// //     },
// //     "Electrical Work": {
// //       materials: [
// //         { name: "Wiring", baseRate: 45, unit: "point", brands: ["Polycab", "Havells", "Finolex", "KEI"], wire: ["1.5mm", "2.5mm", "4mm", "6mm"] },
// //         { name: "Switches", baseRate: 85, unit: "point", brands: ["Legrand", "Schneider", "Anchor", "GM"], types: ["Modular", "Premium", "Smart Switch", "Touch Switch"] },
// //         { name: "Light Fixtures", baseRate: 450, unit: "piece", brands: ["Philips", "Wipro", "Syska", "Crompton"], types: ["LED Panel", "Chandelier", "Spot", "Pendant", "Tube Light"] },
// //         { name: "Fan", baseRate: 2500, unit: "piece", brands: ["Havells", "Crompton", "Orient", "Usha"], types: ["Ceiling Fan", "Pedestal Fan", "Exhaust Fan", "Designer Fan"] },
// //         { name: "MCB/Distribution Board", baseRate: 3500, unit: "set", brands: ["Havells", "Legrand", "Schneider", "Siemens"], types: ["4-Way", "8-Way", "12-Way", "16-Way"] }
// //       ],
// //       subMaterials: {
// //         conduit: ["PVC Pipe", "Metal Conduit", "Flexible Conduit"],
// //         boxes: ["Switch Box", "Junction Box", "Distribution Box"],
// //         mcb: ["Single Pole MCB", "Double Pole MCB", "RCCB", "ELCB"],
// //         accessories: ["Cable Ties", "Clamps", "Lugs", "Terminal Blocks"]
// //       },
// //       labourRate: 85,
// //       wastage: 5,
// //       taxRate: 18
// //     },
// //     "Plumbing": {
// //       materials: [
// //         { name: "CPVC Pipes", baseRate: 125, unit: "running ft", brands: ["Astral", "Supreme", "Finolex", "Prince"], size: ["1/2 inch", "3/4 inch", "1 inch", "1.5 inch"] },
// //         { name: "PVC Pipes", baseRate: 85, unit: "running ft", brands: ["Astral", "Supreme", "Finolex"], size: ["2 inch", "3 inch", "4 inch", "6 inch"] },
// //         { name: "PPR Pipes", baseRate: 140, unit: "running ft", brands: ["Ashirvad", "Supreme", "Astral"], size: ["20mm", "25mm", "32mm"] },
// //         { name: "Sanitary Ware", baseRate: 8500, unit: "set", brands: ["Kohler", "Jaquar", "Hindware", "Cera", "Parryware"], type: ["Basic", "Mid-Range", "Premium", "Luxury"] },
// //         { name: "CP Fittings", baseRate: 3500, unit: "set", brands: ["Jaquar", "Grohe", "Kohler", "Marc", "Cera"], finish: ["Chrome", "Matte Black", "Gold", "Brushed Nickel"] },
// //         { name: "Water Tank", baseRate: 8000, unit: "piece", brands: ["Sintex", "Supreme", "Penguin"], capacity: ["500L", "1000L", "1500L", "2000L"] }
// //       ],
// //       subMaterials: {
// //         fittings: ["Elbows", "Tees", "Couplers", "Reducers", "End Caps"],
// //         accessories: ["Angle Valve", "Health Faucet", "Waste Coupling", "P-Trap", "Floor Drain"],
// //         sealants: ["Teflon Tape", "Thread Sealant", "Silicone Sealant", "Plumber's Putty"]
// //       },
// //       labourRate: 95,
// //       wastage: 8,
// //       taxRate: 18
// //     },
// //     "Wardrobe": {
// //       materials: [
// //         { name: "HDHMR", baseRate: 1850, unit: "sqft", brands: ["Greenply", "Century", "Action Tesa"], finish: ["Laminate", "Acrylic", "PU Paint", "Veneer"] },
// //         { name: "Plywood", baseRate: 2200, unit: "sqft", brands: ["Greenply", "Century", "Kitply"], finish: ["Laminate", "Veneer", "PU Paint"] },
// //         { name: "Particle Board", baseRate: 1200, unit: "sqft", brands: ["Greenpanel", "Century"], finish: ["Laminate", "Melamine"] },
// //         { name: "MDF", baseRate: 1400, unit: "sqft", brands: ["Greenpanel", "Century"], finish: ["Laminate", "Paint"] }
// //       ],
// //       subMaterials: {
// //         hardware: ["Hafele", "Hettich", "Ebco", "Godrej"],
// //         accessories: ["Cloth Hanger Rod", "Pull-Out Tray", "Tie Rack", "Belt Hanger", "Shoe Rack", "Drawer Dividers"],
// //         shutters: ["Hinged Door", "Sliding Door", "Folding Door"],
// //         handles: ["Metal Handle", "Wooden Handle", "Profile Handle", "Push-to-Open"]
// //       },
// //       labourRate: 400,
// //       wastage: 10,
// //       taxRate: 18
// //     },
// //     "Wallpaper & Wall Panels": {
// //       materials: [
// //         { name: "Vinyl Wallpaper", baseRate: 65, unit: "sqft", brands: ["D'Decor", "Asian Paints", "Nilaya"], patterns: ["Solid", "Textured", "Printed", "3D"] },
// //         { name: "Fabric Wallpaper", baseRate: 120, unit: "sqft", brands: ["D'Decor", "Marshalls"], patterns: ["Silk", "Linen", "Velvet"] },
// //         { name: "3D Wall Panels", baseRate: 180, unit: "sqft", brands: ["WallArt", "3D Wall Decor"], material: ["PVC", "MDF", "Gypsum"] },
// //         { name: "Wood Panels", baseRate: 250, unit: "sqft", brands: ["Greenply", "Century"], types: ["Natural Wood", "Engineered Wood", "WPC"] },
// //         { name: "Stone Cladding", baseRate: 320, unit: "sqft", brands: ["Natural Stone", "Artificial Stone"], types: ["Slate", "Sandstone", "Limestone"] }
// //       ],
// //       subMaterials: {
// //         adhesive: ["Wallpaper Paste", "Contact Adhesive", "Silicone"],
// //         accessories: ["Border Trim", "Corner Guards", "Sealant"]
// //       },
// //       labourRate: 25,
// //       wastage: 12,
// //       taxRate: 18
// //     },
// //     "Bathroom Fittings": {
// //       materials: [
// //         { name: "Tiles", baseRate: 75, unit: "sqft", brands: ["Kajaria", "Somany", "H&R Johnson"], sizes: ["1x1", "1x2", "2x2"], finish: ["Glossy", "Matte", "Anti-Slip"] },
// //         { name: "Wall Tiles", baseRate: 85, unit: "sqft", brands: ["Kajaria", "Somany", "Nitco"], sizes: ["1x2", "1x3"], finish: ["Glossy", "Matte", "3D"] },
// //         { name: "Shower Enclosure", baseRate: 18000, unit: "set", brands: ["Jaquar", "Johnson", "Cera"], types: ["Sliding", "Hinged", "Pivot"] },
// //         { name: "Mirror with Storage", baseRate: 8500, unit: "piece", brands: ["Custom", "Hindware", "Cera"], types: ["Cabinet", "Shelf", "Framed"] },
// //         { name: "Geyser", baseRate: 12000, unit: "piece", brands: ["Racold", "AO Smith", "Havells"], capacity: ["15L", "25L", "35L", "50L"] }
// //       ],
// //       subMaterials: {
// //         accessories: ["Towel Rod", "Soap Dish", "Tissue Holder", "Robe Hook", "Tumbler Holder"],
// //         drainage: ["Floor Drain", "Shower Drain", "Channel Drain"],
// //         waterproofing: ["Membrane", "Chemical Waterproofing", "Cementitious Coating"]
// //       },
// //       labourRate: 120,
// //       wastage: 10,
// //       taxRate: 18
// //     },
// //     "Doors & Windows": {
// //       materials: [
// //         { name: "Wooden Door", baseRate: 18000, unit: "piece", brands: ["Greenply", "Century", "Local Carpenter"], types: ["Solid", "Engineered", "Flush Door"] },
// //         { name: "uPVC Door", baseRate: 22000, unit: "piece", brands: ["Fenesta", "VEKA", "Profine"], types: ["Casement", "Sliding", "French Door"] },
// //         { name: "Aluminum Door", baseRate: 15000, unit: "piece", brands: ["Jindal", "Hindalco"], types: ["Sliding", "Casement", "Folding"] },
// //         { name: "Glass Door", baseRate: 25000, unit: "piece", brands: ["Saint Gobain", "AIS Glass"], types: ["Sliding", "Swing", "Frameless"] },
// //         { name: "uPVC Window", baseRate: 650, unit: "sqft", brands: ["Fenesta", "VEKA", "Profine"], types: ["Casement", "Sliding", "Fixed"] },
// //         { name: "Aluminum Window", baseRate: 450, unit: "sqft", brands: ["Jindal", "Hindalco"], types: ["Sliding", "Casement", "Awning"] },
// //         { name: "Wooden Window", baseRate: 850, unit: "sqft", brands: ["Local Carpenter", "Greenply"], types: ["Casement", "Sliding", "Bay Window"] }
// //       ],
// //       subMaterials: {
// //         hardware: ["Handles", "Locks", "Hinges", "Aldrop", "Tower Bolt"],
// //         glass: ["Clear Glass", "Frosted Glass", "Tinted Glass", "Laminated Glass"],
// //         accessories: ["Weatherstrip", "Mosquito Mesh", "Grill"]
// //       },
// //       labourRate: 350,
// //       wastage: 5,
// //       taxRate: 18
// //     },
// //     "HVAC": {
// //       materials: [
// //         { name: "Split AC", baseRate: 35000, unit: "piece", brands: ["Daikin", "Hitachi", "LG", "Voltas"], capacity: ["1 Ton", "1.5 Ton", "2 Ton"] },
// //         { name: "VRV/VRF System", baseRate: 85000, unit: "ton", brands: ["Daikin", "Mitsubishi", "LG"], capacity: ["Multi-Zone"] },
// //         { name: "Ducted AC", baseRate: 75000, unit: "ton", brands: ["Daikin", "Carrier", "Voltas"], capacity: ["2 Ton", "3 Ton", "5 Ton"] },
// //         { name: "Ventilation System", baseRate: 25000, unit: "system", brands: ["Honeywell", "Fresh-Aire"], types: ["ERV", "HRV", "Exhaust Fans"] }
// //       ],
// //       subMaterials: {
// //         ductwork: ["MS Duct", "GI Duct", "Flexible Duct"],
// //         insulation: ["Foam", "Fiberglass", "Rubber"],
// //         accessories: ["Thermostat", "Diffusers", "Grilles", "Dampers"]
// //       },
// //       labourRate: 450,
// //       wastage: 8,
// //       taxRate: 18
// //     }
// //   },
// //   predefinedAreas: {
// //     "Living Room": 180,
// //     "Bedroom": 120,
// //     "Master Bedroom": 150,
// //     "Bedroom 2": 110,
// //     "Bedroom 3": 110,
// //     "Bedroom 4": 100,
// //     "Bedroom 5": 100,
// //     "Bedroom 6": 100,
// //     "Kitchen": 90,
// //     "Bathroom": 45,
// //     "Bathroom 1": 50,
// //     "Bathroom 2": 45,
// //     "Bathroom 3": 40,
// //     "Bathroom 4": 40,
// //     "Dining": 100,
// //     "Dining Room": 100,
// //     "Study": 80,
// //     "Study Room": 80,
// //     "Balcony": 60,
// //     "Terrace": 200,
// //     "Entryway": 50,
// //     "Hallway": 40,
// //     "Laundry Room": 50,
// //     "Pooja Room": 40,
// //     "Guest Room": 120,
// //     "Home Office": 100,
// //     "Media Room": 150,
// //     "Basement": 250,
// //     "Garage": 200,
// //     "Walk-In Closet": 60,
// //     "Pantry": 30,
// //     "Mudroom": 40,
// //     "Wine Cellar": 80,
// //     "Game Room": 180,
// //     "Fitness Room": 150,
// //     "Spa Room": 120,
// //     "Bar Room": 100,
// //     "Library/Reading Room": 120,
// //     "Kids' Playroom": 130,
// //     "Music Room": 100,
// //     "Craft Room": 90,
// //     "Workshop": 150,
// //     "Outdoor Lounge": 180,
// //     "Indoor Pool Area": 400,
// //     "Home Theater": 200
// //   }
// // }

// // // Context for global state
// // const PackageContext = createContext();

// // const usePackage = () => {
// //   const context = useContext(PackageContext);
// //   if (!context) throw new Error('usePackage must be used within PackageProvider');
// //   return context;
// // };

// // // Main App Component
// // export default function InteriorPackageMaker() {
// //   const [packages, setPackages] = useState([]);
// //   const [currentPackage, setCurrentPackage] = useState(null);
// //   const [view, setView] = useState('list'); // list, create, detail

// //   const createNewPackage = () => {
// //     const newPkg = {
// //       id: `PKG-${Date.now()}`,
// //       createdAt: new Date().toISOString(),
// //       hierarchy: {},
// //       services: [],
// //       status: 'draft',
// //       totalCost: 0,
// //       metadata: {
// //         clientName: '',
// //         projectName: '',
// //         notes: ''
// //       }
// //     };
// //     setCurrentPackage(newPkg);
// //     setView('create');
// //   };

// //   const savePackage = (pkg) => {
// //     setPackages(prev => {
// //       const exists = prev.find(p => p.id === pkg.id);
// //       if (exists) {
// //         return prev.map(p => p.id === pkg.id ? pkg : p);
// //       }
// //       return [...prev, pkg];
// //     });
// //   };

// //   const deletePackage = (id) => {
// //     setPackages(prev => prev.filter(p => p.id !== id));
// //   };

// //   return (
// //     <PackageContext.Provider value={{ packages, currentPackage, setCurrentPackage, savePackage, deletePackage }}>
// //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
// //         {/* Header */}
// //         <header className="bg-white shadow-md border-b border-slate-200">
// //           <div className="max-w-7xl mx-auto px-6 py-4">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
// //                   <FiPackage className="text-white text-2xl" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-2xl font-bold text-slate-800">Interior Design Package Maker</h1>
// //                   <p className="text-sm text-slate-600">Professional Package Management System</p>
// //                 </div>
// //               </div>
// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => setView('list')}
// //                   className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
// //                     view === 'list'
// //                       ? 'bg-blue-600 text-white shadow-lg'
// //                       : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-600'
// //                   }`}
// //                 >
// //                   All Packages ({packages.length})
// //                 </button>
// //                 <button
// //                   onClick={createNewPackage}
// //                   className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
// //                 >
// //                   <FiPlus className="text-lg" />
// //                   Create New Package
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Main Content */}
// //         <main className="max-w-7xl mx-auto px-6 py-8">
// //           {view === 'list' && <PackageList onView={(pkg) => { setCurrentPackage(pkg); setView('detail'); }} />}
// //           {view === 'create' && <PackageCreator onBack={() => setView('list')} />}
// //           {view === 'detail' && <PackageDetail onBack={() => setView('list')} />}
// //         </main>
// //       </div>
// //     </PackageContext.Provider>
// //   );
// // }

// // // Package List Component
// // function PackageList({ onView }) {
// //   const { packages, deletePackage } = usePackage();
// //   const [filter, setFilter] = useState('all');

// //   const filteredPackages = packages.filter(pkg => {
// //     if (filter === 'all') return true;
// //     return pkg.status === filter;
// //   });

// //   return (
// //     <div className="space-y-6">
// //       {/* Filters */}
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <div className="flex items-center gap-4">
// //           <span className="text-sm font-medium text-slate-700">Filter by Status:</span>
// //           {['all', 'draft', 'finalized', 'sent'].map(status => (
// //             <button
// //               key={status}
// //               onClick={() => setFilter(status)}
// //               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
// //                 filter === status
// //                   ? 'bg-blue-600 text-white shadow-md'
// //                   : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
// //               }`}
// //             >
// //               {status.charAt(0).toUpperCase() + status.slice(1)}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Package Cards */}
// //       {filteredPackages.length === 0 ? (
// //         <div className="bg-white rounded-xl shadow-md p-12 text-center border border-slate-200">
// //           <FiPackage className="text-6xl text-slate-300 mx-auto mb-4" />
// //           <h3 className="text-xl font-semibold text-slate-700 mb-2">No Packages Found</h3>
// //           <p className="text-slate-600">Create your first interior design package to get started</p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredPackages.map(pkg => (
// //             <div key={pkg.id} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
// //               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
// //                 <div className="flex items-center justify-between">
// //                   <h3 className="text-lg font-bold text-white">{pkg.id}</h3>
// //                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${
// //                     pkg.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
// //                     pkg.status === 'finalized' ? 'bg-green-100 text-green-800' :
// //                     'bg-blue-100 text-blue-800'
// //                   }`}>
// //                     {pkg.status.toUpperCase()}
// //                   </span>
// //                 </div>
// //               </div>
// //               <div className="p-6 space-y-4">
// //                 <div>
// //                   <p className="text-sm text-slate-600">Client: <span className="font-medium text-slate-800">{pkg.metadata.clientName || 'Not specified'}</span></p>
// //                   <p className="text-sm text-slate-600">Project: <span className="font-medium text-slate-800">{pkg.metadata.projectName || 'Not specified'}</span></p>
// //                 </div>
// //                 <div className="border-t border-slate-200 pt-4">
// //                   <p className="text-sm text-slate-600 mb-1">Services: <span className="font-semibold text-slate-800">{pkg.services.length}</span></p>
// //                   <p className="text-2xl font-bold text-blue-600">₹{pkg.totalCost.toLocaleString()}</p>
// //                 </div>
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => onView(pkg)}
// //                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
// //                   >
// //                     <FiEye /> View
// //                   </button>
// //                   <button
// //                     onClick={() => deletePackage(pkg.id)}
// //                     className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-all"
// //                   >
// //                     <FiTrash2 />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // Package Creator Component
// // function PackageCreator({ onBack }) {
// //   const { currentPackage, setCurrentPackage, savePackage } = usePackage();
// //   const [step, setStep] = useState(1);
// //   const [hierarchy, setHierarchy] = useState({});
// //   const [selectedService, setSelectedService] = useState(null);
// //   const [services, setServices] = useState([]);

// //   const updateHierarchy = (key, value) => {
// //     setHierarchy(prev => ({ ...prev, [key]: value }));
// //   };

// //   const addService = (service) => {
// //     const newService = {
// //       ...service,
// //       id: `SRV-${Date.now()}`,
// //       addedAt: new Date().toISOString()
// //     };
// //     setServices(prev => [...prev, newService]);
// //     setSelectedService(null);
// //   };

// //   const removeService = (id) => {
// //     setServices(prev => prev.filter(s => s.id !== id));
// //   };

// //   const calculateTotal = () => {
// //     return services.reduce((sum, srv) => sum + srv.finalCost, 0);
// //   };

// //   const finalizePackage = () => {
// //     const updated = {
// //       ...currentPackage,
// //       hierarchy,
// //       services,
// //       totalCost: calculateTotal(),
// //       status: 'finalized',
// //       finalizedAt: new Date().toISOString()
// //     };
// //     savePackage(updated);
// //     setCurrentPackage(updated);
// //     onBack();
// //   };

// //   const saveDraft = () => {
// //     const updated = {
// //       ...currentPackage,
// //       hierarchy,
// //       services,
// //       totalCost: calculateTotal(),
// //       status: 'draft',
// //       updatedAt: new Date().toISOString()
// //     };
// //     savePackage(updated);
// //     setCurrentPackage(updated);
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* Progress Steps */}
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-xl font-bold text-slate-800">Create Package: {currentPackage?.id}</h2>
// //           <div className="flex gap-2">
// //             <button onClick={saveDraft} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200 transition-all flex items-center gap-2">
// //               <FiSave /> Save Draft
// //             </button>
// //             <button onClick={onBack} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all">
// //               Back to List
// //             </button>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           {[1, 2, 3, 4].map(s => (
// //             <div key={s} className="flex items-center gap-2 flex-1">
// //               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
// //                 step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
// //               }`}>
// //                 {s}
// //               </div>
// //               <span className={`text-sm font-medium ${step >= s ? 'text-blue-600' : 'text-slate-500'}`}>
// //                 {s === 1 ? 'Hierarchy' : s === 2 ? 'Services' : s === 3 ? 'Review' : 'Finalize'}
// //               </span>
// //               {s < 4 && <div className={`flex-1 h-1 ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />}
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Step Content */}
// //       {step === 1 && <HierarchyStep hierarchy={hierarchy} updateHierarchy={updateHierarchy} onNext={() => setStep(2)} />}
// //       {step === 2 && <ServiceStep services={services} addService={addService} removeService={removeService} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
// //       {step === 3 && <ReviewStep hierarchy={hierarchy} services={services} totalCost={calculateTotal()} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
// //       {step === 4 && <FinalizeStep currentPackage={currentPackage} setCurrentPackage={setCurrentPackage} onFinalize={finalizePackage} onBack={() => setStep(3)} />}
// //     </div>
// //   );
// // }

// // // Hierarchy Step
// // function HierarchyStep({ hierarchy, updateHierarchy, onNext }) {
// //   const [expanded, setExpanded] = useState({});

// //   return (
// //     <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 space-y-6">
// //       <h3 className="text-lg font-bold text-slate-800">Step 1: Define Project Hierarchy</h3>
      
// //       <div className="grid grid-cols-2 gap-6">
// //         {/* Column 1 */}
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-slate-700 mb-2">Design Type</label>
// //             <select
// //               value={hierarchy.designType || ''}
// //               onChange={(e) => updateHierarchy('designType', e.target.value)}
// //               className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">Select Design Type</option>
// //               {Object.keys(mockData.categories).map(cat => (
// //                 <option key={cat} value={cat}>{cat}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {hierarchy.designType && (
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-2">Property Type</label>
// //               <select
// //                 value={hierarchy.propertyType || ''}
// //                 onChange={(e) => updateHierarchy('propertyType', e.target.value)}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               >
// //                 <option value="">Select Property Type</option>
// //                 {Object.keys(mockData.categories[hierarchy.designType] || {}).map(cat => (
// //                   <option key={cat} value={cat}>{cat}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           )}

// //           {hierarchy.propertyType && (
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-2">Space Type</label>
// //               <select
// //                 value={hierarchy.spaceType || ''}
// //                 onChange={(e) => updateHierarchy('spaceType', e.target.value)}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               >
// //                 <option value="">Select Space Type</option>
// //                 {Object.keys(mockData.categories[hierarchy.designType]?.[hierarchy.propertyType] || {}).map(cat => (
// //                   <option key={cat} value={cat}>{cat}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           )}

// //           {hierarchy.spaceType && (
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-2">Configuration</label>
// //               <select
// //                 value={hierarchy.configuration || ''}
// //                 onChange={(e) => updateHierarchy('configuration', e.target.value)}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               >
// //                 <option value="">Select Configuration</option>
// //                 {Object.keys(mockData.categories[hierarchy.designType]?.[hierarchy.propertyType]?.[hierarchy.spaceType] || {}).map(cat => (
// //                   <option key={cat} value={cat}>{cat}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           )}
// //         </div>

// //         {/* Column 2 */}
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-slate-700 mb-2">Target Demographic</label>
// //             <select
// //               value={hierarchy.demographic || ''}
// //               onChange={(e) => updateHierarchy('demographic', e.target.value)}
// //               className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">Select Demographic</option>
// //               {mockData.demographics.map(demo => (
// //                 <option key={demo} value={demo}>{demo}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range</label>
// //             <select
// //               value={hierarchy.budget || ''}
// //               onChange={(e) => updateHierarchy('budget', e.target.value)}
// //               className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">Select Budget Range</option>
// //               {mockData.budgetRanges.map(budget => (
// //                 <option key={budget} value={budget}>{budget}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-slate-700 mb-2">City/Location</label>
// //             <select
// //               value={hierarchy.city || ''}
// //               onChange={(e) => updateHierarchy('city', e.target.value)}
// //               className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">Select City</option>
// //               {mockData.cities.map(city => (
// //                 <option key={city} value={city}>{city}</option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Summary */}
// //       {Object.keys(hierarchy).length > 0 && (
// //         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //           <h4 className="font-semibold text-blue-900 mb-2">Hierarchy Path:</h4>
// //           <p className="text-sm text-blue-800">
// //             {Object.values(hierarchy).filter(Boolean).join(' → ')}
// //           </p>
// //         </div>
// //       )}

// //       <button
// //         onClick={onNext}
// //         disabled={Object.keys(hierarchy).length < 3}
// //         className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
// //       >
// //         Continue to Services
// //       </button>
// //     </div>
// //   );
// // }

// // // Service Step
// // function ServiceStep({ services, addService, removeService, onNext, onBack }) {
// //   const [selectedServiceType, setSelectedServiceType] = useState('');
// //   const [showConfigurator, setShowConfigurator] = useState(false);

// //   return (
// //     <div className="space-y-6">
// //       {/* Service Selector */}
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <h3 className="text-lg font-bold text-slate-800 mb-4">Step 2: Add Services</h3>
        
// //         <div className="grid grid-cols-3 gap-4 mb-6">
// //           {Object.keys(mockData.services).map(service => (
// //             <button
// //               key={service}
// //               onClick={() => {
// //                 setSelectedServiceType(service);
// //                 setShowConfigurator(true);
// //               }}
// //               className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center cursor-pointer"
// //             >
// //               <div className="text-3xl mb-2">
// //                 {service === 'False Ceiling' ? '🏠' : service === 'Flooring' ? '🔲' : service === 'Wall Painting' ? '🎨' : service === 'Modular Kitchen' ? '🍳' : service === 'Electrical Work' ? '💡' : '🚰'}
// //               </div>
// //               <p className="font-semibold text-slate-800">{service}</p>
// //             </button>
// //           ))}
// //         </div>

// //         {showConfigurator && (
// //           <ServiceConfigurator
// //             serviceType={selectedServiceType}
// //             onAdd={(config) => {
// //               addService(config);
// //               setShowConfigurator(false);
// //             }}
// //             onCancel={() => setShowConfigurator(false)}
// //           />
// //         )}
// //       </div>

// //       {/* Added Services */}
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <h4 className="text-lg font-bold text-slate-800 mb-4">Added Services ({services.length})</h4>
        
// //         {services.length === 0 ? (
// //           <div className="text-center py-12 text-slate-500">
// //             <p>No services added yet. Click on a service above to configure and add.</p>
// //           </div>
// //         ) : (
// //           <div className="space-y-4">
// //             {services.map(srv => (
// //               <div key={srv.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
// //                 <div className="flex justify-between items-start mb-3">
// //                   <div>
// //                     <h5 className="font-bold text-slate-800">{srv.serviceType}</h5>
// //                     <p className="text-sm text-slate-600">{srv.area} {srv.unit} • {srv.material}</p>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-xl font-bold text-blue-600">₹{srv.finalCost.toLocaleString()}</span>
// //                     <button
// //                       onClick={() => removeService(srv.id)}
// //                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
// //                     >
// //                       <FiTrash2 />
// //                     </button>
// //                   </div>
// //                 </div>
                
// //                 <div className="grid grid-cols-4 gap-4 text-sm">
// //                   <div>
// //                     <p className="text-slate-600">Material Cost</p>
// //                     <p className="font-semibold text-slate-800">₹{srv.materialCost.toLocaleString()}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-slate-600">Labour Cost</p>
// //                     <p className="font-semibold text-slate-800">₹{srv.labourCost.toLocaleString()}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-slate-600">Tax ({srv.taxRate}%)</p>
// //                     <p className="font-semibold text-slate-800">₹{srv.taxAmount.toLocaleString()}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-slate-600">Wastage ({srv.wastage}%)</p>
// //                     <p className="font-semibold text-slate-800">₹{srv.wastageAmount.toLocaleString()}</p>
// //                   </div>
// //                 </div>

// //                 {srv.subMaterials && Object.keys(srv.subMaterials).length > 0 && (
// //                   <div className="mt-3 pt-3 border-t border-slate-200">
// //                     <p className="text-xs text-slate-600 mb-2">Additional Materials:</p>
// //                     <div className="flex flex-wrap gap-2">
// //                       {Object.entries(srv.subMaterials).map(([key, value]) => (
// //                         <span key={key} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
// //                           {key}: {value}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       <div className="flex gap-4">
// //         <button
// //           onClick={onBack}
// //           className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all"
// //         >
// //           Back
// //         </button>
// //         <button
// //           onClick={() => {
// //             const finalPkg = {
// //               ...currentPackage,
// //               metadata: { ...metadata, discount },
// //               finalAmount: calculateFinalAmount()
// //             };
// //             setCurrentPackage(finalPkg);
// //             onFinalize();
// //           }}
// //           className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
// //         >
// //           <FiCheckCircle className="text-xl" />
// //           Finalize Package
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // Package Detail View
// // function PackageDetail({ onBack }) {
// //   const { currentPackage, setCurrentPackage, savePackage } = usePackage();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [showPrintPreview, setShowPrintPreview] = useState(false);

// //   if (!currentPackage) {
// //     return (
// //       <div className="bg-white rounded-xl shadow-md p-12 text-center">
// //         <FiAlertCircle className="text-6xl text-slate-300 mx-auto mb-4" />
// //         <h3 className="text-xl font-semibold text-slate-700 mb-2">Package Not Found</h3>
// //         <button onClick={onBack} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
// //           Back to List
// //         </button>
// //       </div>
// //     );
// //   }

// //   const unlockPackage = () => {
// //     const updated = { ...currentPackage, status: 'draft' };
// //     setCurrentPackage(updated);
// //     savePackage(updated);
// //     setIsEditing(true);
// //   };

// //   const lockPackage = () => {
// //     const updated = { ...currentPackage, status: 'finalized' };
// //     setCurrentPackage(updated);
// //     savePackage(updated);
// //     setIsEditing(false);
// //   };

// //   const duplicatePackage = () => {
// //     const newPkg = {
// //       ...currentPackage,
// //       id: `PKG-${Date.now()}`,
// //       createdAt: new Date().toISOString(),
// //       status: 'draft'
// //     };
// //     setCurrentPackage(newPkg);
// //     savePackage(newPkg);
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* Header Actions */}
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <button
// //               onClick={onBack}
// //               className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-all"
// //             >
// //               ← Back
// //             </button>
// //             <div>
// //               <h2 className="text-2xl font-bold text-slate-800">{currentPackage.id}</h2>
// //               <p className="text-sm text-slate-600">
// //                 Created: {new Date(currentPackage.createdAt).toLocaleDateString('en-IN', { 
// //                   day: 'numeric', 
// //                   month: 'long', 
// //                   year: 'numeric',
// //                   hour: '2-digit',
// //                   minute: '2-digit'
// //                 })}
// //               </p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-3">
// //             <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
// //               currentPackage.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
// //               currentPackage.status === 'finalized' ? 'bg-green-100 text-green-800' :
// //               'bg-blue-100 text-blue-800'
// //             }`}>
// //               {currentPackage.status.toUpperCase()}
// //             </span>
// //             {currentPackage.status === 'finalized' ? (
// //               <button
// //                 onClick={unlockPackage}
// //                 className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-all flex items-center gap-2"
// //               >
// //                 <FiUnlock /> Unlock
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={lockPackage}
// //                 className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-all flex items-center gap-2"
// //               >
// //                 <FiLock /> Lock
// //               </button>
// //             )}
// //             <button
// //               onClick={duplicatePackage}
// //               className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-all flex items-center gap-2"
// //             >
// //               <FiCopy /> Duplicate
// //             </button>
// //             <button
// //               onClick={() => setShowPrintPreview(true)}
// //               className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-all flex items-center gap-2"
// //             >
// //               <FiDownload /> Download PDF
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Client & Project Info */}
// //       <div className="grid grid-cols-2 gap-6">
// //         <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
// //             <span className="text-2xl">👤</span> Client Information
// //           </h3>
// //           <div className="space-y-3">
// //             <div>
// //               <p className="text-sm text-slate-600">Client Name</p>
// //               <p className="text-base font-semibold text-slate-800">{currentPackage.metadata.clientName || 'Not specified'}</p>
// //             </div>
// //             <div>
// //               <p className="text-sm text-slate-600">Contact Number</p>
// //               <p className="text-base font-semibold text-slate-800">{currentPackage.metadata.contactNumber || 'Not specified'}</p>
// //             </div>
// //             <div>
// //               <p className="text-sm text-slate-600">Email</p>
// //               <p className="text-base font-semibold text-slate-800">{currentPackage.metadata.email || 'Not specified'}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
// //             <span className="text-2xl">📋</span> Project Details
// //           </h3>
// //           <div className="space-y-3">
// //             <div>
// //               <p className="text-sm text-slate-600">Project Name</p>
// //               <p className="text-base font-semibold text-slate-800">{currentPackage.metadata.projectName || 'Not specified'}</p>
// //             </div>
// //             <div>
// //               <p className="text-sm text-slate-600">Total Services</p>
// //               <p className="text-base font-semibold text-slate-800">{currentPackage.services.length} items</p>
// //             </div>
// //             <div>
// //               <p className="text-sm text-slate-600">Status</p>
// //               <p className="text-base font-semibold text-slate-800">{currentPackage.status}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Hierarchy Path */}
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
// //           <span className="text-2xl">🏗️</span> Project Hierarchy
// //         </h3>
// //         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
// //           <div className="flex flex-wrap items-center gap-2 text-sm">
// //             {Object.entries(currentPackage.hierarchy || {}).map(([key, value], idx, arr) => (
// //               <React.Fragment key={key}>
// //                 <span className="px-3 py-1.5 bg-white border border-blue-300 rounded-lg font-medium text-slate-800">
// //                   {value}
// //                 </span>
// //                 {idx < arr.length - 1 && <span className="text-blue-600 font-bold">→</span>}
// //               </React.Fragment>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Services Detailed View */}
// //       <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
// //         <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
// //           <h3 className="text-lg font-bold text-white flex items-center gap-2">
// //             <FiPackage className="text-xl" /> Service Details ({currentPackage.services.length} items)
// //           </h3>
// //         </div>
// //         <div className="p-6 space-y-4">
// //           {currentPackage.services.map((srv, idx) => (
// //             <div key={srv.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
// //               <div className="bg-slate-50 px-6 py-3 flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
// //                     {idx + 1}
// //                   </span>
// //                   <div>
// //                     <h4 className="font-bold text-slate-800">{srv.serviceType}</h4>
// //                     <p className="text-sm text-slate-600">{srv.material} • {srv.brand || 'Generic'}</p>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="text-2xl font-bold text-blue-600">₹{srv.finalCost.toLocaleString()}</p>
// //                   <p className="text-xs text-slate-600">{srv.area} {srv.unit}</p>
// //                 </div>
// //               </div>
              
// //               <div className="px-6 py-4">
// //                 {/* Cost Breakdown */}
// //                 <div className="grid grid-cols-5 gap-4 mb-4">
// //                   <div className="text-center p-3 bg-blue-50 rounded-lg">
// //                     <p className="text-xs text-slate-600 mb-1">Material Cost</p>
// //                     <p className="text-base font-bold text-slate-800">₹{srv.materialCost.toLocaleString()}</p>
// //                   </div>
// //                   <div className="text-center p-3 bg-green-50 rounded-lg">
// //                     <p className="text-xs text-slate-600 mb-1">Labour Cost</p>
// //                     <p className="text-base font-bold text-slate-800">₹{srv.labourCost.toLocaleString()}</p>
// //                   </div>
// //                   <div className="text-center p-3 bg-yellow-50 rounded-lg">
// //                     <p className="text-xs text-slate-600 mb-1">Wastage ({srv.wastage}%)</p>
// //                     <p className="text-base font-bold text-slate-800">₹{srv.wastageAmount.toLocaleString()}</p>
// //                   </div>
// //                   <div className="text-center p-3 bg-purple-50 rounded-lg">
// //                     <p className="text-xs text-slate-600 mb-1">Tax ({srv.taxRate}%)</p>
// //                     <p className="text-base font-bold text-slate-800">₹{srv.taxAmount.toLocaleString()}</p>
// //                   </div>
// //                   <div className="text-center p-3 bg-slate-100 rounded-lg">
// //                     <p className="text-xs text-slate-600 mb-1">Final Total</p>
// //                     <p className="text-lg font-bold text-blue-600">₹{srv.finalCost.toLocaleString()}</p>
// //                   </div>
// //                 </div>

// //                 {/* Specifications */}
// //                 {srv.specifications && Object.keys(srv.specifications).length > 0 && (
// //                   <div className="mb-4">
// //                     <p className="text-sm font-semibold text-slate-700 mb-2">Specifications:</p>
// //                     <div className="flex flex-wrap gap-2">
// //                       {Object.entries(srv.specifications).map(([key, value]) => (
// //                         <span key={key} className="px-3 py-1 bg-indigo-50 text-indigo-800 text-xs rounded-full border border-indigo-200">
// //                           {key}: {value}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Sub Materials */}
// //                 {srv.subMaterials && Object.keys(srv.subMaterials).length > 0 && (
// //                   <div className="mb-4">
// //                     <p className="text-sm font-semibold text-slate-700 mb-2">Additional Materials:</p>
// //                     <div className="flex flex-wrap gap-2">
// //                       {Object.entries(srv.subMaterials).map(([key, value]) => (
// //                         <span key={key} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded border border-slate-300">
// //                           {key}: {value}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Notes */}
// //                 {srv.notes && (
// //                   <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
// //                     <p className="text-xs font-semibold text-amber-900 mb-1">Notes:</p>
// //                     <p className="text-sm text-amber-800">{srv.notes}</p>
// //                   </div>
// //                 )}

// //                 {/* Technical Details */}
// //                 <div className="mt-4 pt-4 border-t border-slate-200">
// //                   <p className="text-xs text-slate-600 mb-2 font-semibold">Technical Breakdown:</p>
// //                   <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
// //                     <p>• Base Rate: ₹{mockData.services[srv.serviceType]?.materials.find(m => m.name === srv.material)?.baseRate}/{srv.unit}</p>
// //                     <p>• Labour Rate: ₹{mockData.services[srv.serviceType]?.labourRate}/{srv.unit}</p>
// //                     <p>• Wastage Factor: {srv.wastage}%</p>
// //                     <p>• Tax Rate: {srv.taxRate}%</p>
// //                     <p>• Material Calculation: ₹{mockData.services[srv.serviceType]?.materials.find(m => m.name === srv.material)?.baseRate} × {srv.area} × 1.{srv.wastage}</p>
// //                     <p>• Labour Calculation: ₹{mockData.services[srv.serviceType]?.labourRate} × {srv.area}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Financial Summary */}
// //       <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
// //         <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
// //           <h3 className="text-lg font-bold text-white">Financial Summary</h3>
// //         </div>
// //         <div className="p-6">
// //           <div className="grid grid-cols-4 gap-6 mb-6">
// //             {['materialCost', 'labourCost', 'wastageAmount', 'taxAmount'].map(key => {
// //               const total = currentPackage.services.reduce((sum, srv) => sum + srv[key], 0);
// //               const label = key === 'materialCost' ? 'Total Materials' : 
// //                            key === 'labourCost' ? 'Total Labour' : 
// //                            key === 'wastageAmount' ? 'Total Wastage' : 'Total Tax';
// //               const icon = key === 'materialCost' ? '🧱' : 
// //                           key === 'labourCost' ? '👷' : 
// //                           key === 'wastageAmount' ? '📦' : '💰';
// //               return (
// //                 <div key={key} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
// //                   <p className="text-2xl mb-2">{icon}</p>
// //                   <p className="text-sm text-slate-600 mb-1">{label}</p>
// //                   <p className="text-xl font-bold text-slate-800">₹{total.toLocaleString()}</p>
// //                   <div className="mt-2 bg-slate-200 rounded-full h-2 overflow-hidden">
// //                     <div 
// //                       className="bg-blue-600 h-full rounded-full"
// //                       style={{ width: `${(total / currentPackage.totalCost * 100)}%` }}
// //                     />
// //                   </div>
// //                   <p className="text-xs text-slate-500 mt-1">{((total / currentPackage.totalCost) * 100).toFixed(1)}% of total</p>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           <div className="border-t border-slate-300 pt-6">
// //             <div className="flex justify-between items-center mb-3">
// //               <span className="text-lg font-semibold text-slate-700">Subtotal:</span>
// //               <span className="text-2xl font-bold text-slate-800">₹{currentPackage.totalCost.toLocaleString()}</span>
// //             </div>
            
// //             {currentPackage.metadata?.discount?.type !== 'none' && (
// //               <div className="flex justify-between items-center mb-3 text-red-600">
// //                 <span className="text-base font-medium">
// //                   Discount ({currentPackage.metadata.discount.type === 'percentage' 
// //                     ? `${currentPackage.metadata.discount.value}%` 
// //                     : `₹${currentPackage.metadata.discount.value}`}):
// //                 </span>
// //                 <span className="text-xl font-bold">
// //                   - ₹{(currentPackage.totalCost - (currentPackage.finalAmount || currentPackage.totalCost)).toLocaleString()}
// //                 </span>
// //               </div>
// //             )}

// //             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-6 flex justify-between items-center">
// //               <span className="text-2xl font-bold text-slate-800">Final Amount:</span>
// //               <span className="text-4xl font-bold text-green-600">
// //                 ₹{(currentPackage.finalAmount || currentPackage.totalCost).toLocaleString()}
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Project Notes */}
// //       {currentPackage.metadata?.notes && (
// //         <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
// //             <span className="text-2xl">📝</span> Project Notes
// //           </h3>
// //           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
// //             <p className="text-slate-700 whitespace-pre-wrap">{currentPackage.metadata.notes}</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Print Preview Modal */}
// //       {showPrintPreview && (
// //         <PrintPreview package={currentPackage} onClose={() => setShowPrintPreview(false)} />
// //       )}
// //     </div>
// //   );
// // }

// // // Print Preview Component
// // function PrintPreview({ package: pkg, onClose }) {
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
// //       <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
// //           <h3 className="text-xl font-bold text-slate-800">Package Quotation - {pkg.id}</h3>
// //           <button
// //             onClick={onClose}
// //             className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-all"
// //           >
// //             Close
// //           </button>
// //         </div>
        
// //         <div className="p-8" id="printable-content">
// //           {/* Letterhead */}
// //           <div className="text-center mb-8 pb-6 border-b-2 border-slate-300">
// //             <h1 className="text-3xl font-bold text-slate-800 mb-2">Interior Design Studio</h1>
// //             <p className="text-slate-600">Professional Interior Design Solutions</p>
// //             <p className="text-sm text-slate-500 mt-2">
// //               Email: info@interiordesign.com | Phone: +91 1234567890 | www.interiordesign.com
// //             </p>
// //           </div>

// //           {/* Quotation Header */}
// //           <div className="grid grid-cols-2 gap-6 mb-6">
// //             <div>
// //               <h4 className="font-bold text-slate-700 mb-2">Bill To:</h4>
// //               <p className="text-slate-800 font-semibold">{pkg.metadata.clientName}</p>
// //               <p className="text-sm text-slate-600">{pkg.metadata.contactNumber}</p>
// //               <p className="text-sm text-slate-600">{pkg.metadata.email}</p>
// //             </div>
// //             <div className="text-right">
// //               <p className="text-sm text-slate-600">Quotation Number</p>
// //               <p className="font-bold text-slate-800 text-lg">{pkg.id}</p>
// //               <p className="text-sm text-slate-600 mt-2">Date: {new Date(pkg.createdAt).toLocaleDateString('en-IN')}</p>
// //               <p className="text-sm text-slate-600">Valid Until: {new Date(new Date(pkg.createdAt).setDate(new Date(pkg.createdAt).getDate() + 30)).toLocaleDateString('en-IN')}</p>
// //             </div>
// //           </div>

// //           {/* Services Table */}
// //           <table className="w-full text-sm mb-6">
// //             <thead>
// //               <tr className="bg-slate-800 text-white">
// //                 <th className="px-4 py-3 text-left">#</th>
// //                 <th className="px-4 py-3 text-left">Service</th>
// //                 <th className="px-4 py-3 text-left">Material</th>
// //                 <th className="px-4 py-3 text-right">Area</th>
// //                 <th className="px-4 py-3 text-right">Rate</th>
// //                 <th className="px-4 py-3 text-right">Amount</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-slate-200">
// //               {pkg.services.map((srv, idx) => (
// //                 <tr key={srv.id} className="hover:bg-slate-50">
// //                   <td className="px-4 py-3">{idx + 1}</td>
// //                   <td className="px-4 py-3 font-medium">{srv.serviceType}</td>
// //                   <td className="px-4 py-3">{srv.material}</td>
// //                   <td className="px-4 py-3 text-right">{srv.area} {srv.unit}</td>
// //                   <td className="px-4 py-3 text-right">₹{Math.round(srv.finalCost / srv.area)}</td>
// //                   <td className="px-4 py-3 text-right font-semibold">₹{srv.finalCost.toLocaleString()}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //             <tfoot>
// //               <tr className="bg-slate-100">
// //                 <td colSpan="5" className="px-4 py-3 text-right font-bold">Subtotal:</td>
// //                 <td className="px-4 py-3 text-right font-bold">₹{pkg.totalCost.toLocaleString()}</td>
// //               </tr>
// //               {pkg.metadata?.discount?.type !== 'none' && (
// //                 <tr className="bg-red-50">
// //                   <td colSpan="5" className="px-4 py-3 text-right font-bold text-red-600">Discount:</td>
// //                   <td className="px-4 py-3 text-right font-bold text-red-600">
// //                     - ₹{(pkg.totalCost - pkg.finalAmount).toLocaleString()}
// //                   </td>
// //                 </tr>
// //               )}
// //               <tr className="bg-green-100">
// //                 <td colSpan="5" className="px-4 py-3 text-right font-bold text-lg">Grand Total:</td>
// //                 <td className="px-4 py-3 text-right font-bold text-green-600 text-xl">
// //                   ₹{(pkg.finalAmount || pkg.totalCost).toLocaleString()}
// //                 </td>
// //               </tr>
// //             </tfoot>
// //           </table>

// //           {/* Terms */}
// //           <div className="mt-8 pt-6 border-t border-slate-300">
// //             <h4 className="font-bold text-slate-700 mb-3">Terms & Conditions:</h4>
// //             <ul className="text-xs text-slate-600 space-y-1">
// //               <li>• 50% advance payment required to start the project</li>
// //               <li>• Balance payment on completion of work</li>
// //               <li>• Material costs may vary based on market rates</li>
// //               <li>• 1-year warranty on workmanship</li>
// //               <li>• Project timeline will be shared separately</li>
// //             </ul>
// //           </div>

// //           {/* Signature */}
// //           <div className="mt-12 grid grid-cols-2 gap-12">
// //             <div className="text-center">
// //               <div className="border-t-2 border-slate-400 pt-2 mt-12">
// //                 <p className="text-sm font-semibold text-slate-700">Client Signature</p>
// //               </div>
// //             </div>
// //             <div className="text-center">
// //               <div className="border-t-2 border-slate-400 pt-2 mt-12">
// //                 <p className="text-sm font-semibold text-slate-700">Authorized Signature</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
// //           <button
// //             onClick={() => window.print()}
// //             className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
// //           >
// //             <FiDownload /> Print / Save as PDF
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Service Configurator
// // function ServiceConfigurator({ serviceType, onAdd, onCancel }) {
// //   const serviceData = mockData.services[serviceType];
// //   const [config, setConfig] = useState({
// //     serviceType,
// //     material: '',
// //     brand: '',
// //     specifications: {},
// //     subMaterials: {},
// //     area: '',
// //     areaType: 'predefined',
// //     customArea: '',
// //     unit: serviceData.materials[0]?.unit || 'sqft',
// //     notes: ''
// //   });

// //   const [costs, setCosts] = useState({
// //     materialCost: 0,
// //     labourCost: 0,
// //     wastageAmount: 0,
// //     taxAmount: 0,
// //     finalCost: 0
// //   });

// //   const calculateCosts = () => {
// //     if (!config.material || !config.area) return;

// //     const selectedMaterial = serviceData.materials.find(m => m.name === config.material);
// //     if (!selectedMaterial) return;

// //     const area = parseFloat(config.area);
// //     const baseRate = selectedMaterial.baseRate;
    
// //     // Material cost with wastage
// //     const wastageMultiplier = 1 + (serviceData.wastage / 100);
// //     const materialCost = baseRate * area * wastageMultiplier;
// //     const wastageAmount = baseRate * area * (serviceData.wastage / 100);
    
// //     // Labour cost
// //     const labourCost = serviceData.labourRate * area;
    
// //     // Subtotal before tax
// //     const subtotal = materialCost + labourCost;
    
// //     // Tax
// //     const taxAmount = subtotal * (serviceData.taxRate / 100);
    
// //     // Final cost
// //     const finalCost = subtotal + taxAmount;

// //     setCosts({
// //       materialCost: Math.round(materialCost),
// //       labourCost: Math.round(labourCost),
// //       wastageAmount: Math.round(wastageAmount),
// //       taxAmount: Math.round(taxAmount),
// //       finalCost: Math.round(finalCost),
// //       wastage: serviceData.wastage,
// //       taxRate: serviceData.taxRate
// //     });
// //   };

// //   useEffect(() => {
// //     calculateCosts();
// //   }, [config.material, config.area]);

// //   const handleAdd = () => {
// //     onAdd({
// //       ...config,
// //       ...costs
// //     });
// //   };

// //   const selectedMaterial = serviceData.materials.find(m => m.name === config.material);

// //   return (
// //     <div className="border-t border-slate-200 pt-6 space-y-6">
// //       <h4 className="text-lg font-bold text-slate-800">Configure {serviceType}</h4>

// //       {/* Material Selection */}
// //       <div className="grid grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm font-medium text-slate-700 mb-2">Material Type *</label>
// //           <select
// //             value={config.material}
// //             onChange={(e) => setConfig({ ...config, material: e.target.value })}
// //             className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //           >
// //             <option value="">Select Material</option>
// //             {serviceData.materials.map(mat => (
// //               <option key={mat.name} value={mat.name}>
// //                 {mat.name} - ₹{mat.baseRate}/{mat.unit}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {selectedMaterial?.brands && (
// //           <div>
// //             <label className="block text-sm font-medium text-slate-700 mb-2">Brand</label>
// //             <select
// //               value={config.brand}
// //               onChange={(e) => setConfig({ ...config, brand: e.target.value })}
// //               className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="">Select Brand</option>
// //               {selectedMaterial.brands.map(brand => (
// //                 <option key={brand} value={brand}>{brand}</option>
// //               ))}
// //             </select>
// //           </div>
// //         )}
// //       </div>

// //       {/* Specifications */}
// //       {selectedMaterial && (
// //         <div className="grid grid-cols-3 gap-4">
// //           {Object.keys(selectedMaterial).filter(key => !['name', 'baseRate', 'unit', 'brands'].includes(key)).map(spec => (
// //             <div key={spec}>
// //               <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">{spec}</label>
// //               <select
// //                 value={config.specifications[spec] || ''}
// //                 onChange={(e) => setConfig({ 
// //                   ...config, 
// //                   specifications: { ...config.specifications, [spec]: e.target.value }
// //                 })}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               >
// //                 <option value="">Select {spec}</option>
// //                 {selectedMaterial[spec].map(opt => (
// //                   <option key={opt} value={opt}>{opt}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Sub Materials */}
// //       {serviceData.subMaterials && (
// //         <div>
// //           <h5 className="text-sm font-semibold text-slate-700 mb-3">Additional Materials</h5>
// //           <div className="grid grid-cols-3 gap-4">
// //             {Object.entries(serviceData.subMaterials).map(([category, options]) => (
// //               <div key={category}>
// //                 <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">{category}</label>
// //                 <select
// //                   value={config.subMaterials[category] || ''}
// //                   onChange={(e) => setConfig({
// //                     ...config,
// //                     subMaterials: { ...config.subMaterials, [category]: e.target.value }
// //                   })}
// //                   className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 >
// //                   <option value="">Select {category}</option>
// //                   {options.map(opt => (
// //                     <option key={opt} value={opt}>{opt}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Area Selection */}
// //       <div>
// //         <h5 className="text-sm font-semibold text-slate-700 mb-3">Area Selection *</h5>
// //         <div className="flex gap-4 mb-4">
// //           <label className="flex items-center gap-2 cursor-pointer">
// //             <input
// //               type="radio"
// //               checked={config.areaType === 'predefined'}
// //               onChange={() => setConfig({ ...config, areaType: 'predefined', area: '' })}
// //               className="w-4 h-4 text-blue-600"
// //             />
// //             <span className="text-sm text-slate-700">Predefined Area</span>
// //           </label>
// //           <label className="flex items-center gap-2 cursor-pointer">
// //             <input
// //               type="radio"
// //               checked={config.areaType === 'custom'}
// //               onChange={() => setConfig({ ...config, areaType: 'custom', area: '' })}
// //               className="w-4 h-4 text-blue-600"
// //             />
// //             <span className="text-sm text-slate-700">Custom Area</span>
// //           </label>
// //         </div>

// //         {config.areaType === 'predefined' ? (
// //           <select
// //             value={config.area}
// //             onChange={(e) => setConfig({ ...config, area: e.target.value })}
// //             className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //           >
// //             <option value="">Select Room</option>
// //             {Object.entries(mockData.predefinedAreas).map(([room, area]) => (
// //               <option key={room} value={area}>
// //                 {room} - {area} sqft
// //               </option>
// //             ))}
// //           </select>
// //         ) : (
// //           <input
// //             type="number"
// //             placeholder="Enter area in sqft"
// //             value={config.area}
// //             onChange={(e) => setConfig({ ...config, area: e.target.value })}
// //             className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //           />
// //         )}
// //       </div>

// //       {/* Notes */}
// //       <div>
// //         <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
// //         <textarea
// //           value={config.notes}
// //           onChange={(e) => setConfig({ ...config, notes: e.target.value })}
// //           rows={3}
// //           className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //           placeholder="Any special requirements or notes..."
// //         />
// //       </div>

// //       {/* Cost Summary */}
// //       {config.material && config.area && (
// //         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
// //           <h5 className="font-bold text-slate-800 mb-4">Cost Breakdown</h5>
// //           <div className="grid grid-cols-5 gap-4 mb-4">
// //             <div className="text-center">
// //               <p className="text-xs text-slate-600 mb-1">Material Cost</p>
// //               <p className="text-lg font-bold text-slate-800">₹{costs.materialCost.toLocaleString()}</p>
// //             </div>
// //             <div className="text-center">
// //               <p className="text-xs text-slate-600 mb-1">Labour Cost</p>
// //               <p className="text-lg font-bold text-slate-800">₹{costs.labourCost.toLocaleString()}</p>
// //             </div>
// //             <div className="text-center">
// //               <p className="text-xs text-slate-600 mb-1">Wastage ({costs.wastage}%)</p>
// //               <p className="text-lg font-bold text-slate-800">₹{costs.wastageAmount.toLocaleString()}</p>
// //             </div>
// //             <div className="text-center">
// //               <p className="text-xs text-slate-600 mb-1">Tax ({costs.taxRate}%)</p>
// //               <p className="text-lg font-bold text-slate-800">₹{costs.taxAmount.toLocaleString()}</p>
// //             </div>
// //             <div className="text-center bg-white rounded-lg p-2">
// //               <p className="text-xs text-slate-600 mb-1">Final Cost</p>
// //               <p className="text-2xl font-bold text-blue-600">₹{costs.finalCost.toLocaleString()}</p>
// //             </div>
// //           </div>
// //           <div className="text-xs text-slate-600 space-y-1">
// //             <p>• Base Rate: ₹{selectedMaterial.baseRate}/{config.unit}</p>
// //             <p>• Area: {config.area} {config.unit}</p>
// //             <p>• Labour Rate: ₹{serviceData.labourRate}/{config.unit}</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Actions */}
// //       <div className="flex gap-4">
// //         <button
// //           onClick={onCancel}
// //           className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           onClick={handleAdd}
// //           disabled={!config.material || !config.area}
// //           className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
// //         >
// //           <FiPlus /> Add to Package
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // Review Step
// // function ReviewStep({ hierarchy, services, totalCost, onNext, onBack }) {
// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <h3 className="text-lg font-bold text-slate-800 mb-4">Step 3: Review Package</h3>

// //         {/* Hierarchy Summary */}
// //         <div className="mb-6">
// //           <h4 className="font-semibold text-slate-700 mb-3">Project Hierarchy</h4>
// //           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //             <div className="grid grid-cols-2 gap-3 text-sm">
// //               {Object.entries(hierarchy).map(([key, value]) => (
// //                 <div key={key}>
// //                   <span className="text-slate-600 capitalize">{key}: </span>
// //                   <span className="font-semibold text-slate-800">{value}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Services Table */}
// //         <div className="mb-6">
// //           <h4 className="font-semibold text-slate-700 mb-3">Services Summary ({services.length} items)</h4>
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-sm">
// //               <thead className="bg-slate-100">
// //                 <tr>
// //                   <th className="px-4 py-3 text-left font-semibold text-slate-700">Service</th>
// //                   <th className="px-4 py-3 text-left font-semibold text-slate-700">Material</th>
// //                   <th className="px-4 py-3 text-right font-semibold text-slate-700">Area</th>
// //                   <th className="px-4 py-3 text-right font-semibold text-slate-700">Material Cost</th>
// //                   <th className="px-4 py-3 text-right font-semibold text-slate-700">Labour Cost</th>
// //                   <th className="px-4 py-3 text-right font-semibold text-slate-700">Tax</th>
// //                   <th className="px-4 py-3 text-right font-semibold text-slate-700">Total</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-slate-200">
// //                 {services.map(srv => (
// //                   <tr key={srv.id} className="hover:bg-slate-50">
// //                     <td className="px-4 py-3 font-medium text-slate-800">{srv.serviceType}</td>
// //                     <td className="px-4 py-3 text-slate-700">{srv.material}</td>
// //                     <td className="px-4 py-3 text-right text-slate-700">{srv.area} {srv.unit}</td>
// //                     <td className="px-4 py-3 text-right text-slate-700">₹{srv.materialCost.toLocaleString()}</td>
// //                     <td className="px-4 py-3 text-right text-slate-700">₹{srv.labourCost.toLocaleString()}</td>
// //                     <td className="px-4 py-3 text-right text-slate-700">₹{srv.taxAmount.toLocaleString()}</td>
// //                     <td className="px-4 py-3 text-right font-bold text-blue-600">₹{srv.finalCost.toLocaleString()}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //               <tfoot className="bg-slate-100">
// //                 <tr>
// //                   <td colSpan="6" className="px-4 py-4 text-right font-bold text-slate-800">Grand Total:</td>
// //                   <td className="px-4 py-4 text-right text-2xl font-bold text-blue-600">₹{totalCost.toLocaleString()}</td>
// //                 </tr>
// //               </tfoot>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Cost Breakdown Chart */}
// //         <div className="grid grid-cols-4 gap-4">
// //           {['materialCost', 'labourCost', 'wastageAmount', 'taxAmount'].map(key => {
// //             const total = services.reduce((sum, srv) => sum + srv[key], 0);
// //             const label = key === 'materialCost' ? 'Materials' : key === 'labourCost' ? 'Labour' : key === 'wastageAmount' ? 'Wastage' : 'Tax';
// //             return (
// //               <div key={key} className="bg-slate-50 rounded-lg p-4 text-center">
// //                 <p className="text-sm text-slate-600 mb-2">{label}</p>
// //                 <p className="text-xl font-bold text-slate-800">₹{total.toLocaleString()}</p>
// //                 <p className="text-xs text-slate-500 mt-1">{((total / totalCost) * 100).toFixed(1)}%</p>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       <div className="flex gap-4">
// //         <button
// //           onClick={onBack}
// //           className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all"
// //         >
// //           Back
// //         </button>
// //         <button
// //           onClick={onNext}
// //           className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
// //         >
// //           Continue to Finalize
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // Finalize Step
// // function FinalizeStep({ currentPackage, setCurrentPackage, onFinalize, onBack }) {
// //   const [metadata, setMetadata] = useState(currentPackage.metadata);
// //   const [discount, setDiscount] = useState({ type: 'none', value: 0 });

// //   const updateMetadata = (key, value) => {
// //     const updated = { ...metadata, [key]: value };
// //     setMetadata(updated);
// //     setCurrentPackage({ ...currentPackage, metadata: updated });
// //   };

// //   const calculateFinalAmount = () => {
// //     let amount = currentPackage.totalCost || 0;
// //     if (discount.type === 'percentage') {
// //       amount = amount - (amount * discount.value / 100);
// //     } else if (discount.type === 'fixed') {
// //       amount = amount - discount.value;
// //     }
// //     return Math.round(amount);
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //         <h3 className="text-lg font-bold text-slate-800 mb-6">Step 4: Finalize Package</h3>

// //         {/* Client Information */}
// //         <div className="space-y-4 mb-6">
// //           <h4 className="font-semibold text-slate-700">Client & Project Information</h4>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-2">Client Name</label>
// //               <input
// //                 type="text"
// //                 value={metadata.clientName}
// //                 onChange={(e) => updateMetadata('clientName', e.target.value)}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter client name"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-2">Project Name</label>
// //               <input
// //                 type="text"
// //                 value={metadata.projectName}
// //                 onChange={(e) => updateMetadata('projectName', e.target.value)}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter project name"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number</label>
// //               <input
// //                 type="tel"
// //                 value={metadata.contactNumber || ''}
// //                 onChange={(e) => updateMetadata('contactNumber', e.target.value)}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter contact number"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
// //               <input
// //                 type="email"
// //                 value={metadata.email || ''}
// //                 onChange={(e) => updateMetadata('email', e.target.value)}
// //                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter email address"
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-slate-700 mb-2">Project Notes</label>
// //             <textarea
// //               value={metadata.notes}
// //               onChange={(e) => updateMetadata('notes', e.target.value)}
// //               rows={4}
// //               className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               placeholder="Add any special notes or requirements..."
// //             />
// //           </div>
// //         </div>

// //         {/* Discount */}
// //         <div className="mb-6">
// //           <h4 className="font-semibold text-slate-700 mb-3">Discount (Optional)</h4>
// //           <div className="flex gap-4">
// //             <select
// //               value={discount.type}
// //               onChange={(e) => setDiscount({ ...discount, type: e.target.value, value: 0 })}
// //               className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             >
// //               <option value="none">No Discount</option>
// //               <option value="percentage">Percentage (%)</option>
// //               <option value="fixed">Fixed Amount (₹)</option>
// //             </select>
// //             {discount.type !== 'none' && (
// //               <input
// //                 type="number"
// //                 value={discount.value}
// //                 onChange={(e) => setDiscount({ ...discount, value: parseFloat(e.target.value) || 0 })}
// //                 className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder={discount.type === 'percentage' ? 'Enter %' : 'Enter amount'}
// //               />
// //             )}
// //           </div>
// //         </div>

// //         {/* Final Amount */}
// //         <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <span className="text-lg font-semibold text-slate-700">Package Total:</span>
// //             <span className="text-2xl font-bold text-slate-800">₹{currentPackage.totalCost?.toLocaleString()}</span>
// //           </div>
// //           {discount.type !== 'none' && (
// //             <>
// //               <div className="flex justify-between items-center mb-4 text-red-600">
// //                 <span className="text-sm font-medium">Discount:</span>
// //                 <span className="text-lg font-bold">
// //                   - ₹{(currentPackage.totalCost - calculateFinalAmount()).toLocaleString()}
// //                 </span>
// //               </div>
// //               <div className="border-t border-green-300 pt-4 flex justify-between items-center">
// //                 <span className="text-xl font-bold text-slate-800">Final Amount:</span>
// //                 <span className="text-3xl font-bold text-green-600">₹{calculateFinalAmount().toLocaleString()}</span>
// //               </div>
// //             </>
// //           )}
// //         </div>

// //         {/* Terms & Conditions */}
// //         <div className="mt-6">
// //           <label className="flex items-start gap-2 cursor-pointer">
// //             <input type="checkbox" className="w-5 h-5 mt-0.5 text-blue-600 rounded" />
// //             <span className="text-sm text-slate-700">
// //               I confirm that all details are accurate and the package is ready to be finalized. 
// //               Once finalized, the package will be locked and can only be edited with admin privileges.
// //             </span>
// //           </label>
// //         </div>
// //       </div>

// //       <div className="flex gap-4">
// //         <button
// //           onClick={onBack}
// //           className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all"
// //         >
// //           Back
// //         </button>
// //         <button
// //           onClick={() => {
// //             const finalPkg = {
// //               ...currentPackage,
// //               metadata: { ...metadata, discount },
// //               finalAmount: calculateFinalAmount()
// //             };
// //             setCurrentPackage(finalPkg);
// //             onFinalize();
// //           }}
// //           className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
// //         >
// //           <FiCheckCircle className="text-xl" />
// //           Finalize Package
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";

// // ✅ You can use simple div-based UI instead of external components (Card/Button) for now
// // To avoid import errors like "@/components/ui/card"
// import data from "./interiorData.json"; // Paste your JSON file in /src folder

// export default function InteriorDropdownTester() {
//   // Extract the "possibilities" object from JSON
//   const options =
//     data.InteriorDesign.sub_categories.Residential.Apartment["2BHK"].LivingRoom
//       .Bedroom1.possibilities;

//   // State management for dropdown
//   const [selectedOption, setSelectedOption] = useState("");
//   const [details, setDetails] = useState(null);

//   // Handle dropdown selection
//   const handleSelectChange = (e) => {
//     const key = e.target.value;
//     setSelectedOption(key);
//     setDetails(options[key]);
//   };

//   // 💰 Function to compute total estimated cost
//   const computeEstimatedCost = (opt) => {
//     if (!opt) return 0;
//     const carpentry = opt.CarpentryWork;
//     const wardrobe = carpentry.sub_categories.Wardrobe;

//     const materialCost = wardrobe.material_cost;
//     const labourCost = carpentry.labour_cost_per_sqft * 40; // assume 40 sqft default

//     let extras = 0;
//     const materialKey = Object.keys(wardrobe.material)[0];
//     const features = Object.values(wardrobe.material[materialKey].features);

//     features.forEach((f) => {
//       if (f.material_cost) extras += f.material_cost;
//       if (f.labour_cost_per_unit) extras += f.labour_cost_per_unit;
//     });

//     return materialCost + labourCost + extras;
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto font-sans">
//       {/* Outer container mimicking a Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           🧱 Interior Design Package Tester
//         </h2>

//         {/* Dropdown */}
//         <label className="block mb-2 font-medium text-gray-700">
//           Select a Package Option:
//         </label>
//         <select
//           className="w-full border border-gray-300 rounded-xl p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onChange={handleSelectChange}
//           value={selectedOption}
//         >
//           <option value="">-- Choose Option --</option>
//           {Object.keys(options).map((key) => (
//             <option key={key} value={key}>
//               {key.replace("_", " ")} - {options[key].profile.budget} Budget
//             </option>
//           ))}
//         </select>

//         {/* Show details when option is selected */}
//         {details && (
//           <div className="mt-4 space-y-3">
//             {/* Wardrobe Image and Basic Info */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={
//                   details.CarpentryWork.sub_categories.Wardrobe.image_url ||
//                   "https://via.placeholder.com/100"
//                 }
//                 alt="wardrobe"
//                 className="w-32 h-32 rounded-xl object-cover border"
//               />
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {details.CarpentryWork.sub_categories.Wardrobe.type}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Finish:{" "}
//                   {details.CarpentryWork.sub_categories.Wardrobe.finish}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Material:{" "}
//                   {
//                     Object.keys(
//                       details.CarpentryWork.sub_categories.Wardrobe.material
//                     )[0]
//                   }
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Brand:{" "}
//                   {
//                     details.CarpentryWork.sub_categories.Wardrobe.brand_name
//                   }
//                 </p>
//               </div>
//             </div>

//             {/* Estimated Cost */}
//             <div className="mt-4 border-t pt-3">
//               <h4 className="font-medium text-gray-800">💰 Estimated Total:</h4>
//               <p className="text-xl font-bold text-green-600">
//                 ₹ {computeEstimatedCost(details).toLocaleString("en-IN")}
//               </p>
//             </div>

//             {/* Simulated Button */}
//             <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all">
//               Confirm Selection
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { ChevronDown, Package, Plus, Trash2, Eye, Calculator, RotateCcw } from 'lucide-react';

// Sample data structure
const sampleData = {
  "InteriorDesign": {
    "sub_categories": {
      "Residential": {
        "Apartment": {
          "2BHK": {
            "LivingRoom": {
              "Bedroom1": {
                "possibilities": {
                  "Option_1": {
                    "profile": {
                      "occupant": "Single (Unmarried)",
                      "age_group": "Young Adults (20-29 years)",
                      "budget": "Medium"
                    },
                    "CarpentryWork": {
                      "labour_cost_per_sqft": 250,
                      "unit": "sqft",
                      "sub_categories": {
                        "Wardrobe": {
                          "type": "3 Door Wardrobe",
                          "finish": "Laminate Finish",
                          "material_cost": 9500,
                          "brand_name": "GreenLam",
                          "size_specifications": "7ft H x 5ft W x 2ft D",
                          "material": {
                            "MRPlywood": {
                              "material_cost": 4200,
                              "brand_name": "Century Ply",
                              "grade": "MR",
                              "features": {
                                "Drawers": {
                                  "count": 2,
                                  "with_lock": true,
                                  "digital_lock": false,
                                  "material_cost": 800
                                },
                                "LEDProfileLight": {
                                  "service_type": "Fitting",
                                  "labour_cost_per_unit": 100,
                                  "material_cost": 300,
                                  "brand_name": "Philips"
                                },
                                "AutoHinges": {
                                  "material_cost": 250,
                                  "brand_name": "Hettich"
                                },
                                "HangerPipe": {
                                  "type": "Oval",
                                  "material": "SS",
                                  "finish": "Black",
                                  "material_cost": 400,
                                  "brand_name": "Godrej"
                                },
                                "Handle": {
                                  "shape": "Rectangle",
                                  "material_cost": 150,
                                  "brand_name": "Hafele"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "Option_2": {
                    "profile": {
                      "occupant": "Married Couple",
                      "age_group": "Adults (30-40 years)",
                      "budget": "High"
                    },
                    "CarpentryWork": {
                      "labour_cost_per_sqft": 300,
                      "unit": "sqft",
                      "sub_categories": {
                        "Wardrobe": {
                          "type": "4 Door Sliding Wardrobe",
                          "finish": "Acrylic Gloss Finish",
                          "material_cost": 16500,
                          "brand_name": "Merino",
                          "size_specifications": "8ft H x 6ft W x 2.2ft D",
                          "material": {
                            "BWPlywood": {
                              "material_cost": 6200,
                              "brand_name": "GreenPly",
                              "grade": "BWP",
                              "features": {
                                "Drawers": {
                                  "count": 3,
                                  "with_lock": true,
                                  "digital_lock": true,
                                  "material_cost": 1200
                                },
                                "LEDProfileLight": {
                                  "service_type": "Fitting",
                                  "labour_cost_per_unit": 120,
                                  "material_cost": 450,
                                  "brand_name": "Syska"
                                },
                                "SoftCloseChannels": {
                                  "material_cost": 800,
                                  "brand_name": "Hettich"
                                },
                                "HangerPipe": {
                                  "type": "Round",
                                  "material": "SS",
                                  "finish": "Chrome",
                                  "material_cost": 500,
                                  "brand_name": "Ebco"
                                },
                                "Handle": {
                                  "shape": "Edge Concealed",
                                  "material_cost": 250,
                                  "brand_name": "Blum"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default function InteriorPackageMaker() {
  const [packages, setPackages] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [currentPackage, setCurrentPackage] = useState(null);

  const createNewPackage = () => {
    const newPkg = {
      id: `PKG-${Date.now()}`,
      createdAt: new Date().toISOString(),
      clientName: '',
      projectName: '',
      items: [],
      totalCost: 0
    };
    setCurrentPackage(newPkg);
    setCurrentView('create');
  };

  const savePackage = () => {
    const exists = packages.find(p => p.id === currentPackage.id);
    if (exists) {
      setPackages(packages.map(p => p.id === currentPackage.id ? currentPackage : p));
    } else {
      setPackages([...packages, currentPackage]);
    }
    setCurrentView('list');
    setCurrentPackage(null);
  };

  const deletePackage = (id) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  const viewPackage = (pkg) => {
    setCurrentPackage(pkg);
    setCurrentView('view');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Interior Package Maker</h1>
                <p className="text-sm text-slate-600">Build custom packages with cascading selections</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border'
                }`}
              >
                Packages ({packages.length})
              </button>
              <button
                onClick={createNewPackage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                New Package
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'list' && (
          <PackageList packages={packages} onView={viewPackage} onDelete={deletePackage} />
        )}
        {currentView === 'create' && (
          <PackageCreator 
            package={currentPackage} 
            setPackage={setCurrentPackage}
            onSave={savePackage}
            onCancel={() => setCurrentView('list')}
          />
        )}
        {currentView === 'view' && (
          <PackageViewer 
            package={currentPackage}
            onBack={() => setCurrentView('list')}
          />
        )}
      </main>
    </div>
  );
}

function PackageList({ packages, onView, onDelete }) {
  if (packages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Package className="mx-auto text-slate-300 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No Packages Yet</h3>
        <p className="text-slate-600">Create your first interior design package</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map(pkg => (
        <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <h3 className="text-white font-bold">{pkg.id}</h3>
          </div>
          <div className="p-6">
            <div className="space-y-2 mb-4">
              <p className="text-sm text-slate-600">
                Client: <span className="font-medium text-slate-800">{pkg.clientName || 'Not set'}</span>
              </p>
              <p className="text-sm text-slate-600">
                Project: <span className="font-medium text-slate-800">{pkg.projectName || 'Not set'}</span>
              </p>
              <p className="text-sm text-slate-600">
                Items: <span className="font-medium text-slate-800">{pkg.items.length}</span>
              </p>
            </div>
            <div className="border-t pt-4 mb-4">
              <p className="text-2xl font-bold text-blue-600">₹{pkg.totalCost.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onView(pkg)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => onDelete(pkg.id)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PackageCreator({ package: pkg, setPackage, onSave, onCancel }) {
  const [showItemBuilder, setShowItemBuilder] = useState(false);

  const addItemToPackage = (item) => {
    const updatedItems = [...pkg.items, { ...item, id: `ITEM-${Date.now()}` }];
    const totalCost = updatedItems.reduce((sum, i) => sum + i.totalCost, 0);
    setPackage({ ...pkg, items: updatedItems, totalCost });
    setShowItemBuilder(false);
  };

  const removeItem = (id) => {
    const updatedItems = pkg.items.filter(i => i.id !== id);
    const totalCost = updatedItems.reduce((sum, i) => sum + i.totalCost, 0);
    setPackage({ ...pkg, items: updatedItems, totalCost });
  };

  return (
    <div className="space-y-6">
      {/* Package Info */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Package Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Client Name</label>
            <input
              type="text"
              value={pkg.clientName}
              onChange={(e) => setPackage({ ...pkg, clientName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter client name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Project Name</label>
            <input
              type="text"
              value={pkg.projectName}
              onChange={(e) => setPackage({ ...pkg, projectName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project name"
            />
          </div>
        </div>
      </div>

      {/* Add Item Button */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <button
          onClick={() => setShowItemBuilder(true)}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={24} />
          Add New Item to Package
        </button>
      </div>

      {/* Added Items */}
      {pkg.items.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Added Items ({pkg.items.length})</h3>
          <div className="space-y-3">
            {pkg.items.map(item => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{item.selectionPath.category} - {item.selectionPath.workType}</h4>
                    <p className="text-sm text-slate-600 mt-1">{item.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(item.breakdown).map(([key, value]) => (
                        <span key={key} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                          {key}: ₹{value.toLocaleString()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xl font-bold text-blue-600">₹{item.totalCost.toLocaleString()}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total & Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-slate-800">Total Package Cost:</span>
          <span className="text-3xl font-bold text-green-600">₹{pkg.totalCost.toLocaleString()}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={pkg.items.length === 0}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
          >
            Save Package
          </button>
        </div>
      </div>

      {/* Item Builder Modal */}
      {showItemBuilder && (
        <CascadingItemBuilder
          onAdd={addItemToPackage}
          onClose={() => setShowItemBuilder(false)}
        />
      )}
    </div>
  );
}

function CascadingItemBuilder({ onAdd, onClose }) {
  const [selections, setSelections] = useState({});
  const [currentCost, setCurrentCost] = useState({});
  const [area, setArea] = useState(35);

  // Reset function
  const resetBuilder = () => {
    setSelections({});
    setCurrentCost({});
    setArea(35);
  };

  // Navigate through data based on selections
  const getCurrentData = () => {
    let data = sampleData.InteriorDesign.sub_categories;
    
    if (selections.projectType) data = data[selections.projectType];
    if (selections.propertyType && data) data = data[selections.propertyType];
    if (selections.configuration && data) data = data[selections.configuration];
    if (selections.room && data) data = data[selections.room];
    if (selections.space && data) data = data[selections.space];
    if (selections.option && data) data = data.possibilities[selections.option];
    if (selections.workCategory && data) data = data[selections.workCategory];
    if (selections.workType && data) data = data.sub_categories[selections.workType];
    
    return data;
  };

  // Get available options for each dropdown
  const getOptions = (level) => {
    if (level === 'projectType') {
      return Object.keys(sampleData.InteriorDesign.sub_categories);
    }
    
    let data = sampleData.InteriorDesign.sub_categories;
    
    if (level === 'propertyType' && selections.projectType) {
      return Object.keys(data[selections.projectType] || {});
    }
    
    if (level === 'configuration' && selections.projectType && selections.propertyType) {
      data = data[selections.projectType][selections.propertyType];
      return Object.keys(data || {});
    }
    
    if (level === 'room' && selections.configuration) {
      data = data[selections.projectType][selections.propertyType][selections.configuration];
      return Object.keys(data || {});
    }
    
    if (level === 'space' && selections.room) {
      data = data[selections.projectType][selections.propertyType][selections.configuration][selections.room];
      return Object.keys(data || {});
    }
    
    if (level === 'option' && selections.space) {
      data = data[selections.projectType][selections.propertyType][selections.configuration][selections.room][selections.space];
      return Object.keys(data.possibilities || {});
    }
    
    if (level === 'workCategory' && selections.option) {
      const optionData = data[selections.projectType][selections.propertyType][selections.configuration][selections.room][selections.space].possibilities[selections.option];
      return Object.keys(optionData).filter(k => k !== 'profile');
    }
    
    if (level === 'workType' && selections.workCategory) {
      const workData = data[selections.projectType][selections.propertyType][selections.configuration][selections.room][selections.space].possibilities[selections.option][selections.workCategory];
      return Object.keys(workData.sub_categories || {});
    }
    
    return [];
  };

  // Calculate cost whenever selections change
  useEffect(() => {
    if (!selections.workType) return;
    
    const data = getCurrentData();
    if (!data) return;
    
    const costs = {
      baseCost: data.material_cost || 0,
      labourCost: 0,
      materialCost: 0,
      featuresCost: 0
    };
    
    // Labour cost
    const workData = sampleData.InteriorDesign.sub_categories[selections.projectType][selections.propertyType][selections.configuration][selections.room][selections.space].possibilities[selections.option][selections.workCategory];
    costs.labourCost = (workData.labour_cost_per_sqft || 0) * area;
    
    // Material cost
    if (selections.material && data.material && data.material[selections.material]) {
      costs.materialCost = data.material[selections.material].material_cost || 0;
    }
    
    // Features cost
    if (selections.material && selections.features) {
      const materialData = data.material[selections.material];
      Object.keys(selections.features).forEach(featureName => {
        if (selections.features[featureName] && materialData.features[featureName]) {
          const feature = materialData.features[featureName];
          costs.featuresCost += (feature.material_cost || 0) + (feature.labour_cost_per_unit || 0);
        }
      });
    }
    
    setCurrentCost(costs);
  }, [selections, area]);

  const handleSelection = (level, value) => {
    const newSelections = { ...selections, [level]: value };
    
    // Clear downstream selections
    const levels = ['projectType', 'propertyType', 'configuration', 'room', 'space', 'option', 'workCategory', 'workType', 'wardrobeType', 'finish', 'material', 'features'];
    const currentIndex = levels.indexOf(level);
    levels.slice(currentIndex + 1).forEach(l => delete newSelections[l]);
    
    setSelections(newSelections);
  };

  const handleFeatureToggle = (featureName) => {
    setSelections(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: !prev.features?.[featureName]
      }
    }));
  };

  const getTotalCost = () => {
    return Object.values(currentCost).reduce((sum, val) => sum + val, 0);
  };

  const handleAddItem = () => {
    const data = getCurrentData();
    const workData = sampleData.InteriorDesign.sub_categories[selections.projectType][selections.propertyType][selections.configuration][selections.room][selections.space].possibilities[selections.option][selections.workCategory];
    
    const item = {
      selectionPath: selections,
      summary: generateSummary(),
      totalCost: getTotalCost(),
      breakdown: currentCost,
      area: area
    };
    
    onAdd(item);
  };

  const generateSummary = () => {
    const parts = [];
    if (selections.projectType) parts.push(selections.projectType);
    if (selections.propertyType) parts.push(selections.propertyType);
    if (selections.configuration) parts.push(selections.configuration);
    if (selections.workCategory) parts.push(selections.workCategory);
    if (selections.workType) parts.push(selections.workType);
    
    const data = getCurrentData();
    if (data) {
      if (data.type) parts.push(data.type);
      if (data.finish) parts.push(data.finish);
      if (selections.material) parts.push(selections.material);
    }
    
    return parts.join(' • ');
  };

  const currentData = getCurrentData();
  const canAddItem = selections.workType && getTotalCost() > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-center z-10">
          <div>
            <h3 className="text-xl font-bold text-white">Build Your Item</h3>
            <p className="text-blue-100 text-sm mt-1">Select options step by step</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetBuilder}
              className="p-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all"
              title="Reset"
            >
              <RotateCcw size={20} />
            </button>
            <button onClick={onClose} className="text-white hover:text-slate-200 text-2xl">✕</button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Dropdowns */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-lg mb-4">Step-by-Step Selection</h4>
              
              {/* Project Type */}
              <DropdownField
                label="1. Project Type"
                value={selections.projectType}
                options={getOptions('projectType')}
                onChange={(val) => handleSelection('projectType', val)}
              />
              
              {/* Property Type */}
              {selections.projectType && (
                <DropdownField
                  label="2. Property Type"
                  value={selections.propertyType}
                  options={getOptions('propertyType')}
                  onChange={(val) => handleSelection('propertyType', val)}
                />
              )}
              
              {/* Configuration */}
              {selections.propertyType && (
                <DropdownField
                  label="3. Configuration"
                  value={selections.configuration}
                  options={getOptions('configuration')}
                  onChange={(val) => handleSelection('configuration', val)}
                />
              )}
              
              {/* Room */}
              {selections.configuration && (
                <DropdownField
                  label="4. Room"
                  value={selections.room}
                  options={getOptions('room')}
                  onChange={(val) => handleSelection('room', val)}
                />
              )}
              
              {/* Space */}
              {selections.room && (
                <DropdownField
                  label="5. Space"
                  value={selections.space}
                  options={getOptions('space')}
                  onChange={(val) => handleSelection('space', val)}
                />
              )}
              
              {/* Profile Options */}
              {selections.space && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">6. Profile Option</label>
                  <div className="space-y-2">
                    {getOptions('option').map(opt => {
                      const optData = sampleData.InteriorDesign.sub_categories[selections.projectType][selections.propertyType][selections.configuration][selections.room][selections.space].possibilities[opt];
                      return (
                        <div
                          key={opt}
                          onClick={() => handleSelection('option', opt)}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            selections.option === opt
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <p className="font-semibold text-slate-800">{opt}</p>
                          <p className="text-xs text-slate-600">{optData.profile.occupant} • {optData.profile.age_group}</p>
                          <span className="inline-block mt-1 text-xs bg-slate-200 px-2 py-1 rounded">{optData.profile.budget} Budget</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Work Category */}
              {selections.option && (
                <DropdownField
                  label="7. Work Category"
                  value={selections.workCategory}
                  options={getOptions('workCategory')}
                  onChange={(val) => handleSelection('workCategory', val)}
                />
              )}
              
              {/* Work Type */}
              {selections.workCategory && (
                <DropdownField
                  label="8. Work Type"
                  value={selections.workType}
                  options={getOptions('workType')}
                  onChange={(val) => handleSelection('workType', val)}
                />
              )}
              
              {/* Wardrobe Type */}
              {selections.workType && currentData && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">9. {selections.workType} Type</label>
                  <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-slate-800">{currentData.type}</p>
                    <p className="text-sm text-slate-600 mt-1">₹{currentData.material_cost?.toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {/* Finish */}
              {selections.workType && currentData && (
                                  <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">10. Finish</label>
                  <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-slate-800">{currentData.finish}</p>
                    <p className="text-sm text-slate-600">Brand: {currentData.brand_name}</p>
                  </div>
                </div>
              )}
              
              {/* Material Selection */}
              {selections.workType && currentData && currentData.material && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">11. Select Material</label>
                  <div className="space-y-2">
                    {Object.entries(currentData.material).map(([matName, matData]) => (
                      <div
                        key={matName}
                        onClick={() => handleSelection('material', matName)}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selections.material === matName
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-slate-800">{matName}</p>
                            <p className="text-xs text-slate-600">Brand: {matData.brand_name}</p>
                            <p className="text-xs text-slate-600">Grade: {matData.grade}</p>
                          </div>
                          <p className="font-bold text-green-600">₹{matData.material_cost.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Area Input */}
              {selections.material && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">12. Area (sqft)</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                    min="1"
                  />
                  <p className="text-xs text-slate-600 mt-1">
                    Labour: ₹{(sampleData.InteriorDesign.sub_categories[selections.projectType][selections.propertyType][selections.configuration][selections.room][selections.space].possibilities[selections.option][selections.workCategory].labour_cost_per_sqft * area).toLocaleString()}
                  </p>
                </div>
              )}
              
              {/* Features Selection */}
              {selections.material && currentData.material[selections.material].features && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">13. Select Features (Optional)</label>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {Object.entries(currentData.material[selections.material].features).map(([featureName, featureData]) => (
                      <div
                        key={featureName}
                        onClick={() => handleFeatureToggle(featureName)}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selections.features?.[featureName]
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center ${
                            selections.features?.[featureName]
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-slate-300'
                          }`}>
                            {selections.features?.[featureName] && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">{featureName}</p>
                            <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                              {featureData.brand_name && <p>Brand: {featureData.brand_name}</p>}
                              {featureData.count && <p>Count: {featureData.count}</p>}
                              {featureData.type && <p>Type: {featureData.type}</p>}
                              {featureData.material && <p>Material: {featureData.material}</p>}
                              {featureData.finish && <p>Finish: {featureData.finish}</p>}
                              {featureData.shape && <p>Shape: {featureData.shape}</p>}
                              {featureData.with_lock !== undefined && <p>Lock: {featureData.with_lock ? 'Yes' : 'No'}</p>}
                              {featureData.digital_lock !== undefined && <p>Digital Lock: {featureData.digital_lock ? 'Yes' : 'No'}</p>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600">
                              ₹{((featureData.material_cost || 0) + (featureData.labour_cost_per_unit || 0)).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Summary & Cost */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-lg mb-4">Summary & Costing</h4>
              
              {/* Selection Summary */}
              <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
                <h5 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Package size={18} />
                  Your Selections
                </h5>
                <div className="space-y-2 text-sm">
                  {selections.projectType && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Project:</span>
                      <span className="font-medium text-slate-800">{selections.projectType}</span>
                    </div>
                  )}
                  {selections.propertyType && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Property:</span>
                      <span className="font-medium text-slate-800">{selections.propertyType}</span>
                    </div>
                  )}
                  {selections.configuration && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Config:</span>
                      <span className="font-medium text-slate-800">{selections.configuration}</span>
                    </div>
                  )}
                  {selections.room && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Room:</span>
                      <span className="font-medium text-slate-800">{selections.room}</span>
                    </div>
                  )}
                  {selections.space && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Space:</span>
                      <span className="font-medium text-slate-800">{selections.space}</span>
                    </div>
                  )}
                  {selections.option && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Profile:</span>
                      <span className="font-medium text-slate-800">{selections.option}</span>
                    </div>
                  )}
                  {selections.workCategory && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Category:</span>
                      <span className="font-medium text-slate-800">{selections.workCategory}</span>
                    </div>
                  )}
                  {selections.workType && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Work Type:</span>
                      <span className="font-medium text-slate-800">{selections.workType}</span>
                    </div>
                  )}
                  {currentData?.type && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Type:</span>
                      <span className="font-medium text-slate-800">{currentData.type}</span>
                    </div>
                  )}
                  {currentData?.finish && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Finish:</span>
                      <span className="font-medium text-slate-800">{currentData.finish}</span>
                    </div>
                  )}
                  {selections.material && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Material:</span>
                      <span className="font-medium text-slate-800">{selections.material}</span>
                    </div>
                  )}
                  {area && selections.material && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Area:</span>
                      <span className="font-medium text-slate-800">{area} sqft</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Cost Breakdown */}
              {Object.keys(currentCost).length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
                  <h5 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Calculator size={18} />
                    Cost Breakdown
                  </h5>
                  <div className="space-y-2">
                    {currentCost.baseCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Base Cost:</span>
                        <span className="font-semibold text-slate-800">₹{currentCost.baseCost.toLocaleString()}</span>
                      </div>
                    )}
                    {currentCost.materialCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Material Cost:</span>
                        <span className="font-semibold text-slate-800">₹{currentCost.materialCost.toLocaleString()}</span>
                      </div>
                    )}
                    {currentCost.labourCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Labour Cost:</span>
                        <span className="font-semibold text-slate-800">₹{currentCost.labourCost.toLocaleString()}</span>
                      </div>
                    )}
                    {currentCost.featuresCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Features Cost:</span>
                        <span className="font-semibold text-slate-800">₹{currentCost.featuresCost.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t-2 border-blue-300 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-800">Total:</span>
                        <span className="font-bold text-blue-600 text-xl">₹{getTotalCost().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Selected Features List */}
              {selections.features && Object.keys(selections.features).some(k => selections.features[k]) && (
                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                  <h5 className="font-semibold text-slate-700 mb-3">Selected Features</h5>
                  <div className="space-y-2">
                    {Object.entries(selections.features)
                      .filter(([_, isSelected]) => isSelected)
                      .map(([featureName]) => {
                        const featureData = currentData.material[selections.material].features[featureName];
                        const cost = (featureData.material_cost || 0) + (featureData.labour_cost_per_unit || 0);
                        return (
                          <div key={featureName} className="flex justify-between items-center text-sm bg-white rounded p-2">
                            <span className="font-medium text-slate-700">{featureName}</span>
                            <span className="text-purple-600 font-semibold">₹{cost.toLocaleString()}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              
              {/* Add Button */}
              <button
                onClick={handleAddItem}
                disabled={!canAddItem}
                className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  canAddItem
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Plus size={24} />
                Add to Package (₹{getTotalCost().toLocaleString()})
              </button>
              
              {!canAddItem && (
                <p className="text-sm text-slate-500 text-center">
                  Complete all required selections to add item
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white font-medium text-slate-800"
        >
          <option value="">-- Select --</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
      </div>
    </div>
  );
}

function PackageViewer({ package: pkg, onBack }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{pkg.id}</h2>
            <div className="space-y-1">
              <p className="text-slate-600">Client: <span className="font-semibold">{pkg.clientName || 'Not set'}</span></p>
              <p className="text-slate-600">Project: <span className="font-semibold">{pkg.projectName || 'Not set'}</span></p>
              <p className="text-sm text-slate-500">Created: {new Date(pkg.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            ← Back to Packages
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Package Items ({pkg.items.length})</h3>
        <div className="space-y-6">
          {pkg.items.map((item, index) => (
            <div key={item.id} className="border-2 border-slate-200 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <h4 className="text-xl font-bold text-slate-800">{item.selectionPath.category || 'Item'}</h4>
                  </div>
                  <p className="text-slate-600 ml-11 mb-2">{item.summary}</p>
                  <p className="text-sm text-slate-500 ml-11">Area: {item.area} sqft</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">₹{item.totalCost.toLocaleString()}</p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="ml-11 bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-slate-700 mb-3 text-sm">Cost Breakdown:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {item.breakdown.baseCost > 0 && (
                    <div>
                      <p className="text-slate-600">Base Cost</p>
                      <p className="font-semibold text-slate-800">₹{item.breakdown.baseCost.toLocaleString()}</p>
                    </div>
                  )}
                  {item.breakdown.materialCost > 0 && (
                    <div>
                      <p className="text-slate-600">Material</p>
                      <p className="font-semibold text-slate-800">₹{item.breakdown.materialCost.toLocaleString()}</p>
                    </div>
                  )}
                  {item.breakdown.labourCost > 0 && (
                    <div>
                      <p className="text-slate-600">Labour</p>
                      <p className="font-semibold text-slate-800">₹{item.breakdown.labourCost.toLocaleString()}</p>
                    </div>
                  )}
                  {item.breakdown.featuresCost > 0 && (
                    <div>
                      <p className="text-slate-600">Features</p>
                      <p className="font-semibold text-slate-800">₹{item.breakdown.featuresCost.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Summary */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-md p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-green-100 mb-1">Total Package Value</p>
            <p className="text-4xl font-bold">₹{pkg.totalCost.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-green-100 mb-1">Total Items</p>
            <p className="text-3xl font-bold">{pkg.items.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}