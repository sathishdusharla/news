import React from 'react';

const NewspaperLayout = () => {
  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Left Sidebar - Page Thumbnails - Hidden on mobile */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((page) => (
              <div key={page} className="text-center">
                <div className="border border-gray-300 bg-white p-2 hover:shadow-md transition-shadow cursor-pointer">
                  <img
                    src={`https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?auto=compress&cs=tinysrgb&w=200&h=280`}
                    alt={`Page ${page}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-medium">Page {page}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Flash India News Header */}
          <div className="bg-gray-800 text-white p-2 md:p-4 mb-4 md:mb-6">
            <h1 className="text-lg md:text-2xl font-bold text-center">Flash India News</h1>
          </div>

          {/* Main Newspaper Content */}
          <div className="bg-white border border-gray-300 p-2 md:p-6">
            {/* Newspaper Masthead */}
            <div className="border-b-2 border-gray-800 pb-2 md:pb-4 mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                <div className="flex items-center">
                  <div className="bg-red-600 text-white px-2 md:px-3 py-1 mr-2 md:mr-4">
                    <span className="font-bold text-xs md:text-sm">FLASH INDIA</span>
                    <div className="bg-yellow-400 text-black px-1 md:px-2 py-1 mt-1">
                      <span className="text-xs font-bold">NEWS</span>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <h2 className="text-2xl md:text-4xl font-bold telugu-text">
                      ఫ్లాష్ ఇండియా
                    </h2>
                    <p className="text-xs md:text-sm">www.flashindianews.com</p>
                    <p className="text-xs">FLASH INDIA TELUGU DAILY</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="bg-blue-600 text-white px-2 md:px-3 py-1 mb-2">
                    <span className="font-bold text-xs md:text-sm">TELANGANA RISING 2047</span>
                  </div>
                  <p className="text-xs">RNI NO. APTEL/2010/33229</p>
                </div>
              </div>
            </div>

            {/* Date and Issue Info */}
            <div className="bg-red-600 text-white p-1 md:p-2 mb-4 md:mb-6 text-center">
              <div className="flex flex-wrap justify-between items-center text-xs md:text-sm telugu-text">
                <span>సంచిక : 16</span>
                <span>సంవత్సర :150</span>
                <span>గురువారం 17.07.2025</span>
                <span className="hidden md:inline">ఎడిషన్ :హైదరాబాద్ ,సికింద్రాబాద్</span>
                <span>పేజీలు :08</span>
                <span>వెల : రూ 2/-</span>
              </div>
            </div>

            {/* Main News Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              {/* Left Column */}
              <div className="space-y-3 md:space-y-4">
                <div className="border-b pb-3 md:pb-4">
                  <img
                    src="https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="News"
                    className="w-full h-32 md:h-48 object-cover mb-2 md:mb-3"
                  />
                  <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 telugu-text">
                    దేవలోని వైకుంఠపు తీర్థకుంద
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed telugu-text">
                    వేలిమాట్ల ఎన్నికల్లో ప్రచారం చేస్తున్న అభ్యర్థులు...
                    రాష్ట్రంలో బ్యాంకుల్లో వైఫై సేవలకు చార్జ్ వసూలు చేయనున్నట్లు...
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm md:text-base mb-1 md:mb-2 telugu-text">జేసీ రాజ్యసభకు</h4>
                  <p className="text-xs md:text-sm text-gray-700 telugu-text">
                    తెలంగాణ రాష్ట్ర ప్రభుత్వం కీలక నిర్ణయం తీసుకుంది...
                  </p>
                </div>
              </div>

              {/* Center Column */}
              <div className="space-y-3 md:space-y-4">
                <div className="text-center border-b pb-3 md:pb-4">
                  <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 telugu-text">
                    బ్యాంకుల్లో చర్జ్ జరుగలేదు
                  </h2>
                  <h3 className="text-sm md:text-lg font-semibold text-red-600 mb-2 md:mb-3 telugu-text">
                    వేలిమాట్ల ఎన్నికల్లో ఏపీ అంగికారం
                  </h3>
                  <img
                    src="https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Main News"
                    className="w-full h-40 md:h-64 object-cover mb-2 md:mb-3"
                  />
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed telugu-text">
                    పెద్దల వేలిమాట్ల ఎన్నికల్లో ప్రధాన పార్టీల అభ్యర్థుల మధ్య తీవ్ర పోటీ...
                    రాష్ట్రంలో అన్ని నియోజకవర్గాల్లో ఎన్నికల ప్రచారం దూకుడుగా...
                  </p>
                </div>

                <div className="bg-gray-100 p-2 md:p-3">
                  <h4 className="font-bold mb-1 md:mb-2 text-sm md:text-base telugu-text">హేమ రాజ్యసభకు</h4>
                  <p className="text-xs text-gray-600 telugu-text">
                    తెలంగాణ రాష్ట్రంలో రాజ్యసభ ఎన్నికలకు...
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3 md:space-y-4">
                <div className="border border-gray-300 p-2 md:p-3">
                  <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2 telugu-text">
                    కుమ్మ దేవతకు ఎవిఎం పూజలు వేసిన లేడు
                  </h3>
                  <img
                    src="https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="News"
                    className="w-full h-24 md:h-32 object-cover mb-1 md:mb-2"
                  />
                  <p className="text-xs text-gray-700 telugu-text">
                    ఎన్నికల్లో పోటీ చేస్తున్న అభ్యర్థులు దేవతల దర్శనం...
                  </p>
                </div>

                <div className="border border-gray-300 p-2 md:p-3">
                  <h4 className="font-bold text-xs md:text-sm mb-1 md:mb-2 telugu-text">అర్జున్ రెడ్డి</h4>
                  <h4 className="font-bold text-xs md:text-sm mb-1 md:mb-2 telugu-text">దర్శకుడు ప్రసన్న కుమార్</h4>
                  <img
                    src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Entertainment"
                    className="w-full h-24 md:h-32 object-cover mb-1 md:mb-2"
                  />
                  <p className="text-xs text-gray-700 telugu-text">
                    తెలుగు సినిమా రంగంలో కొత్త చిత్రాల షూటింగ్...
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3 bg-purple-600 text-white p-1 md:p-2 telugu-text">
                  హైకోర్టు సీరియస్..
                </h3>
                <div className="flex gap-2 md:gap-3">
                  <img
                    src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Court"
                    className="w-16 h-16 md:w-24 md:h-24 object-cover"
                  />
                  <div>
                    <p className="text-xs md:text-sm text-gray-700 telugu-text">
                      అధిక పోలీస్ సంఖ్య అంగీకరించిన కోర్టు...
                      న్యాయస్థానం కీలక వ్యాఖ్యలు చేసింది...
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3 telugu-text">
                  మహిళల్లో అత్యాగరవంతో బీవించాలి
                </h3>
                <div className="flex gap-2 md:gap-3">
                  <img
                    src="https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Women"
                    className="w-16 h-16 md:w-24 md:h-24 object-cover"
                  />
                  <div>
                    <p className="text-xs md:text-sm text-gray-700 telugu-text">
                      మహిళా సాధికారత కోసం ప్రభుత్వం కొత్త పథకాలు...
                      రాష్ట్రంలో మహిళల భద్రతకు అదనపు చర్యలు...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Mobile Content */}
            <div className="mt-4 md:mt-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-300 p-3">
                  <h4 className="font-bold text-sm mb-2 telugu-text">హైకోర్టు సీరియస్..</h4>
                  <div className="flex gap-3">
                    <img
                      src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt="Court news"
                      className="w-20 h-20 object-cover"
                    />
                    <div>
                      <p className="text-xs text-gray-700 telugu-text">
                        అధిక పోలీస్ సంఖ్య అంగీకరించిన కోర్టు... న్యాయస్థానం కీలక వ్యాఖ్యలు చేసింది...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 p-3">
                  <h4 className="font-bold text-sm mb-2 telugu-text">బనకచర ప్రాజెక్ట్ కు అనుమతులు ఒప్పుకునే లేదు..</h4>
                  <div className="flex gap-3">
                    <img
                      src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt="Project news"
                      className="w-20 h-20 object-cover"
                    />
                    <div>
                      <p className="text-xs text-gray-700 telugu-text">
                        ప్రాజెక్ట్ అనుమతుల విషయంలో ప్రభుత్వం కీలక నిర్ణయం...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-600 text-white p-3 rounded">
                <h4 className="font-bold text-sm mb-2">హైకోర్టు</h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="bg-red-600 p-2 rounded text-center">
                    <div>22 కోట్లు</div>
                    <div>రూ.10,000</div>
                  </div>
                  <div className="bg-red-600 p-2 rounded text-center">
                    <div>24 కోట్లు</div>
                    <div>రూ.10,000</div>
                  </div>
                  <div className="bg-red-600 p-2 rounded text-center">
                    <div>44 లక్షలు</div>
                    <div>రూ.1,277</div>
                  </div>
                  <div className="bg-yellow-400 text-black p-2 rounded text-center">
                    <div>చికెన్ రేట్</div>
                    <div>Dressed</div>
                    <div>With Skin</div>
                    <div>Skinless</div>
                    <div>Boneless</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewspaperLayout;