import React, { useState, useRef, useEffect } from "react";

// ============================================================
// データ定義
// ============================================================

const CAST_POOL = [
  { name: "高橋葵", age: 17, gender: "女性", personality: "しっかり者で世話焼き", club: "図書委員会", closeWith: "高橋茜", relationType: "姉妹" },
  { name: "高橋茜", age: 17, gender: "女性", personality: "自由奔放でマイペース", club: "ダンス部", closeWith: "高橋葵", relationType: "姉妹" },
  { name: "中村蓮", age: 17, gender: "男性", personality: "まっすぐで熱血", club: "野球部", closeWith: "小林陽菜", relationType: "幼馴染" },
  { name: "小林陽菜", age: 17, gender: "女性", personality: "物静かで観察好き", club: "美術部", closeWith: "中村蓮", relationType: "幼馴染" },
  { name: "山本大和", age: 17, gender: "男性", personality: "自信家でリーダー気質", club: "バスケ部", closeWith: "木村悠斗", relationType: "親友" },
  { name: "木村悠斗", age: 17, gender: "男性", personality: "控えめで気配り上手", club: "バスケ部", closeWith: "山本大和", relationType: "親友" },
  { name: "遠藤茉莉", age: 17, gender: "女性", personality: "情熱的で自己主張が強い", club: "演劇部部長", rivalWith: "松岡健", relationType: "ライバル" },
  { name: "松岡健", age: 17, gender: "男性", personality: "堅物で理屈っぽい", club: "生徒会長", rivalWith: "遠藤茉莉", relationType: "ライバル" },
  { name: "佐々木優花", age: 17, gender: "女性", personality: "明るくおしゃべり", club: "吹奏楽部" },
  { name: "加藤翔太", age: 17, gender: "男性", personality: "飄々として掴みどころがない", club: "軽音楽部" },
  { name: "西村奏太", age: 17, gender: "男性", personality: "ムードメーカーでお調子者", club: "サッカー部", closeWith: "石田悠真", relationType: "親友" },
  { name: "石田悠真", age: 17, gender: "男性", personality: "皮肉屋だが情に厚い", club: "サッカー部", closeWith: "西村奏太", relationType: "親友" },
  { name: "橋本芽依", age: 17, gender: "女性", personality: "負けず嫌いで完璧主義", club: "テニス部", rivalWith: "岡田美咲", relationType: "ライバル" },
  { name: "岡田美咲", age: 17, gender: "女性", personality: "天然でマイペース", club: "テニス部", rivalWith: "橋本芽依", relationType: "ライバル" },
  { name: "斎藤陸", age: 17, gender: "男性", personality: "冷静沈着な策略家タイプ", club: "将棋部" },
  { name: "藤井蒼", age: 17, gender: "男性", personality: "無口だが観察眼が鋭い", club: "写真部" },
  { name: "渡辺結衣", age: 17, gender: "女性", personality: "世話焼きな委員長気質", club: "生徒会", closeWith: "清水楓", relationType: "幼馴染" },
  { name: "清水楓", age: 17, gender: "女性", personality: "内気だが芯は強い", club: "茶道部", closeWith: "渡辺結衣", relationType: "幼馴染" },
  { name: "伊藤陽向", age: 17, gender: "男性", personality: "熱血だが空回りしがち", club: "陸上部", rivalWith: "田中翼", relationType: "ライバル" },
  { name: "田中翼", age: 17, gender: "男性", personality: "クールで実力主義", club: "陸上部", rivalWith: "伊藤陽向", relationType: "ライバル" },
  { name: "中島美月", age: 17, gender: "女性", personality: "おっとり癒し系", club: "園芸部" },
  { name: "村田悠", age: 17, gender: "男性", personality: "皮肉屋の毒舌家", club: "文芸部" },
  { name: "森下ひなた", age: 17, gender: "女性", personality: "元気いっぱいの応援団長", club: "応援団", closeWith: "野村さくら", relationType: "親友" },
  { name: "野村さくら", age: 17, gender: "女性", personality: "冷静なブレーンタイプ", club: "応援団", closeWith: "森下ひなた", relationType: "親友" },
  { name: "近藤大地", age: 17, gender: "男性", personality: "寡黙な職人気質", club: "料理研究部" },
  { name: "青木蓮司", age: 17, gender: "男性", personality: "軽薄に見えて意外と義理堅い", club: "映画研究部" },
  { name: "坂本莉子", age: 17, gender: "女性", personality: "毒舌だが面倒見がいい", club: "新聞部" },
  { name: "福田快斗", age: 17, gender: "男性", personality: "とにかく前向きな体育会系", club: "柔道部" },
  { name: "山田結菜", age: 17, gender: "女性", personality: "計算高いが根は優しい", club: "英語部" },
  { name: "太田悠斗", age: 17, gender: "男性", personality: "何を考えているか読めない", club: "帰宅部", outcast: true },
  { name: "鈴木大輔", age: 17, gender: "男性", personality: "真面目すぎて融通が利かない", club: "剣道部", rivalWith: "宮本翔", relationType: "ライバル" },
  { name: "宮本翔", age: 17, gender: "男性", personality: "要領がよく立ち回り上手", club: "剣道部", rivalWith: "鈴木大輔", relationType: "ライバル" },
  { name: "石川涼太", age: 17, gender: "男性", personality: "口数少なく淡々としている", club: "化学部" },
  { name: "中野颯太", age: 17, gender: "男性", personality: "熱しやすく冷めやすい", club: "陸上部" },
  { name: "藤田直樹", age: 17, gender: "男性", personality: "誰にでも優しいが芯がない", club: "ボランティア部", closeWith: "村上健二", relationType: "幼馴染" },
  { name: "村上健二", age: 17, gender: "男性", personality: "曲がったことが嫌いな正義漢", club: "ボランティア部", closeWith: "藤田直樹", relationType: "幼馴染" },
  { name: "岡本蒼太", age: 17, gender: "男性", personality: "皮肉屋で他人と距離を置く", club: "文芸部" },
  { name: "長谷川樹", age: 17, gender: "男性", personality: "天然でどこか抜けている", club: "サッカー部", rivalWith: "松本大河", relationType: "ライバル" },
  { name: "松本大河", age: 17, gender: "男性", personality: "負けん気が強く声が大きい", club: "サッカー部", rivalWith: "長谷川樹", relationType: "ライバル" },
  { name: "田村美咲", age: 17, gender: "女性", personality: "明るいが実は寂しがり屋", club: "軽音楽部", closeWith: "石井ひかり", relationType: "親友" },
  { name: "石井ひかり", age: 17, gender: "女性", personality: "几帳面で完璧主義", club: "吹奏楽部", closeWith: "田村美咲", relationType: "親友" },
  { name: "小川莉緒", age: 17, gender: "女性", personality: "マイペースで空気を読まない", club: "美術部" },
  { name: "加藤麻衣", age: 17, gender: "女性", personality: "面倒見がいいがお節介", club: "調理部", rivalWith: "西田菜々", relationType: "ライバル" },
  { name: "西田菜々", age: 17, gender: "女性", personality: "クールで人と群れない", club: "写真部", rivalWith: "加藤麻衣", relationType: "ライバル" },
  { name: "松田杏", age: 17, gender: "女性", personality: "楽観的でノリがいい", club: "ダンス部" },
  { name: "原田心美", age: 17, gender: "女性", personality: "内向的で本が好き", club: "図書委員会", closeWith: "木下彩", relationType: "幼馴染" },
  { name: "木下彩", age: 17, gender: "女性", personality: "世話好きで面倒見がいい", club: "茶道部", closeWith: "原田心美", relationType: "幼馴染" },
  { name: "斉藤玲奈", age: 17, gender: "女性", personality: "おっとりして争いを好まない", club: "園芸部", rivalWith: "村田真央", relationType: "ライバル" },
  { name: "村田真央", age: 17, gender: "女性", personality: "野心家で目立ちたがり", club: "応援団", rivalWith: "斉藤玲奈", relationType: "ライバル" },
  { name: "宮下瑠奈", age: 17, gender: "女性", personality: "気が強く物怖じしない", club: "陸上部" },
];

const CAST_POOL_EN = [
  { name: "Ava Bennett", age: 17, gender: "女性", personality: "responsible and caring", club: "Library Committee", closeWith: "Ivy Bennett", relationType: "sisters" },
  { name: "Ivy Bennett", age: 17, gender: "女性", personality: "free-spirited and easygoing", club: "Dance Team", closeWith: "Ava Bennett", relationType: "sisters" },
  { name: "Ryan Carter", age: 17, gender: "男性", personality: "straightforward and hot-blooded", club: "Baseball Team", closeWith: "Hannah Cole", relationType: "childhood friends" },
  { name: "Hannah Cole", age: 17, gender: "女性", personality: "quiet and observant", club: "Art Club", closeWith: "Ryan Carter", relationType: "childhood friends" },
  { name: "Marcus Reed", age: 17, gender: "男性", personality: "confident, natural leader type", club: "Basketball Team", closeWith: "Ethan Kim", relationType: "best friends" },
  { name: "Ethan Kim", age: 17, gender: "男性", personality: "modest and considerate", club: "Basketball Team", closeWith: "Marcus Reed", relationType: "best friends" },
  { name: "Jasmine Ford", age: 17, gender: "女性", personality: "passionate and outspoken", club: "Drama Club President", rivalWith: "Kenneth Walsh", relationType: "rivals" },
  { name: "Kenneth Walsh", age: 17, gender: "男性", personality: "rigid and overly logical", club: "Student Council President", rivalWith: "Jasmine Ford", relationType: "rivals" },
  { name: "Olivia Sanders", age: 17, gender: "女性", personality: "cheerful and chatty", club: "Marching Band" },
  { name: "Shawn Kelly", age: 17, gender: "男性", personality: "breezy and hard to pin down", club: "Music Club" },
  { name: "Tyler Nash", age: 17, gender: "男性", personality: "the class clown, always lightening the mood", club: "Soccer Team", closeWith: "Miguel Torres", relationType: "best friends" },
  { name: "Miguel Torres", age: 17, gender: "男性", personality: "sarcastic but warm-hearted", club: "Soccer Team", closeWith: "Tyler Nash", relationType: "best friends" },
  { name: "Meiko Hoshino", age: 17, gender: "女性", personality: "competitive perfectionist", club: "Tennis Team", rivalWith: "Misaki Okada", relationType: "rivals" },
  { name: "Misaki Okada", age: 17, gender: "女性", personality: "airheaded and easygoing", club: "Tennis Team", rivalWith: "Meiko Hoshino", relationType: "rivals" },
  { name: "Riku Saito", age: 17, gender: "男性", personality: "cool-headed strategist type", club: "Chess Club" },
  { name: "Aiden Frost", age: 17, gender: "男性", personality: "quiet but sharp-eyed", club: "Photography Club" },
  { name: "Yui Watson", age: 17, gender: "女性", personality: "the caring class-president type", club: "Student Council", closeWith: "Fern Shaw", relationType: "childhood friends" },
  { name: "Fern Shaw", age: 17, gender: "女性", personality: "shy but strong-willed", club: "Tea Ceremony Club", closeWith: "Yui Watson", relationType: "childhood friends" },
  { name: "Hina Ito", age: 17, gender: "男性", personality: "hot-blooded but often misses the mark", club: "Track Team", rivalWith: "Tsubasa Tanaka", relationType: "rivals" },
  { name: "Tsubasa Tanaka", age: 17, gender: "男性", personality: "cool and results-driven", club: "Track Team", rivalWith: "Hina Ito", relationType: "rivals" },
  { name: "Luna Chandler", age: 17, gender: "女性", personality: "gentle and soothing presence", club: "Gardening Club" },
  { name: "Yu Murata", age: 17, gender: "男性", personality: "sharp-tongued cynic", club: "Literary Club" },
  { name: "Hinata Moore", age: 17, gender: "女性", personality: "energetic cheer-squad captain", club: "Cheer Squad", closeWith: "Sakura Palmer", relationType: "best friends" },
  { name: "Sakura Palmer", age: 17, gender: "女性", personality: "calm, the brains of the group", club: "Cheer Squad", closeWith: "Hinata Moore", relationType: "best friends" },
  { name: "Daichi Cohen", age: 17, gender: "男性", personality: "the quiet, craftsman type", club: "Cooking Club" },
  { name: "Renji Blake", age: 17, gender: "男性", personality: "seems flaky but surprisingly loyal", club: "Film Club" },
  { name: "Riko Sakamoto", age: 17, gender: "女性", personality: "sharp-tongued but looks out for others", club: "Newspaper Club" },
  { name: "Kaito Fuller", age: 17, gender: "男性", personality: "relentlessly upbeat jock", club: "Judo Club" },
  { name: "Yuna Yamada", age: 17, gender: "女性", personality: "calculating but kind at heart", club: "English Club" },
  { name: "Yuto Ota", age: 17, gender: "男性", personality: "impossible to read", club: "No Club", outcast: true },
  { name: "Daisuke Suzuki", age: 17, gender: "男性", personality: "too serious, not very flexible", club: "Kendo Club", rivalWith: "Sho Miyamoto", relationType: "rivals" },
  { name: "Sho Miyamoto", age: 17, gender: "男性", personality: "shrewd and good at working the room", club: "Kendo Club", rivalWith: "Daisuke Suzuki", relationType: "rivals" },
  { name: "Ryota Ishikawa", age: 17, gender: "男性", personality: "few words, matter-of-fact", club: "Chemistry Club" },
  { name: "Sota Nakano", age: 17, gender: "男性", personality: "quick to get fired up, quick to cool off", club: "Track Team" },
  { name: "Naoki Fujita", age: 17, gender: "男性", personality: "kind to everyone but lacks conviction", club: "Volunteer Club", closeWith: "Kenji Murakami", relationType: "childhood friends" },
  { name: "Kenji Murakami", age: 17, gender: "男性", personality: "a stickler for doing the right thing", club: "Volunteer Club", closeWith: "Naoki Fujita", relationType: "childhood friends" },
  { name: "Sota Okamoto", age: 17, gender: "男性", personality: "sarcastic and keeps people at arm's length", club: "Literary Club" },
  { name: "Itsuki Hasegawa", age: 17, gender: "男性", personality: "airheaded and a little clueless", club: "Soccer Team", rivalWith: "Taiga Matsumoto", relationType: "rivals" },
  { name: "Taiga Matsumoto", age: 17, gender: "男性", personality: "fiercely competitive and loud", club: "Soccer Team", rivalWith: "Itsuki Hasegawa", relationType: "rivals" },
  { name: "Misaki Tamura", age: 17, gender: "女性", personality: "cheerful but secretly lonely", club: "Music Club", closeWith: "Hikari Ishii", relationType: "best friends" },
  { name: "Hikari Ishii", age: 17, gender: "女性", personality: "meticulous perfectionist", club: "Marching Band", closeWith: "Misaki Tamura", relationType: "best friends" },
  { name: "Rio Ogawa", age: 17, gender: "女性", personality: "does her own thing, oblivious to the room", club: "Art Club" },
  { name: "Mai Kato", age: 17, gender: "女性", personality: "caring but a bit of a busybody", club: "Cooking Club", rivalWith: "Nana Nishida", relationType: "rivals" },
  { name: "Nana Nishida", age: 17, gender: "女性", personality: "cool and keeps to herself", club: "Photography Club", rivalWith: "Mai Kato", relationType: "rivals" },
  { name: "Anne Matsuda", age: 17, gender: "女性", personality: "optimistic and fun-loving", club: "Dance Team" },
  { name: "Kokomi Harada", age: 17, gender: "女性", personality: "introverted bookworm", club: "Library Committee", closeWith: "Aya Kinoshita", relationType: "childhood friends" },
  { name: "Aya Kinoshita", age: 17, gender: "女性", personality: "warm and takes care of everyone", club: "Tea Ceremony Club", closeWith: "Kokomi Harada", relationType: "childhood friends" },
  { name: "Rena Saito", age: 17, gender: "女性", personality: "gentle, avoids conflict", club: "Gardening Club", rivalWith: "Mao Murata", relationType: "rivals" },
  { name: "Mao Murata", age: 17, gender: "女性", personality: "ambitious and craves the spotlight", club: "Cheer Squad", rivalWith: "Rena Saito", relationType: "rivals" },
  { name: "Runa Miyashita", age: 17, gender: "女性", personality: "strong-willed and fearless", club: "Track Team" },
];

// ルールを「箱」に分割。呼び出しの種類ごとに必要な箱だけを組み合わせてトークンを節約する。
const RULE_BOX = {
  CORE: "**◆このゲームの成立条件(全ルール中の最優先・例外なし)◆** あなたは今、全キャラクター分の真実(誰が本当は何の役職か、占い・霊媒・護衛の本当の結果、公表されていないペア関係)をすべて見た上でセリフを書いている。だが**各キャラクターにとって、その真実は最初から存在しないものとして扱え**。キャラクターが判断や発言の根拠にしてよい情報源は、次の3つだけに限る:①会話ログに実際に書かれている、誰かが口に出した発言・投票・行動、②そのキャラ自身に明示的に与えられた情報(自分の役職、自分の相方、自分自身の能力結果)、③全員が知っている公開ルール(役職構成)。この3つに含まれない情報(他人の本当の役職、他人の本当の能力結果、まだ公表されていないペア関係)は、セリフの文面・推理の理由・投票の根拠・雰囲気の描写・相性コメントのどこにも、直接的にも間接的にも、匂わせる形でも、絶対に反映させない。**これが一度でも破られた瞬間、プレイヤーは「AIは答えを知った上で演技しているだけだ」と気づき、推理ゲームとして成立しなくなる**。判断に迷ったら、必ず「このキャラは、この情報を会話ログのどの発言から知ったのか?」と自問し、具体的な発言を指させない情報は使わない。**役職ごとの個別ルールを、他の役職に類推適用しない(絶対厳守)**:以下の各役職の項目に書かれた固有のルール(例:共有者が自分の相方に絶対投票しない、狂人が対抗COを優先的に担当する、等)は、その役職固有の理由に基づく特別な制約であり、明記されていない他の役職に同じ制約を勝手に当てはめない。「ある役職でこう決められているなら、他の役職でも同じようにした方が安全だろう」という類推・拡大解釈は絶対にしない(役職ごとに事情が異なるため、類推は誤った行動を生む)。各役職の振る舞いは、その役職自身の項目に書かれている内容だけを根拠にする。 ト書きに役職名を書かない。全員同じ反応にしない(異論を1人混ぜる)。**NPCはプレイヤーの発言への反応だけに終始しない(重要)**:毎ターン全員が「プレイヤーの発言を受けて」喋るのではなく、生存NPCのうち誰か1人は、プレイヤーの発言とは直接関係のない新しい話題(自分から見て気になる別人物への疑い、CO、過去の投票行動の蒸し返し等)を自発的に持ち出してよい(教室での自然な会話は、常に直前の発言だけに反応し続けるわけではない)。感情豊かに、断定しない(動揺=黒等の単純化NG)。セリフは短く(1〜2文、40字目安)、長台詞にしない。**質問への回答を新たな怪しい行動として扱わない**(文脈を正しく認識、回答への逆ギレ的な追加詰問もしない)。**プレイヤーの単純な言い間違いには寛容にする(重要・ただし対象は限定・見落としやすい重要ポイント)**:対象は**名前を間違える、言葉の言い回しを間違える、といった内容に実質的な影響のない表面的なミスだけ**である。気づいたNPCがいれば「〇〇のことだよね?」と軽く自然に確認する程度に留め、そこから鬼の首を取ったように追及・非難を展開しない。**これは矛盾の追及を弱めるものでは絶対にない**:投票先・主張・行動が実際に食い違っている場合(例:確定シロだと分かっている人物に投票する、以前の自分の発言と矛盾する主張をする)は、表面的な言い間違いではなく実質的な矛盾なので、通常通り厳しく指摘・追及する(この寛容さの対象外)。**このルールはプレイヤーの表面的な言い間違いにのみ適用され、他のNPCの言動や、内容面での矛盾には一切適用しない(絶対厳守)**:CORE箱に書かれているからといって、他のキャラクターの矛盾追及まで甘くしない。**プレイヤーが「何もしない」を選んだ時の扱い(重要)**:発言・行動をしなかったこと自体を、単独の強い疑いの根拠にしない。発言を強制するような執拗な詰問はしない。一方で、完全に何のリスクもない安全な選択肢にもしない(危機的な場面で複数回連続して沈黙が続けば、他のNPCが軽く気にかける程度の自然な反応をしてよい)。要するに、他の生存者が黙っている時と同程度の扱いにし、プレイヤーだから特別に咎める・特別に見逃す、のどちらにもしない。**疑いは根拠があってこそ**:矛盾・不自然さがない限り理由なく怪しまない(大半は中立〜協力的)。ただし**「毒舌」「完璧主義」「猜疑心が強い」「負けず嫌い」等の性格は他より厳しく指摘してよい**(個性として疑いすぎ回避の対象外)。**プレイヤーも他NPCと全く同じ基準で判断する(絶対厳守)**:矛盾・隙があれば同じ基準・同じ強さで指摘・追及・疑い、特別扱いで無条件信用・除外し続けない。プレイヤーだから疑われにくい、投票されにくい、という展開は絶対にNG。むしろプレイヤーは主役として発言量が多くなりがちなため、矛盾や隙が生まれる機会も他のNPCより多いくらいのつもりで、遠慮なく観察・指摘する。**クラスメイト同士の人間関係を積極的に活かす(重要)**:幼馴染・姉妹・親友は、互いを無条件に信じがちで、相手が疑われると庇う・動揺する描写を自然に混ぜてよい(ただし庇いすぎて村の判断を歪めるほどにはしない)。ライバル同士は、互いの言動に人一倍敏感で、皮肉や対抗心が滲む発言をしてよい。「クラスでなんとなく距離を置かれがち」な人物がいる場合、他人から軽く話を振られにくい・扱いが素っ気ない、といった社会的な空気感は描いてよいが、**それ自体を人狼を疑う根拠には絶対にしない**(理由のない疎外感と、役職への疑いは別物として扱う)。**「確定シロ」「確定クロ」等の断定は、実在する公開情報の出どころを必ず伴う(絶対厳守・見落としやすい重要ポイント)**:誰かを「シロ」「人狼じゃないのは確定」「クロ」のように断定的に語るのは、実際に会話ログ上で占い師・霊媒師が既にCOしてその結果を公表している場合のみ許される。まだ誰も占い・霊媒のCOをしていない・その人物についての結果がまだ公表されていない段階で、根拠となる発言者を挙げられないまま「シロだよね」「人狼じゃないのは確定してる」のように言わせない。もし言うなら、必ず「(占い師の)〇〇さんの結果で」のように、直前までに実際に公表された発言を根拠として名指しできる場合に限る。**シロ/クロの二値だけでなく、具体的な役職名の推測も同じ扱いにする(絶対厳守)**:「〇〇は共有者だったのかな」「〇〇は狩人だった気がする」のように、誰かの具体的な役職名を、本人が公表したことも他者の公開された結果もない状態で口にさせない。役職構成上あり得る可能性として一般論を語るのはよいが(例:「共有者が他にもいたかもね」)、特定の個人名と結びつけて役職名を言い当てる形の発言は、それを裏付ける公開情報(本人のCO、または占い師・霊媒師の結果)を名指しできる場合に限る。**「気が合う」「息が合っている」等の相性の指摘も、根拠なく行わない(絶対厳守・見落としやすい重要ポイント)**:キャラクター紹介で公開されている幼馴染・親友・ライバル等の関係以外で、二人の相性についてNPCに言及させる場合、それは会話ログに実際に残っている具体的な一致(同じ人物に投票した、同じ主張を繰り返した、発言のタイミングが重なった等)を直前の根拠として明示できる場合に限る。実際には投票先が割れている・特に共通点のない相手同士に対して、雰囲気だけで「妙に息が合っている」「気が合いすぎ」のような相性の指摘をさせない(これは、当のキャラ同士が実は裏で役職ペアだったとしても、そのキャラ自身が知り得るはずのない情報を根拠にした発言に見えてしまうため、絶対に避ける)。",
  WOLF_CORNERED: "**人狼は、自分が人狼であることを完全に自覚した上で、意図的に嘘をつき演技している(絶対厳守)**。狂人のような「自分の正体についての思い込み・洗脳」は人狼には一切ない。「本当は自分も占い師だと思っていた」のような、自己欺瞞・記憶の混濁を匂わせる発言は人狼に絶対にさせない(それは狂人だけに許された特殊な設定である)。人狼・狂人は無償の自白をしない。言い訳・偽CO・疑い誘導で粘り、劣勢時ほど能動的に動く(1日1手)。**受け身にならない**:信頼できる情報源への偽CO・議論の主導権奪取・疑いのすり替えなど、工作を毎日最低1回試みる(相槌や様子見だけで終えない)。**対抗COは早いほど有効(絶対厳守)**:本物が実績・信頼を積んでからの後出し対抗は説得力が薄い。**早い段階で検討し**、疑われてから慌てて対抗しない。**弁明タイムは沈黙する場ではない(絶対厳守)**:候補者以外も割り込める。村の信頼が固まりそうな瞬間に**その場で対抗COや疑義を割り込ませる**方が、翌日の後出しより効果的。**対抗COはほぼ義務(最重要・絶対厳守)**:占い師・霊媒師・狩人・共有者のCOに2ターン以内に誰も対抗しなければ、生存する人狼・狂人の少なくとも1人は高確率で対抗COする。単独COを信じさせ切るリスクの方が、対抗して疑われるリスクより大きい。特に序盤(1〜2日目)の占い師COには積極的に偽対抗をぶつけ混乱を作る。**対抗COの実行役は狂人を優先する(重要・絶対厳守)**:生存する狂人がいる場合、単独の役職への対抗CO(偽の占い師・霊媒師・狩人を名乗る等)は狂人に行わせ、人狼自身は直接この種の偽COを名乗らない。理由:狂人は本気でその役職だと思い込んでいるため、後から矛盾や嘘が発覚しても「狂人だった」で説明がつき、人狼の存在には直結しない。一方、人狼自身が偽COすると、そのCO自体の粗を突かれて芋づる式に人狼だと疑われるリスクが大きい。人狼が対抗の役割を担うのは、**生存する狂人がもう一人もいない場合に限る**。人狼自身が動く場合も、具体的な役職を騙って名乗り出るより、他者への疑いの提起・話題のすり替え・議論の主導権奪取など、直接の偽COより発覚時のリスクが低い工作を優先する。**典型的な人狼っぽい言動を避ける(絶対厳守)**:①名指しされた時の過剰な動揺・防御②はぐらかし・質問への非回答③過去発言との矛盾④不自然に歯切れが悪い/饒舌な言い訳⑤疑いを急かす・話題を急いで変える、を取らせない。村人と同じ自然な口調・態度で参加し、疑われても村人と同程度の反応に留める。工作も常套手段めかさず性格に沿って自然に行う。**発言頻度・発言量は役職と一切連動させない(絶対厳守)**:「人狼だから控えめに」といった調整をしない。誰がどれだけ話すかは性格設定と場の流れのみで決め、口数の少なさと役職(人狼に限らずどの役職も)を結びつけない。**進行段階で優先順位を切り替える(重要)**:①序盤〜中盤は正体を隠すことを最優先し、対立の決着がつかない場面では様子見程度に留める。②終盤(生存者が減り村側と同数に近い、またはあと1〜2人処刑で数的優位に届く)は、**多少強引・不自然な理由付けでも村側である可能性が高い方への投票を優先する**(バレるリスクより数的優位を逃すリスクの方が大きい)。**人狼・狂人が互いに投票するのは正体隠しの正当な戦略であり、避けるべき行動ではない(重要)**:共有者と違い、人狼・狂人が相方に投票することには正体を疑われにくくする実際の効果がある。相方だから投票しない、という一貫したパターンを機械的に守らせない(そのパターン自体が、後から振り返った時に『この2人は一度もお互いに投票していない→ペアでは』と見抜かれる新たな手がかりになってしまう)。相方に投票するかどうかは、その時々の状況判断・性格に委ねてよい。",
  MADMAN: "**狂人は人狼陣営に洗脳されており、自分の正体について思い込みを持つ(内容はその都度個別指定。開始時は村人・占い師・霊媒師・狩人・共有者のいずれか。「人狼」だという思い込みは、生存者が少ない時・本物の人狼と決選投票で対決した時にのみ後から切り替わる特別枠で、最初は発生しない)。思い込みは絶対に揺るがず、嘘の自覚は一切ない。心の底からその役職(または人狼)のつもりで堂々と振る舞い、処刑されそうでも『実は狂人』という告白は起こらない。信じている役職に応じて開き直り方も変わる(占い師のつもりなら占い師らしく、人狼のつもりなら人狼らしく)。思い込んだ役職の視点で動くが、結果的に人狼陣営を利する。受け身にならず、疑いのすり替え・議論の主導権奪取などの工作を1日最低1回試みる(表向きの優しい性格は工作の隠れ蓑であり、行動しない言い訳にしない)。**対抗COの義務(狂人が優先的に担当する・重要)**:占い師・霊媒師・狩人・共有者の単独COに2ターン以内に誰も対抗しなければ、生存する人狼・狂人の少なくとも1人は高確率で対抗COする(狂人は自分の思い込みに沿った対抗になる)。**この役割は人狼よりも狂人が担う方が安全である**:狂人は本気で思い込んでいるため、後から矛盾が発覚しても「狂人だった」で片付き、本物の人狼の正体には直結しない。生存する狂人がいる限り、この対抗COは狂人が積極的に引き受けるべき役割だと心得て行動する。序盤の占い師COには特に積極的に偽対抗をぶつける。**捏造する占い・霊媒・護衛の対象と結果は、秘密の真実データを状況に関わらず一切参照しない(絶対厳守・例外なし)**:狂人が偽の占い師・霊媒師・狩人としてCOする際、名乗る対象や結果は、コード側が保持する本物の結果ログ(npcSeerLog・npcMediumLog・npcGuardLog等の真実のデータ)を、公開されているかどうかに関わらず一切参照してはならない。参照してよいのは「会話ログ上で誰かが実際に発言した内容」だけである(例:先にCOした人が「〇〇を占って人狼だった」と発言済みなら、それに対抗して「私も〇〇を占ったが白だった」と、既に発言された内容と食い違う主張をするのは、あくまで発言=公開情報を参照しているだけなので問題ない)。逆に、まだ誰も何も発言していない段階で、狂人の捏造した対象や結果が真実のデータと一致・対立するのは、本人が知り得るはずのない秘密情報を使ったことになるため、絶対に起きてはならない。**自分の本当の相方(狂人)には絶対に投票しない(絶対厳守)**:狂人は相方の狂人が同じ人狼陣営の仲間だとゲーム開始時から確実に知っている。相方に投票することは、自陣営の頭数を自ら減らすだけの損な手であり、論理的にあり得ない。**弁明タイムは沈黙する場ではない**:候補者以外も割り込んで対抗COや疑義を挟める。**数的優位の逆算**:ゲームが続く限り本物の人狼は最低1人生存。狂人は自分と相方の生死は分かるが本物の人狼の生死は分からないため、生存者数・確定シロの数から人狼側の残存勢力を推測し、有利な局面ではより積極的に動く。**本物の人狼が全滅すると即座に村人陣営の勝利になる(狂人・寝返ったジョーカーの生存に関わらず、絶対厳守)**。狂人の最優先事項は本物の人狼を生かし続けること(誰か分からないため直接は守れないが、村の追及の勢いを削ぐ・議論をかき乱す・怪しまれている人物の処刑をためらわせる、といった間接的な行動で生存確率を上げる)。**「人狼」だと思い込んでいる狂人の決選投票行動(重要)**:自分が候補者でなければ、2人の候補のうち、**そのキャラ自身の主観的な印象・好悪・場の流れだけを根拠に**「自分の中でより疑わしくない」と感じる方に投票する。**この判断は、本物の人狼が誰かという裏の真実情報を一切参照しない(絶対厳守)**:自分を人狼だと思い込んでいるがゆえの無意識の仲間庇い心理として振る舞ってよいが、実際にどちらが本物の人狼かを言い当てるための判断ではなく、あくまで性格・好悪に基づく主観的な選択にとどめる。理由付けは自然な言い方にし、あからさまに庇っているように見せない。",
  SHARER: "共有者はペアで正体を知り、確定シロから容疑者範囲を演繹して提示する。**対抗COが出にくい役職であることも活用してよい**:占い師・霊媒師・狩人は1人しかいないため、人狼・狂人が同じ役職を騙って対抗COできてしまうが、共有者は本物のペア2人が同時に一致して認め合わない限り成立しないため、単独COでも比較的信頼されやすい(人狼側が対抗するには、もう1人も口裏を合わせる必要があり難易度が高い)。**自分の本当の相方には絶対に投票しない(絶対厳守・見落としやすい重要ポイント)**:共有者は相方が本物の非人狼側だとゲーム開始時から確実に知っている。これは疑いではなく、**そのキャラ自身に明示的に与えられた正当な情報(自分の役職・自分の相方の正体)としての確定事実**であり、他人の役職や占い結果のような、本来知り得ないはずの内部真実データを根拠にしているのとは全く異なる。**この「自分自身に与えられた正当な情報」の範囲は、以下の4つに厳密に限定される(絶対厳守)**:①自分の役職と自分の相方の正体(共有者・人狼・狂人のペア関係)、②(狂人の場合)自分が信じ込んでいる役職、③(ジョーカーの場合)自分の能力継承の状況、④本物の人狼が両方死んでゲームが終了したかどうか。これ以外(他人の本当の役職、まだ公表されていない占い・霊媒結果、自分と無関係な他のペアの正体等)は一切含まれず、それらを根拠にすることは絶対にない。したがって、まだ相方だと公表していない段階であっても、投票先に自分の本当の相方を選ぶことは論理的にあり得ない(何かの根拠が積み重なって疑わしく見えたとしても、この正当な確定事実の方が常に優先される)。**相互確認は一度成立したら永久に覆らない(絶対厳守・見落としやすい重要ポイント)**:共有者ペアの両方が生きている状態で互いを共有者だと認め合った場合、その時点で両者とも確定シロとして扱われる。この確定は、その後どちらかが死亡しても一切変わらない。生存している側の共有者を「相方が死んで証明できなくなった」「証明する手段がなくなった」のように扱い、疑いを向けたり投票対象にしたりすることは絶対にしない(相互確認という証明は既に完了しており、後から相方が死んでも過去の事実が消えることはない)。疑ってよいのは、相互確認が一度も成立していない(例:既に死亡した人物を一方的に「自分の相方だった」と主張しているだけで、本人からの確認が取れていない)ケースだけである。",
  HUNTER: "狩人は正体を隠す。処刑寸前のみリスク覚悟でCOする。",
  JOKER: "ジョーカーは占い師・霊媒師・狩人のいずれかが死んだ時に覚醒し、能力を継承するか選べる。**継承タイミングは役職・死に方で異なる**:占い師が処刑された場合、**継承した瞬間すぐに誰かを占える**(COと同時に結果も伝えられる)。**占い師が夜に人狼に殺された場合は、新たに占うのではなく、死んだ本人がその晩に行った占いの記憶(対象・結果)をそのまま継承時に知る**。**霊媒師は死んだ晩から即座に使える。占い師の継承とは性質が違う点に注意(絶対厳守)**:占い師は「誰を占うか」を本人の主観で選ぶため、他人の判断による過去の結果を丸ごと引き継ぐのは不自然。しかし霊媒師は「処刑された人が人狼か(あるいはジョーカーか)を見る」だけで、誰が見ても対象・結果は変わらない機械的な能力である。したがって、**ジョーカーが継承した時点で、まだ誰にも公表されていない直近の処刑者についての結果を、継承したジョーカー自身が視た結果として扱ってよい**(本物の霊媒師が同じ夜に死んでいて未公表のまま結果だけ残っている場合も含む)。それより前の、既に別の機会に処理済みの処刑者についての結果までは知らない。狩人は処刑ならその晩から、夜に殺された場合は護衛タイミングを過ぎているため次の晩から。**能力は一度きりしか使えない(絶対厳守・見落としやすい重要ポイント)**:占い師・霊媒師・狩人、どの能力を継承した場合でも、**実際に使えるのは合計1回だけ**(占い師なら1人を占う、霊媒師なら1回分の結果を視る、狩人なら1回護衛する)。一度使ったら、その後は二度とその能力を使えない(「今夜も視る」「また占う」のように、まだ使えるかのような発言を継承済み・使用済みのジョーカーに絶対にさせない)。使用済みの場合、それ以降にできるのは「過去に1回だけ得た結果を、まだ公表していなければいつ公表するか」を考えることだけである。**能力使用後は、村のために名乗り出ることを積極的に検討する**:継承役職としてCOし結果を伝えれば新たな情報源になれる。ただし正体露見のリスクもあるため他の役職者同様にタイミングを判断し、黙って抱え込み続けない。**特に霊媒師の力は報告を先延ばしにしすぎない(重要)**:結果は時間が経つほど価値が落ちるため、継承直後〜翌日程度の早いタイミングで共有を優先する。**論理的な推論(絶対厳守・見落としやすい重要ポイント)**:能力の継承は「占い師・霊媒師・狩人の誰かが死んだ」という事実がなければ絶対に起こらない。つまり**ジョーカーは、能力を継承した(あるいは継承するかどうかの選択を提示された)時点で、「役職者が1人死んだ」ことを100%の確信を持って知っている**(これは推測ではなく確定事実)。継承した役職名(占い師/霊媒師/狩人)も同時に分かる。この確信を前提に会話・推理を進めてよい(ただし正体自体は隠したまま、確信の出どころをぼかして発言することは可能)。「誰かが役職者だったかどうか分からない」という態度は、継承後のジョーカーには絶対に取らせない。**ジョーカーという役職の存在、および死んだ役職者から能力を継承できるというルールそのものは、この人狼ゲームの公開されたルールの一部であり、全員(村人・NPC問わず)が最初から知っている常識である(絶対厳守・見落としやすい重要ポイント)**:誰かがジョーカーの継承を主張した際、「そんな役職(ルール)聞いたことがない」「そんな能力があるなんて知らなかった」のように、ルールの存在自体を初耳・疑わしいものとして扱わせない。疑ってよいのはあくまで「本当にこの人物が継承者本人なのか」という個人の正体の真偽だけであり、それ以外の観点(過去の占い/霊媒結果と矛盾する、継承のタイミングが不自然、等)から矛盾を指摘するのは問題ない。",
  VOTE_SPREAD: "投票は満場一致にしない(2〜3人は別候補)。個人の主観的な好悪・印象は投票理由にしてよいが、根拠のない相性・因縁(「なんとなく馬が合わない」以上の具体的な関係性の断定)を新たに作り出さない。",
  DEFENSE_PLEA: "処刑寸前の役職者に、無抵抗・沈黙のまま処刑を受け入れさせない(絶対厳守)。生存が最優先で、必ず何らかの能動的な抵抗を試みる。正体をはっきり明かすか、ぼかしたまま訴えるかはキャラクター自身のリスク判断に委ねてよい(例えば狩人は、名乗れば以後人狼に狙われやすくなるため、あえて正体をぼかす判断も自然)。COする場合、結果を何も持っていなくても、COすること自体に価値がある(役職者と分かれば狩人に守られる可能性・生存すれば翌晩以降能力を使える・自分が確定シロ側に加われば残る容疑者を絞り込みやすくなり、間接的に人狼を追い詰める助けになる)。「情報がないから」「まだタイミングじゃないから」といって何もせず沈黙したまま処刑を受け入れさせない。一般論の反論・疑いの転嫁だけでもよいので、必ず能動的な抵抗を選ばせる。",
  STRATEGY_BASICS: "基本戦略知識を判断に使う:①対抗が出ないまま単独COが通れば、ある程度信頼してよいが、それだけで確定扱いはしない(本物が死亡・未名乗りの可能性は常に残る)②占い・霊媒結果が一致すれば根拠として積み重なるが、後出しが先の結果に便乗しているだけの可能性もあるため、これ単独でも確定扱いはしない③COされた白判定には根拠なく投票・疑いを向けない(ただし絶対に人狼側ではないという意味ではない)④黙っていること自体は怪しくないが、危機的局面で一言も発しない役職候補者は不自然⑤投票が割れた時は少数派意見にも耳を傾ける価値がある⑥**矛盾への疑いは発言者を問わず平等に適用する**:狂人の自信満々な思い込みと人狼の計算した嘘は村側には区別できないため、公表された情報・記録と矛盾する主張は、口調に関わらず同じ強さで疑うべきで、堂々とした態度だけで矛盾を見逃さない。",
};
function buildRules(...categories) {
  return "【運用ルール】\n" + categories.map((c) => `- ${RULE_BOX[c]}`).join("\n");
}

// 生存している役職に応じて、実際に意味のある箱だけを動的に選ぶ
function relevantBoxesForAliveRoles(alivePlayersList) {
  const roles = new Set(alivePlayersList.map((p) => p.role));
  const boxes = ["CORE", "STRATEGY_BASICS"]; // CORE・戦略知識は常に必要
  if (roles.has("人狼") || roles.has("狂人")) boxes.push("WOLF_CORNERED");
  if (roles.has("狂人")) boxes.push("MADMAN");
  if (roles.has("共有者")) boxes.push("SHARER");
  if (roles.has("狩人")) boxes.push("HUNTER");
  if (roles.has("ジョーカー")) boxes.push("JOKER");
  return boxes;
}

const ROLE_SET_11 = ["人狼", "人狼", "狂人", "狂人", "占い師", "霊媒師", "狩人", "共有者", "共有者", "ジョーカー", "村人"];

const PHASES = ["discussion", "vote_round1", "defense", "vote_final", "night", "morning"];

const TAROT_CARDS = ["愚者", "魔術師", "女教皇", "女帝", "皇帝", "教皇", "恋人", "戦車", "力", "隠者", "運命の輪", "正義", "吊るされた男", "死神", "節制", "悪魔", "塔", "星", "月", "太陽", "審判", "世界"];

// ============================================================
// Claude API 呼び出し
// ============================================================

// トークン使用量の概算集計(モジュールレベル、コンポーネント外で保持)
let tokenTotals = { input: 0, output: 0, calls: 0, cacheRead: 0, cacheWrite: 0 };

// 直近の通信エラーの内容(デバッグログ・画面表示用)
let lastApiError = "";
let lastStopReason = null; // 直近の応答がmax_tokensで打ち切られたかどうかの記録(尻切れJSON対策用)

// cacheablePrefix を渡すと、システムプロンプトの先頭部分(ルール文など、呼び出しをまたいでほぼ変わらない部分)を
// Anthropic APIのプロンプトキャッシュ対象にする。同じ内容が短時間内に繰り返し送られると、
// 2回目以降はその部分の入力トークンが約1/10の料金になる(キャッシュ書き込み時は逆にやや割高になる)。
// 挙動やAIの応答内容には一切影響しない、純粋なコスト最適化。
// ============================================================
// ★環境判定(このファイル1本を、Claudeのアーティファクト上でのテストと本番デプロイの両方に使うための仕組み)
// 本番(Vercel)では src/main.jsx が起動時に window.__JINRO_HAS_BACKEND__ = true を立てる。
// Claudeのアーティファクトにこのファイルをそのままアップして動かす場合、このフラグが無いため
// HAS_BACKEND=false の「ライトモード」になり、バックエンド依存の機能(課金・デバッグログ保存・分身NPC・管理画面)は
// 自動的に無効化され、Claude APIはアーティファクト環境が認証を肩代わりする直接呼び出しに切り替わる。
// ゲーム本体のロジック・ルール文は両環境で完全に同一。
// ============================================================
const HAS_BACKEND = typeof window !== "undefined" && window.__JINRO_HAS_BACKEND__ === true;
// モデルは環境で決め打ちにする(切り替えではなく、それぞれの経路で使えると分かっているものを使う)。
// 本番(自前のAPIキー経由)は claude-sonnet-5。
// アーティファクト経由の直接呼び出しは、この経路自体が claude-sonnet-4-6 を前提にしているため、それに合わせる。
const MODEL = HAS_BACKEND ? "claude-sonnet-5" : "claude-sonnet-4-6";

async function callClaude(systemPrompt, userPrompt, maxTokens = 1200, retries = 2, cacheablePrefix = null) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    let status = 0;
    try {
      // cacheablePrefixは文字列または文字列配列。配列なら要素ごとに独立したキャッシュブロックにする
      // (例:[固定ルール, ゲーム固定情報] → 途中の要素まで一致すればその部分だけでもキャッシュが効く)。
      // TTLは1時間:プレイヤーがターン間で数分考えても、5分でキャッシュが切れて高い「書き込み」を
      // やり直す事態を避ける(書き込み単価は2倍になるが、1ゲーム中はほぼ全て安価な「読み込み」で済む)。
      const prefixBlocks = cacheablePrefix
        ? (Array.isArray(cacheablePrefix) ? cacheablePrefix : [cacheablePrefix])
            .filter((t) => typeof t === "string" && t.trim().length > 0)
            .map((t) => ({ type: "text", text: t, cache_control: { type: "ephemeral", ttl: "1h" } }))
        : [];
      const systemField = prefixBlocks.length > 0
        ? [...prefixBlocks, { type: "text", text: systemPrompt }]
        : systemPrompt;
      const endpoint = HAS_BACKEND ? "/api/claude" : "https://api.anthropic.com/v1/messages";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: maxTokens,
          thinking: { type: "disabled" },
          system: systemField,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });
      status = res.status;
      if (!res.ok) {
        let detail = "";
        try { detail = (await res.text()).slice(0, 200); } catch (_) {}
        throw new Error(`HTTP ${res.status} ${detail}`);
      }
      const resClone = res.clone();
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        let raw = "";
        try { raw = (await resClone.text()).slice(0, 150); } catch (_) {}
        throw new Error(`応答が正常なJSONではありません(status ${res.status}): ${raw || "本文取得不可"}`);
      }
      if (data.usage) {
        tokenTotals.input += data.usage.input_tokens || 0;
        tokenTotals.output += data.usage.output_tokens || 0;
        tokenTotals.calls += 1;
        tokenTotals.cacheRead = (tokenTotals.cacheRead || 0) + (data.usage.cache_read_input_tokens || 0);
        tokenTotals.cacheWrite = (tokenTotals.cacheWrite || 0) + (data.usage.cache_creation_input_tokens || 0);
      }
      // stop_reasonが"max_tokens"の場合、AIの応答が指定した上限で強制的に打ち切られている(=途中でJSONが切れている可能性が高い)。
      // このケースを呼び出し元(callClaudeAutoRetry)が検知できるよう記録しておく。
      lastStopReason = data.stop_reason || null;
      const text = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("\n");
      if (!text) {
        // 診断のため、なぜ空になったのかの手がかりを残す(stop_reason、contentの構造、usage)
        const contentTypes = (data.content || []).map((b) => b.type).join(",") || "なし";
        throw new Error(`空の応答(stop_reason: ${data.stop_reason || "不明"}, content種別: ${contentTypes}, 出力トークン: ${data.usage?.output_tokens ?? "不明"})`);
      }
      return text;
    } catch (e) {
      lastErr = e;
      lastApiError = String(e?.message || e);
      if (attempt < retries) {
        // レート制限(429)・混雑(529)は長めに待つ。それ以外は指数的に待つ。
        const base = (status === 429 || status === 529) ? 4000 : 600;
        await new Promise((r) => setTimeout(r, base * Math.pow(1.8, attempt)));
      }
    }
  }
  throw lastErr;
}

function parseJSON(text) {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch (e2) {
        return null;
      }
    }
    return null;
  }
}

// callClaude(通信エラー時は内部で3回リトライ済み)を呼んだ上で、
// ①応答が空だった ②JSONとして解析できなかった 場合も、同じリクエストをもう1回だけ自動でやり直す。
// これでも失敗した場合のみ呼び出し元にエラーを投げる(ここまで来たら、ユーザーに再操作してもらう)。
async function callClaudeAutoRetry(systemPrompt, userPrompt, maxTokens, extraAttempts = 1, cacheablePrefix = null) {
  let lastErr;
  let currentMaxTokens = maxTokens;
  for (let attempt = 0; attempt <= extraAttempts; attempt++) {
    try {
      // callClaude自体の内部リトライは1回(=最大2回試行)に抑える。ここでの外側のリトライと掛け算になり、
      // 無駄打ち(特にmax_tokens到達による尻切れの空振り)が何度も積み重なるのを防ぐため。
      const raw = await callClaude(systemPrompt, userPrompt, currentMaxTokens, 1, cacheablePrefix);
      const parsed = parseJSON(raw);
      if (parsed) return parsed;
      // JSONとして解析できなかった場合、応答がmax_tokensで打ち切られていた(尻切れ)なら、
      // 同じ上限のままもう一度試しても同じ結果になりやすいため、次の試行では上限を引き上げる。
      if (lastStopReason === "max_tokens") {
        currentMaxTokens = Math.min(Math.round(currentMaxTokens * 1.8), 8000);
      }
      lastErr = new Error("応答をJSONとして解析できませんでした");
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

// ネタバレ語チェック(ト書きへの役職混入を機械的に検出して除去)
const ROLE_WORDS = ["人狼", "狂人", "占い師", "霊媒師", "狩人", "ジョーカー", "共有者"];
function sanitizeStageDirections(text) {
  // 括弧内のト書きに役職名+「らしく」「として」等が付くパターンを検出したら丸ごと除去
  return text.replace(/[(（][^()（）]*[)）]/g, (match) => {
    for (const w of ROLE_WORDS) {
      if (match.includes(w) && /(らしく|として|側なので|側として|役職者として)/.test(match)) {
        return "";
      }
    }
    return match;
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function weightedPick(weights) {
  const entries = Object.entries(weights).filter(([, w]) => w > 0);
  if (entries.length === 0) return null;
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [name, w] of entries) {
    r -= w;
    if (r <= 0) return name;
  }
  return entries[entries.length - 1][0];
}

// 相性マップ生成(双子・幼馴染・部活・不仲タグから)
function buildCompatMap(players) {
  const map = {};
  players.forEach((a) => {
    const likes = [];
    const dislikes = [];
    let relationLabel = null; // 例:「高橋茜と姉妹」「小林陽菜と幼馴染」「宮本翔とライバル」
    players.forEach((b) => {
      if (a.name === b.name) return;
      if (a.closeWith === b.name || b.closeWith === a.name) {
        likes.push(b.name);
        const type = a.relationType || b.relationType || "仲良し";
        relationLabel = `${b.name}と${type}`;
      }
      if (a.rivalWith === b.name || b.rivalWith === a.name) {
        dislikes.push(b.name);
        const type = a.relationType || b.relationType || "ライバル";
        relationLabel = `${b.name}と${type}`;
      }
    });
    map[a.name] = { likes, dislikes, relationLabel, outcast: !!a.outcast };
  });
  return map;
}

// 各NPCのプレイヤーへの初期好感度をランダムに割り振る(0〜100、ばらつきを出すため極端な値も混ぜる)
function buildInitialAffinity(npcNames) {
  const map = {};
  npcNames.forEach((name) => {
    const roll = Math.random();
    let value;
    if (roll < 0.15) value = Math.floor(Math.random() * 20) + 5; // 元々かなり低い(5〜24)
    else if (roll < 0.3) value = Math.floor(Math.random() * 15) + 80; // 元々かなり高い(80〜94)
    else value = Math.floor(Math.random() * 30) + 40; // 普通(40〜69)
    map[name] = value;
  });
  return map;
}

function affinityEmoji(value) {
  if (value >= 85) return "💕";
  if (value >= 65) return "😊";
  if (value >= 40) return "😐";
  if (value >= 20) return "😒";
  return "😠";
}

// 裏切り確率テーブル
function defectionProbability(day) {
  const table = { 1: 0.35, 2: 0.5, 3: 0.7, 4: 0.8 };
  return table[day] ?? 1.0;
}

// ジョーカーの自然な覚醒確率(役職者の死とは無関係、1日目の夜から毎晩判定する)
function jokerSpontaneousAwakeningProbability(day) {
  const table = { 1: 0.2, 2: 0.3, 3: 0.4, 4: 0.5 };
  return table[day] ?? 0.6;
}

// ============================================================
// メインコンポーネント
// ============================================================

// 下書きを裏側で自己チェック・修正する(プレイヤーには最終結果のみ見える)
async function selfCheckAndFix(draftLines, activeBoxes, contextNote, groundTruth = "") {
  const draftText = JSON.stringify(draftLines);
  const system = `あなたは人狼ゲームのセリフを校閲するチェッカーです。以下のルールに違反している箇所だけを修正し、違反がなければそのまま返してください。
${groundTruth ? `以下はこのゲームの内部真実データです。校閲で文章を修正する際、**これらの事実(占い結果・護衛履歴・ペア関係・CO状況等)と矛盾する内容を新たに書き加えたり、既存の正しい記述を誤った内容に書き換えたりしないこと(絶対厳守)**。修正はあくまで表現・スタイルの範囲に留める。\n${groundTruth}` : ""}
特に確認すること:①ト書きに役職名が漏れていないか ②全員が同じ反応で温度差がないか ③断定的すぎる感情描写になっていないか
出力は必ず修正後の同じJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...]}`;
  const userPrompt = `文脈: ${contextNote}\n\n下書き:\n${draftText}\n\n問題があれば直し、なければそのまま返してください。`;
  try {
    // ルール本文はキャッシュ対象のプレフィックスとして渡す(以前は毎回通常入力で送っていた)
    const parsed = await callClaudeAutoRetry(system, userPrompt, 700, 1, buildRules(...activeBoxes));
    return parsed?.lines || draftLines;
  } catch (e) {
    return draftLines; // チェック失敗時は下書きをそのまま採用(プレイヤーを止めない)
  }
}


// ★課金機能を一時的に無効化中。再開する時はこれをtrueに戻すだけでよい
// (startGame内のクレジット消費チェックも別途コメントアウトしてあるので、そちらも一緒に戻すこと)
const CREDIT_SYSTEM_SWITCH = false; // ★課金を有効にする時はここをtrueにする(HAS_BACKENDが無い環境では自動的に無効のまま)
const CREDIT_SYSTEM_ENABLED = HAS_BACKEND && CREDIT_SYSTEM_SWITCH;
// 1日目が終わり、2日目に進む前(クレジット不足時)に表示する煽り文章。
const DAY1_END_TEASER_TEXT = "1日目が終わりました。まだ、誰の言葉も完全には信じられていません。占い師を騙る者、狩人のまま沈黙を守る者、そして本当に牙を隠している人狼——2日目は、疑いがようやく具体的な確信に変わっていく夜です。ここで教室を後にするには、あまりに惜しい。";

export default function JinroGame() {
  const [phase, setPhase] = useState("setup");
  const [day, setDay] = useState(1);
  const [players, setPlayers] = useState([]);
  const [compatMap, setCompatMap] = useState({});
  const [npcAffinity, setNpcAffinity] = useState({}); // {name: 0-100} 各NPCのプレイヤーへの好感度(初期値にばらつきあり)
  const [roleClaims, setRoleClaims] = useState({}); // {name: {role, sinceDay}} 誰が何をCO(自称)しているかの明示的なステータス(発言内容から都度AIに抽出させて記録する)
  const [log, setLog] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("男性");
  const [npcMaleCount, setNpcMaleCount] = useState(5); // NPC10人中の男性人数(残りは女性)。デフォルト5:5
  const [region, setRegion] = useState("ja"); // "ja"(日本語圏) | "en"(英語圏)。キャストと会話の言語を切り替える(UI自体は常に日本語のまま)
  const [beginnerMode, setBeginnerMode] = useState(false); // 初心者モード:プレイヤーへの疑いを少し手加減し、生存中のNPC1人がたまに解説・ヒントを添える
  const [guideNpcName, setGuideNpcName] = useState(null); // 初心者モードの案内役NPC名(死亡したらこの役割も自然に終わる。特別扱いはしない)
  const [exchangeStudents, setExchangeStudents] = useState([]); // 今回のゲームで「留学生」扱いになっている分身NPCの名前一覧(元の地域と今回の地域が違う場合)
  const [nameInput, setNameInput] = useState("");
  const [voteRound1Tally, setVoteRound1Tally] = useState(null);
  const [discussionTurns, setDiscussionTurns] = useState(0);

  // ============================================================
  // クレジット(課金)システム(スタンドアロン版のみ)。
  // 端末ごとの簡易ID(ログイン不要)でクレジット残高をサーバー側(Redis)に持たせ、
  // 1プレイにつき1クレジット消費する。/api/create-checkout・/api/consume-credit・/api/check-credits と連動する。
  // ============================================================
  const [deviceId, setDeviceId] = useState("");
  const [credits, setCredits] = useState(null); // nullは未取得(確認中)
  const [creditsLoading, setCreditsLoading] = useState(true);
  const [purchaseNotice, setPurchaseNotice] = useState(null); // "success" | "cancel" | null
  const [insufficientCredits, setInsufficientCredits] = useState(false); // 残高不足でゲーム開始をブロックしている状態
  // 1日目終了時点で2日目に進めず足止めされている状態。値は保留中の勝敗("人狼陣営"|null)。nullは「まだ勝敗つかず・通常継続」を表す。
  const [pendingDayAdvanceWin, setPendingDayAdvanceWin] = useState(undefined); // undefined = 足止め中ではない
  const [isAdminMode, setIsAdminMode] = useState(false); // URLに ?admin=1 が付いている時だけtrue(開発者専用)
  const [adminSecretInput, setAdminSecretInput] = useState("");
  const [showDebugLogViewer, setShowDebugLogViewer] = useState(false);
  const [debugLogList, setDebugLogList] = useState([]);
  const [showNpcCandidateViewer, setShowNpcCandidateViewer] = useState(false);
  const [npcCandidateList, setNpcCandidateList] = useState([]);
  const [showCostStats, setShowCostStats] = useState(false);
  const [costStats, setCostStats] = useState(null);
  const [costStatsLoading, setCostStatsLoading] = useState(false);
  const [costStatsError, setCostStatsError] = useState(null);

  useEffect(() => {
    // 端末ID(本番でのクレジット・分身NPCの紐付け用)。アーティファクト等 localStorage が使えない環境でも起動が止まらないよう保護する。
    let id = null;
    try { id = localStorage.getItem("jinro_device_id"); } catch (e) {}
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
      try { localStorage.setItem("jinro_device_id", id); } catch (e) {}
    }
    setDeviceId(id);

    // Stripe決済から戻ってきた場合の通知(URLに?purchase=success/cancelが付く)
    const params = new URLSearchParams(window.location.search);
    const purchase = params.get("purchase");
    if (purchase === "success" || purchase === "cancel") {
      setPurchaseNotice(purchase);
      window.history.replaceState({}, "", window.location.pathname);
    }
    // 開発者用パネル(URLに ?admin=1 を付けた時だけ表示。URLは書き換えずそのままにしておく)
    if (HAS_BACKEND && params.get("admin") === "1") {
      setIsAdminMode(true);
    }

    if (!HAS_BACKEND) {
      // ライトモード:バックエンドが無いので残高確認は行わない
      setCredits(0);
      setCreditsLoading(false);
    } else {
      (async () => {
        try {
          const res = await fetch(`/api/check-credits?deviceId=${encodeURIComponent(id)}`);
          const data = await res.json();
          setCredits(typeof data.credits === "number" ? data.credits : 0);
        } catch (e) {
          setCredits(0);
        } finally {
          setCreditsLoading(false);
        }
      })();
    }
  }, []);

  async function refreshCredits() {
    if (!deviceId) return;
    try {
      const res = await fetch(`/api/check-credits?deviceId=${encodeURIComponent(deviceId)}`);
      const data = await res.json();
      setCredits(typeof data.credits === "number" ? data.credits : 0);
    } catch (e) {
      // 取得失敗時は既存の表示のままにしておく
    }
  }

  async function startPurchase() {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        addLog([{ type: "system", text: `決済ページの作成に失敗しました。(${data.error || "原因不明"})` }]);
      }
    } catch (e) {
      addLog([{ type: "system", text: "決済ページの作成に失敗しました。通信環境を確認してください。" }]);
    }
  }

  // クレジットを1消費する。成功すればtrue、残高不足等で失敗すればfalseを返す。
  async function tryConsumeCredit() {
    try {
      const res = await fetch("/api/consume-credit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      });
      if (res.status === 402) {
        setCredits(0);
        setInsufficientCredits(true);
        return false;
      }
      if (!res.ok) {
        // サーバー側の一時的な不調時は、プレイヤーを止めないためゲーム続行を優先する(fail-open)
        return true;
      }
      const data = await res.json();
      setCredits(typeof data.credits === "number" ? data.credits : 0);
      return true;
    } catch (e) {
      // 通信エラー時も同様にfail-openとする
      return true;
    }
  }

  // day1_paywall画面の「2日目に進む」ボタンから呼ばれる。クレジットを確認し、足りていれば
  // 1日目終了時に保留しておいた勝敗状況(pendingDayAdvanceWin)をもとに、そのまま2日目へ進める。
  async function continueAfterDay1Purchase() {
    const ok = await tryConsumeCredit();
    if (!ok) return; // 依然として不足。画面はそのまま(購入ボタンを再度促す)
    const heldWin = pendingDayAdvanceWin;
    setPendingDayAdvanceWin(undefined);
    setDay((d) => d + 1);
    setPhase("discussion");
    setDiscussionTurns(0);
    setTurnLabel(1);
    const wolfSide = players.filter((p) => p.alive && (p.role === "人狼" || p.role === "狂人")).map((p) => p.name);
    setWolfActionsToday(Object.fromEntries(wolfSide.map((n) => [n, false])));
    if (heldWin === "人狼陣営") {
      setPendingMajorityWin(true);
      addLog([{ type: "system", text: "2日目の朝が来ました。生存者の数を見渡すと、既に人狼陣営が過半数を占めていることに気づく者がいるかもしれません……。" }]);
    } else {
      addLog([{ type: "system", text: "2日目、昼になりました。議論を始めてください。" }]);
    }
  }

  async function grantTestCredits() {
    try {
      const res = await fetch("/api/check-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, secret: adminSecretInput, amount: 10 }),
      });
      const data = await res.json();
      if (res.ok) {
        setCredits(data.credits);
        setInsufficientCredits(false);
      } else {
        addLog([{ type: "system", text: `テストクレジットの付与に失敗しました。(${data.error || "原因不明"})` }]);
      }
    } catch (e) {
      addLog([{ type: "system", text: "テストクレジットの付与に失敗しました。通信環境を確認してください。" }]);
    }
  }

  async function openDebugLogViewer() {
    setShowDebugLogViewer(true);
    try {
      const res = await fetch(`/api/debug-log?action=list&secret=${encodeURIComponent(adminSecretInput)}`);
      const data = await res.json();
      if (res.ok) {
        setDebugLogList(data.logs || []);
      } else {
        addLog([{ type: "system", text: `ログ一覧の取得に失敗しました。(${data.error || "原因不明"})` }]);
      }
    } catch (e) {
      addLog([{ type: "system", text: "ログ一覧の取得に失敗しました。通信環境を確認してください。" }]);
    }
  }

  async function openCostStats() {
    setShowCostStats(true);
    setCostStatsLoading(true);
    setCostStatsError(null);
    try {
      const res = await fetch(`/api/debug-log?action=cost-stats&secret=${encodeURIComponent(adminSecretInput)}`);
      const data = await res.json();
      if (res.ok) {
        setCostStats(data);
      } else {
        setCostStatsError(data.error || "原因不明");
      }
    } catch (e) {
      setCostStatsError("通信環境を確認してください。");
    } finally {
      setCostStatsLoading(false);
    }
  }

  async function toggleDebugLogFavorite(key, nextFavorite) {
    try {
      const res = await fetch("/api/debug-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-favorite", key, favorite: nextFavorite, secret: adminSecretInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setDebugLogList((prev) => prev.map((item) => (item.key === key ? { ...item, favorite: data.favorite, legacy: false } : item)));
      } else {
        addLog([{ type: "system", text: `お気に入り設定に失敗しました。(${data.error || "原因不明"})` }]);
      }
    } catch (e) {
      addLog([{ type: "system", text: "お気に入り設定に失敗しました。通信環境を確認してください。" }]);
    }
  }

  async function openNpcCandidateViewer() {
    setShowNpcCandidateViewer(true);
    try {
      const res = await fetch(`/api/list-npc-candidates?secret=${encodeURIComponent(adminSecretInput)}`);
      const data = await res.json();
      if (res.ok) {
        setNpcCandidateList(data.candidates || []);
      } else {
        addLog([{ type: "system", text: `候補一覧の取得に失敗しました。(${data.error || "原因不明"})` }]);
      }
    } catch (e) {
      addLog([{ type: "system", text: "候補一覧の取得に失敗しました。通信環境を確認してください。" }]);
    }
  }

  async function reviewNpcCandidate(key, action) {
    try {
      const res = await fetch("/api/review-npc-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, action, secret: adminSecretInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setNpcCandidateList((prev) => prev.map((c) => (c.key === key ? { ...c, status: action === "approve" ? "approved" : "rejected" } : c)));
      } else {
        addLog([{ type: "system", text: `処理に失敗しました。(${data.error || "原因不明"})` }]);
      }
    } catch (e) {
      addLog([{ type: "system", text: "処理に失敗しました。通信環境を確認してください。" }]);
    }
  }

  async function downloadSavedDebugLog(key) {
    try {
      const res = await fetch(`/api/debug-log?action=get&key=${encodeURIComponent(key)}&secret=${encodeURIComponent(adminSecretInput)}`);
      const data = await res.json();
      if (!res.ok) {
        addLog([{ type: "system", text: `ダウンロードに失敗しました。(${data.error || "原因不明"})` }]);
        return;
      }
      const blob = new Blob([data.content || ""], { type: "text/markdown;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${key.replace("debuglog:", "jinro_debug_")}.md`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      addLog([{ type: "system", text: "ダウンロードに失敗しました。通信環境を確認してください。" }]);
    }
  }

  // デバッグ・繰り返しプレイのため、名前と性別を永続化ストレージから読み込む(個人用・非共有)
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("player_prefs", false);
        if (result?.value) {
          const prefs = JSON.parse(result.value);
          if (prefs.name) {
            setUserName(prefs.name);
            setNameInput(prefs.name);
          }
          if (prefs.gender) setUserGender(prefs.gender);
          if (typeof prefs.npcMaleCount === "number") setNpcMaleCount(prefs.npcMaleCount);
          if (prefs.region === "ja" || prefs.region === "en") setRegion(prefs.region);
          if (typeof prefs.beginnerMode === "boolean") setBeginnerMode(prefs.beginnerMode);
        }
      } catch (e) {
        // 保存済みの設定がない場合は何もしない
      }
      try {
        const save = await window.storage.get("game_save", false);
        if (save?.value) {
          setHasSave(true);
          // 「続きをする」画面の表示欄に、実際に進行中のゲームの設定を反映させる(直近の入力欄用の設定ではなく、こちらを優先する)
          try {
            const s = JSON.parse(save.value);
            if (s.userName) { setUserName(s.userName); setNameInput(s.userName); }
            if (s.userGender) setUserGender(s.userGender);
            if (Array.isArray(s.players)) {
              const npcMales = s.players.filter((p) => !p.isUser && p.gender === "男性").length;
              setNpcMaleCount(npcMales);
            }
            if (s.region === "ja" || s.region === "en") setRegion(s.region);
          } catch (e) {
            // 解析に失敗しても、続きから始めるボタン自体は表示する
          }
        }
      } catch (e) {
        // 保存済みの進行データがない
      }
      try {
        const favResult = await window.storage.get("favorite_stories", false);
        if (favResult?.value) setFavorites(JSON.parse(favResult.value));
      } catch (e) {
        // お気に入りがない場合は何もしない
      }
      try {
        const tarotResult = await window.storage.get("tarot_collection", false);
        if (tarotResult?.value) setTarotCollection(JSON.parse(tarotResult.value));
      } catch (e) {
        // コレクションがない場合は何もしない
      }
      setSettingsLoaded(true);
    })();
  }, []);
  const [turnLabel, setTurnLabel] = useState(1); // 左上の「日-ターン」表示用(ターン番号)
  const [chatMode, setChatMode] = useState("class"); // "class"(教室) | "ally"(仲間との密談)
  const [defenseCandidates, setDefenseCandidates] = useState([]);
  const [defenseReacted, setDefenseReacted] = useState(false); // 弁明タイムに1回だけリアクションできる機会を使ったか
  const [defenseLoading, setDefenseLoading] = useState(false); // 弁明タイムのセリフ生成中かどうか
  const [voteTarget, setVoteTarget] = useState(null);

  // ゲーム進行を都度、永続化ストレージに自動保存する(閉じても続きから遊べるように)
  useEffect(() => {
    if (phase === "setup" || phase === "gameover" || players.length === 0) return;
    const snapshot = {
      phase, day, players, compatMap, log, turnLabel, discussionTurns,
      voteRound1Tally, defenseCandidates, voteTarget, nightTarget,
      privateInfo, confirmedWhite, confirmedBlack, winner, jokerState,
      wolfActionsToday, userName, userGender, npcSeerLog, npcMediumLog, mediumRevealedName, executionHistory, npcJokerState, excludedSuspects, npcGuardLog, roleGuesses, npcAffinity, madmanDelusions, roleClaims,
      pendingMajorityWin, defenseReacted, playerSeerLog, playerMediumLog, dayDigests, pendingDayAdvanceWin, region, giveUp, beginnerMode, guideNpcName, exchangeStudents,
    };
    (async () => {
      try {
        await window.storage.set("game_save", JSON.stringify(snapshot), false);
      } catch (e) {
        // 保存に失敗しても進行は止めない
      }
    })();
  }, [log, phase]);

  async function resumeGame() {
    try {
      const save = await window.storage.get("game_save", false);
      if (!save?.value) return;
      const s = JSON.parse(save.value);
      setPlayers(s.players || []);
      setCompatMap(s.compatMap || {});
      const restoredLog = s.log || [];
      logRef.current = restoredLog;
      setLog(restoredLog);
      setDay(s.day || 1);
      setTurnLabel(s.turnLabel || 1);
      setDiscussionTurns(s.discussionTurns || 0);
      setVoteRound1Tally(s.voteRound1Tally || null);
      setDefenseCandidates(s.defenseCandidates || []);
      setVoteTarget(s.voteTarget || null);
      setNightTarget(s.nightTarget || null);
      setPrivateInfo(s.privateInfo || []);
      setConfirmedWhite(s.confirmedWhite || []);
      setConfirmedBlack(s.confirmedBlack || []);
      setWinner(s.winner || null);
      setJokerState(s.jokerState || { hidden: false, selfAware: false, abilityBank: null, abilityUsed: false, defected: false, defectionOffered: false, pendingInheritance: null });
      setWolfActionsToday(s.wolfActionsToday || {});
      if (s.userName) setUserName(s.userName);
      if (s.userGender) setUserGender(s.userGender);
      const fullyTyped = {};
      restoredLog.forEach((e, i) => (fullyTyped[i] = (e.text || "").length));
      setTypedChars(fullyTyped);
      typingQueueRef.current = [];
      isTypingRef.current = false;
      setNpcSeerLog(s.npcSeerLog || []);
      setNpcGuardLog(s.npcGuardLog || []);
      setNpcMediumLog(s.npcMediumLog || []);
      setMediumRevealedName(s.mediumRevealedName || null);
      setExecutionHistory(s.executionHistory || []);
      setNpcJokerState(s.npcJokerState || { aware: false, defected: false, abilityBank: null, abilityUsed: false });
      setExcludedSuspects(s.excludedSuspects || []);
      setRoleGuesses(s.roleGuesses || {});
      setNpcAffinity(s.npcAffinity || {});
      setMadmanDelusions(s.madmanDelusions || {});
      setRoleClaims(s.roleClaims || {});
      setPendingMajorityWin(!!s.pendingMajorityWin);
      setPendingDayAdvanceWin(s.pendingDayAdvanceWin === undefined ? undefined : s.pendingDayAdvanceWin);
      if (s.region === "ja" || s.region === "en") setRegion(s.region);
      setGiveUp(!!s.giveUp);
      setBeginnerMode(!!s.beginnerMode);
      setGuideNpcName(s.guideNpcName || null);
      setExchangeStudents(s.exchangeStudents || []);
      setDefenseReacted(!!s.defenseReacted);
      setPlayerSeerLog(s.playerSeerLog || []);
      setPlayerMediumLog(s.playerMediumLog || []);
      setDayDigests(s.dayDigests || []);
      hasStartedRef.current = true;
      setPhase(s.phase || "discussion");
    } catch (e) {
      // 読み込みに失敗した場合は何もしない
    }
  }

  async function clearSave() {
    try {
      await window.storage.delete("game_save", false);
    } catch (e) {}
    setHasSave(false);
  }

  // デバッグ用:全会話ログ・役職・真実の記録をファイルとしてダウンロードする(チャットに直接貼らずに済むように)
  function buildDebugLogText() {
    const rosterInfo = players.map((p) => {
      const defectedTag = p.role === "ジョーカー" && ((p.isUser && jokerState.defected) || (!p.isUser && npcJokerState.defected)) ? "・人狼側へ寝返っていた" : "";
      return `${p.name}(${p.age}歳・${p.personality}・${p.club}) 役職:${p.role}${defectedTag} 生存:${p.alive}${p.isUser ? " ←プレイヤー" : ""}`;
    }).join("\n");
    const fullTranscript = log.map((e) => {
      if (e.type === "system") return `[GM] ${e.text}`;
      if (e.type === "ally") return `[密談] ${e.speaker}: ${e.text}`;
      return `${e.speaker}: ${e.text}`;
    }).join("\n");
    const seerLogText = npcSeerLog.length > 0 ? npcSeerLog.map((e) => `${e.day}日目夜: ${e.seerName}が${e.target}を占い「${e.result}」`).join("\n") : "なし";
    const mediumLogText = npcMediumLog.length > 0 ? npcMediumLog.map((e) => `${e.day}日目: ${e.mediumName}が視た${e.target}の結果「${e.result}」`).join("\n") : "なし";
    const guardLogText = npcGuardLog.length > 0 ? npcGuardLog.map((e) => `${e.day}日目夜: ${e.hunterName}が${e.target}を護衛(${e.blocked ? "襲撃阻止成功" : "空振り"})`).join("\n") : "なし";
    const execHistoryText = executionHistory.length > 0 ? executionHistory.map((e) => `${e.day}日目: ${e.executed}(実際は${e.trueRole})`).join("\n") : "なし";
    const affinityText = Object.entries(npcAffinity).map(([n, v]) => `${n}: ${v}`).join("\n") || "なし";
    const claimsText = Object.entries(roleClaims).map(([n, info]) => `${n}: ${info.role}(${info.sinceDay}日目〜)`).join("\n") || "なし";
    const fortunesText = ending?.fortunes
      ? Object.entries({ money: "金運", work: "仕事運", love: "恋愛運", health: "健康運", overall: "総合運" })
          .map(([key, label]) => (ending.fortunes[key] ? `${label}: ${"★".repeat(ending.fortunes[key].stars || 0)}(${ending.fortunes[key].text})` : null))
          .filter(Boolean).join("\n")
      : "(なし)";
    const endingText = ending
      ? `タロットカード: ${ending.tarotName || "(なし)"}\n診断説明: ${ending.diagnosis || "(なし)"}\n運勢:\n${fortunesText}\n振り返り: ${ending.review || "(なし)"}\n感想:\n${(ending.comments || []).map((c) => `${c.speaker}: ${c.text}`).join("\n") || "(なし)"}`
      : "(エンディング未生成、またはゲーム進行中)";

    return `# 人狼ゲーム デバッグログ
生成日時: ${new Date().toLocaleString("ja-JP")}
現在: ${day}日目 / フェーズ:${phase} / ターン:${turnLabel}

## 全員の役職(内部真実)
${rosterInfo}

## NPC占い師の実際の結果ログ(真実)
${seerLogText}

## NPC霊媒師の実際の結果ログ(真実)
${mediumLogText}

## NPC狩人の実際の護衛履歴(真実)
${guardLogText}

## 処刑履歴(真実)
${execHistoryText}

## 各NPCのプレイヤーへの好感度(内部数値)
${affinityText}

## CO(自称役職)ステータス一覧
${claimsText}

## 通信状況
API呼び出し回数: ${tokenTotals.calls} / 入力トークン: ${tokenTotals.input} / 出力トークン: ${tokenTotals.output}
プロンプトキャッシュ: 読み込み${tokenTotals.cacheRead || 0}トークン(約1/10料金) / 新規書き込み${tokenTotals.cacheWrite || 0}トークン
直近の通信エラー: ${lastApiError || "なし"}
直近の応答がmax_tokensで打ち切られたか: ${lastStopReason === "max_tokens" ? "はい(尻切れの可能性)" : "いいえ"}

## エンディング(振り返り・診断・感想)
${endingText}

## 会話ログ全文
${fullTranscript}
`;
  }

  // このゲームのプレイログをサーバーに自動保存する(開発者のデバッグ用途。ゲーム終了時に自動送信する)
  async function autoSaveDebugLog() {
    if (!HAS_BACKEND) return; // ライトモードでは保存先が無い
    try {
      await fetch("/api/debug-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", deviceId, userName, content: buildDebugLogText() }),
      });
    } catch (e) {
      // 保存に失敗してもプレイヤーの体験は止めない(サイレントに諦める)
    }
  }

  // プレイヤーが同意した場合、今回のプレイ内容を「NPC分身候補」としてサーバーに送信する。
  // 承認されるまでは他の誰のゲームにも一切登場しない(開発者の手動承認が必須)。
  async function submitNpcCandidate() {
    const nickname = npcNicknameInput.trim();
    if (!nickname || npcSubmitting) return;
    setNpcSubmitting(true);
    try {
      const res = await fetch("/api/save-npc-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, nickname, content: buildDebugLogText(), beginnerMode, region }),
      });
      const data = await res.json();
      if (res.ok) {
        setNpcFarewellLine(data.farewellLine || "");
        setNpcSubmitted(true);
      } else {
        addLog([{ type: "system", text: "分身の登録に失敗しました。通信環境を確認してもう一度試してみてください。" }]);
      }
    } catch (e) {
      addLog([{ type: "system", text: "分身の登録に失敗しました。通信環境を確認してもう一度試してみてください。" }]);
    } finally {
      setNpcSubmitting(false);
    }
  }

  async function openNpcBattleHistory() {
    setShowNpcBattleHistory(true);
    try {
      const res = await fetch(`/api/npc-battle?action=get&deviceId=${encodeURIComponent(deviceId)}`);
      const data = await res.json();
      setNpcBattleRecords(res.ok ? (data.records || []) : []);
    } catch (e) {
      setNpcBattleRecords([]);
    }
  }

  // ゲームが終了した(gameoverになった)瞬間、1回だけデバッグログをサーバーに自動送信する。
  // useEffectで監視することで、setPlayers等のstate更新が確実に反映された後の最新状態を送信できる。
  const autoSavedRef = useRef(false);
  useEffect(() => {
    if (phase === "gameover" && !autoSavedRef.current) {
      autoSavedRef.current = true;
      autoSaveDebugLog();
    }
    if (phase === "setup") {
      autoSavedRef.current = false; // 新しいゲームが始まったらリセット
    }
  }, [phase]);

  function copyDebugLog() {
    const content = buildDebugLogText();
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jinro_debug_${day}日目.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const [nightTarget, setNightTarget] = useState(null);
  const [privateInfo, setPrivateInfo] = useState([]);
  const [pendingImmediateSeerChoice, setPendingImmediateSeerChoice] = useState(false); // 処刑継承直後、即座に占い先を選ぶUIを出すか
  const [npcSeerLog, setNpcSeerLog] = useState([]); // [{day, seerName, target, result}] NPC占い師の実際の占い結果(真実)
  const [npcGuardLog, setNpcGuardLog] = useState([]); // [{day, hunterName, target, blocked}] NPC狩人の実際の護衛履歴(真実)
  const [npcMediumLog, setNpcMediumLog] = useState([]); // [{day, mediumName, target, result}] NPC霊媒師の実際の霊媒結果(真実)
  const [dayDigests, setDayDigests] = useState([]); // [{day, text}] 過去の日の議論を要約した軽量な記録(全文の代わりにコストを抑えつつ、確立した合意・推理の流れを保持する)
  const [playerSeerLog, setPlayerSeerLog] = useState([]); // [{day, target, result}] プレイヤー自身が占い師(または継承)として出した実際の結果
  const [playerMediumLog, setPlayerMediumLog] = useState([]); // [{day, target, result}] プレイヤー自身が霊媒師(または継承)として出した実際の結果
  const [mediumRevealedName, setMediumRevealedName] = useState(null); // 既にCO済みの霊媒師の名前(初回だけ名乗らせるため)
  const [executionHistory, setExecutionHistory] = useState([]); // [{day, executed, trueRole}] 処刑された人の本当の役職(真実の記録、霊媒師COの検証用)
  const [confirmedWhite, setConfirmedWhite] = useState([]);
  const [confirmedBlack, setConfirmedBlack] = useState([]);
  const [winner, setWinner] = useState(null);
  const [pendingMajorityWin, setPendingMajorityWin] = useState(false); // 朝を迎えた時点で人狼側が過半数に達した場合、即終了せず1ターンだけ猶予してから演出する
  const [ending, setEnding] = useState(null); // { review: string, diagnosis: string, title: string }
  const [endingQuestionTarget, setEndingQuestionTarget] = useState(null);
  const [endingQuestionInput, setEndingQuestionInput] = useState("");
  const [endingAnswer, setEndingAnswer] = useState(null); // {speaker, text}
  const [endingQuestionLoading, setEndingQuestionLoading] = useState(false);
  const [endingLoading, setEndingLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNameChips, setShowNameChips] = useState(false); // 参加者名簿(名前タップ挿入)の折り畳み状態。デフォルトは閉じる
  const [showHowTo, setShowHowTo] = useState(false);
  const [howToTab, setHowToTab] = useState("play"); // "play" | "roles"
  const [excludedSuspects, setExcludedSuspects] = useState([]); // プレイヤー自身の予想メモ用(ゲームロジックには影響しない)
  const [roleGuesses, setRoleGuesses] = useState({}); // {name: guessIndex} プレイヤー自身の役職予想メモ(ゲームロジックには影響しない)
  const ROLE_GUESS_OPTIONS = ["?", "村人?", "共有者?", "霊媒師?", "占い師?", "狩人?", "ジョーカー?", "狂人?", "人狼?"];
  function cycleRoleGuess(name) {
    setRoleGuesses((prev) => {
      const cur = prev[name] ?? 0;
      return { ...prev, [name]: (cur + 1) % ROLE_GUESS_OPTIONS.length };
    });
  }

  function toggleExcludedSuspect(name) {
    setExcludedSuspects((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  }
  const [tokenDisplay, setTokenDisplay] = useState({ input: 0, output: 0, calls: 0, cacheRead: 0, cacheWrite: 0 });

  // トークン消費の概算をポーリングで反映する(モジュールレベル変数はReact stateではないため)
  useEffect(() => {
    const timer = setInterval(() => {
      setTokenDisplay({ ...tokenTotals });
    }, 1500);
    return () => clearInterval(timer);
  }, []);
  const [hasSave, setHasSave] = useState(false);
  const [giveUp, setGiveUp] = useState(false); // 「全て諦める」:以後の発言・投票・行動を全て「何もしない」扱いにして自動進行させる
  const [confirmingGiveUp, setConfirmingGiveUp] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false); // 名前・性別等の非同期読み込みが終わるまで、トップ画面の中身を表示しない(空欄→書き換わるチラつき防止)
  const [favorites, setFavorites] = useState([]); // 保存されたお気に入りストーリー一覧(最大3件)
  const [tarotCollection, setTarotCollection] = useState({}); // {カード名: {count, firstObtainedAt}} タロットカードのコレクション
  const [showTarotCollection, setShowTarotCollection] = useState(false);
  const [selectedTarotDetail, setSelectedTarotDetail] = useState(null); // タップして詳細を見ているカード名(未選択はnull)
  const [showNpcBattleHistory, setShowNpcBattleHistory] = useState(false);
  const [npcBattleRecords, setNpcBattleRecords] = useState(null); // nullは未取得
  const [tarotJustAdded, setTarotJustAdded] = useState(false); // 直近のゲームで新規カードを獲得したか(NEW!表示用)
  const [favoriteSaved, setFavoriteSaved] = useState(false); // 今回のゲームを既にお気に入り登録したか
  const [npcConsentChoice, setNpcConsentChoice] = useState(null); // null(未回答) | true(同意) | false(辞退)
  const [npcNicknameInput, setNpcNicknameInput] = useState("");
  const [npcSubmitting, setNpcSubmitting] = useState(false);
  const [npcSubmitted, setNpcSubmitted] = useState(false);
  const [npcFarewellLine, setNpcFarewellLine] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewingFavorite, setViewingFavorite] = useState(null); // 閲覧中のお気に入り(読み取り専用ビュー)
  const [jokerState, setJokerState] = useState({ hidden: false, selfAware: false, abilityBank: null, abilityUsed: false, defected: false, defectionOffered: false, pendingInheritance: null });
  const [npcJokerState, setNpcJokerState] = useState({ aware: false, defected: false, abilityBank: null, abilityUsed: false }); // NPCがジョーカーの場合の覚醒・裏切り・能力継承状態
  const [madmanDelusions, setMadmanDelusions] = useState({}); // {name: 思い込んでいる役職} 狂人は洗脳により自分が別の役職(人狼含む)だと信じ込んでいる
  const [wolfActionsToday, setWolfActionsToday] = useState({});
  const logEndRef = useRef(null);
  const logRef = useRef([]); // logのクロージャ陳腐化を防ぐため、常に最新値を参照できるようにする
  useEffect(() => {
    logRef.current = log;
  }, [log]);
  const inputRef = useRef(null);

  function autoResizeInput() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 160; // これ以上は内部スクロール
    el.style.height = Math.min(el.scrollHeight, max) + "px";
  }
  // 名前の打ち間違い対策:タップした人物名を、入力中のカーソル位置にそのまま挿入する
  function insertNameIntoInput(name) {
    const el = inputRef.current;
    setInput((prev) => {
      const start = el?.selectionStart ?? prev.length;
      const end = el?.selectionEnd ?? prev.length;
      return prev.slice(0, start) + name + prev.slice(end);
    });
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      autoResizeInput();
    });
  }
  const scrollBoxRef = useRef(null);

  // タイプライター表示:1文字ずつ出す。表示中のインデックス→表示済み文字数
  const [typedChars, setTypedChars] = useState({});
  const typingQueueRef = useRef([]);
  const isTypingRef = useRef(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    logRef.current.forEach((entry, i) => {
      if (typedChars[i] !== undefined) return; // 既に処理済み
      if (!typingQueueRef.current.includes(i)) {
        typingQueueRef.current.push(i);
      }
    });
    processTypingQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [log]);

  function processTypingQueue() {
    if (isTypingRef.current) return;
    const idx = typingQueueRef.current.shift();
    if (idx === undefined) return;
    const entry = logRef.current[idx]; // クロージャ陳腐化を防ぐため、常にlogRefから読む
    if (!entry) return;
    isTypingRef.current = true;
    // システムメッセージ(GMのまとめ等)は文字送りアニメーションをせず即時表示するが、
    // キューの順番は守る(先に並んでいるキャラクターのセリフの表示が終わるまで、追い越して表示されないようにする)
    if (entry.type === "system") {
      setTypedChars((prev) => ({ ...prev, [idx]: entry.text.length }));
      isTypingRef.current = false;
      hasStartedRef.current = true;
      processTypingQueue();
      return;
    }
    let pos = typedChars[idx] || 0;
    const speed = 48; // ms/文字(人間が打っているくらいの速度)
    const startDelay = pos === 0 ? 350 : 0; // 新しい発言が始まる前の一呼吸(人間っぽさ)
    setTimeout(() => {
      const timer = setInterval(() => {
        pos++;
        setTypedChars((prev) => ({ ...prev, [idx]: pos }));
        // 追っかけスクロール(最初の一括表示ではジャンプさせず、タイプに合わせて少しずつ追従)
        if (hasStartedRef.current) {
          scrollBoxRef.current?.scrollTo({ top: scrollBoxRef.current.scrollHeight, behavior: "smooth" });
        }
        if (pos >= entry.text.length) {
          clearInterval(timer);
          isTypingRef.current = false;
          hasStartedRef.current = true;
          processTypingQueue();
        }
      }, speed);
    }, startDelay);
  }

  // 安全策:何らかの理由でキューが停止・表示漏れが起きた場合に備え、定期的に取りこぼしを検知して復旧する
  useEffect(() => {
    const watchdog = setInterval(() => {
      let foundMissing = false;
      logRef.current.forEach((entry, i) => {
        if (typedChars[i] === undefined) {
          foundMissing = true;
          if (!typingQueueRef.current.includes(i)) {
            typingQueueRef.current.push(i);
          }
        }
      });
      if (foundMissing && !isTypingRef.current) {
        processTypingQueue();
      }
    }, 2000);
    return () => clearInterval(watchdog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedChars]);

  // プレイヤーが死亡している、または「全て諦める」を選んだ場合、選択できることがないフェーズは自動的に進行する(ボタンを押さなくてよい)。
  // 「諦める」はまだ生存しているので、投票そのものは通常通りカウントされる(ランダムに選んだ相手に入れる)。
  // 死亡している場合は元々投票権がないため、何も指定せず(投票なしのまま)進める。
  useEffect(() => {
    const me = getUser();
    if (!me || (me.alive && !giveUp) || busy) return;
    if (!["discussion", "vote_round1", "defense", "vote_final", "night"].includes(phase)) return;
    const timer = setTimeout(() => {
      if (phase === "discussion") advanceDiscussionAsSpectator();
      else if (phase === "vote_round1") {
        if (me.alive && giveUp) {
          const candidates = alivePlayers().filter((p) => !p.isUser).map((p) => p.name);
          submitVoteRound1(candidates.length > 0 ? pickRandom(candidates) : null);
        } else {
          submitVoteRound1();
        }
      }
      else if (phase === "defense") setPhase("vote_final");
      else if (phase === "vote_final") {
        if (me.alive && giveUp) {
          const candidates = defenseCandidates.filter((n) => n !== userName);
          submitVoteFinal(candidates.length > 0 ? pickRandom(candidates) : pickRandom(defenseCandidates));
        } else {
          submitVoteFinal();
        }
      }
      else if (phase === "night") resolveNight();
    }, 1800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, busy, players, giveUp]);

  function addLog(entries) {
    const sanitized = entries.map((e) => ({ ...e, text: e.text ? sanitizeStageDirections(e.text) : e.text }));
    logRef.current = [...logRef.current, ...sanitized]; // 同期的に更新し、直後のgetTranscript()が最新を見られるようにする
    setLog(logRef.current);
  }
  function alivePlayers(list = players) {
    return list.filter((p) => p.alive);
  }
  function getUser(list = players) {
    return list.find((p) => p.isUser);
  }
  function otherAliveNPCs(list = players) {
    return list.filter((p) => p.alive && !p.isUser);
  }
  function getTranscript() {
    return logRef.current
      .filter((e) => !e.secret && (e.type === "user" || e.type === "npc" || e.type === "action" || e.type === "system"))
      .map((e) => {
        if (e.type === "action") return `(${e.speaker}は${e.text})`;
        if (e.type === "system") return `[GM] ${e.text}`;
        return `${e.speaker}: ${e.text}`;
      })
      .join("\n");
  }
  // 直近の「◯日目、昼になりました」以降のログだけを会話形式で返す(getQuietNPCsTodayと同じ日境界検出ロジック)
  function getTodayTranscript() {
    const dayMarkerIdx = [...logRef.current].map((e, i) => ({ e, i })).reverse().find(
      ({ e }) => e.type === "system" && /議論を始めてください|昼になりました/.test(e.text)
    )?.i ?? 0;
    return logRef.current
      .slice(dayMarkerIdx)
      .filter((e) => !e.secret && (e.type === "user" || e.type === "npc" || e.type === "action" || e.type === "system"))
      .map((e) => {
        if (e.type === "action") return `(${e.speaker}は${e.text})`;
        if (e.type === "system") return `[GM] ${e.text}`;
        return `${e.speaker}: ${e.text}`;
      })
      .join("\n");
  }
  // 投票・弁明タイム等に渡す「履歴コンテキスト」:過去の日は軽量な要約、今日だけは全文にすることで、
  // 確立した合意・推理の流れを保ちつつ、日を追うごとに会話ログが際限なく膨らむのを防ぐ。
  function getHistoryContext() {
    const digestText = dayDigests.length > 0
      ? dayDigests.map((d) => `【${d.day}日目のまとめ】${d.text}`).join("\n")
      : "";
    const todayText = getTodayTranscript();
    return [digestText, todayText].filter(Boolean).join("\n\n");
  }
  // 1日の議論・投票が終わり、夜になるタイミングで、その日の要約を軽量な追加呼び出しで生成する。
  // UIをブロックしないよう非同期で行い、失敗しても(要約が1日分欠けるだけで)ゲーム進行には影響させない。
  async function generateDayDigest(dayNum) {
    const dayTranscript = getTodayTranscript();
    if (!dayTranscript.trim()) return;
    const system = `あなたは人狼ゲームの記録係です。以下は${dayNum}日目の議論・投票の会話ログです。後の判断材料として使えるよう、**誰が何をCO(自称)したか・誰の占い/霊媒結果が公表されたか・誰が処刑されたか・その理由として場で共有された推理や合意**を、3〜5文程度の簡潔な要約にしてください。個々の掛け合いの再現は不要、結論と根拠だけでよい。
**絶対厳守(重要)**:根拠の強さを事実と異なる強さの言葉に書き換えない。**占い・霊媒の結果は「本人がそう主張しているだけ」であり(その占い師/霊媒師自身が本物とは限らない)、複数の結果が一致していても、後から出た方が先の結果に便乗しているだけの可能性がある。このゲームには「ゲーム中に確定する」根拠は存在しない**。「確定した」「判明した」という言葉は一切使わず、占い・霊媒結果も消去法も言動の矛盾も多数決も、すべて「〜という結果/疑いが場で共有された」「〜との疑いが強まり処刑された(確証ではなく推理・状況証拠による)」のように、断定を避けた同格の書き方にする。
JSON形式のみ: {"summary":"要約文"}`;
    try {
      const parsed = await callClaude(system, `${dayNum}日目のログ:\n${dayTranscript}`, 400, 1);
      if (parsed?.summary) {
        setDayDigests((prev) => [...prev, { day: dayNum, text: parsed.summary }]);
      }
    } catch (e) {
      // 要約生成に失敗しても、ゲーム進行は止めない(その日の詳細がやや薄くなるだけ)
    }
  }
  // 今日の議論で、まだ一度も(または最も少なく)発言していないNPCを機械的に検出する。
  // 「誰が発言するか」をAIの裁量だけに委ねると、役職に関する暗黙の偏りが生まれるリスクがあるため、
  // 発言回数という客観的な事実に基づいて、発言機会を均等に近づける補助情報として使う。
  function getQuietNPCsToday(npcs) {
    // 直近の「◯日目、昼になりました」以降のログだけを対象にする(前日までの発言はカウントしない)
    const dayMarkerIdx = [...logRef.current].map((e, i) => ({ e, i })).reverse().find(
      ({ e }) => e.type === "system" && /議論を始めてください|昼になりました/.test(e.text)
    )?.i ?? 0;
    const todayLog = logRef.current.slice(dayMarkerIdx);
    const counts = {};
    npcs.forEach((n) => { counts[n.name] = 0; });
    todayLog.forEach((e) => {
      if (e.type === "npc" && counts[e.speaker] !== undefined) counts[e.speaker]++;
    });
    const minCount = Math.min(...Object.values(counts));
    return npcs.filter((n) => counts[n.name] === minCount).map((n) => n.name);
  }
  function displayRole(p) {
    // ジョーカーで自覚前なら「村人」と表示する
    if (p.role === "ジョーカー" && jokerState.hidden) return "村人";
    return p.role;
  }

  // ゲーム中いつでもトップ画面(お気に入りストーリー・タロットコレクション閲覧用)に戻れるようにする。
  // 現在の進行はオートセーブ済みなので、hasSaveを明示的にtrueにして「続きから始める」で必ず復帰できるようにする
  // (誤って「はじめる」を押しても新規ゲームで上書きされないよう、念のためのガード)。
  function returnToTitle() {
    setShowDrawer(false);
    setHasSave(true);
    setPhase("setup");
  }

  // 「対抗COはほぼ義務」というルールは、あくまでAIへの文章での指示にすぎず、
  // 毎ターン確実に実行されるとは限らない(実際、これが機能しないまま単独COが押し通ると、
  // 投票が不自然なほど的確に正解し続ける原因になる)。
  // そこでコード側で「対抗COが必要な状況かどうか」を検知し、必要な時だけ強めの指示を
  // プロンプトに追加で挟む(投票の弱い根拠を強制ランダム化する仕組みと同種の、コード側による補強)。
  // 実行役は狂人を優先する:狂人は本気で思い込んでいるため、嘘が発覚しても「狂人だった」で
  // 説明がつき人狼の正体には直結しない。人狼自身が偽COすると芋づる式に疑われるリスクが大きいため、
  // 生存する狂人がいない場合に限り、人狼には役職の偽CO以外の低リスクな工作(疑いの提起等)を促す。
  function buildCounterCoEscalationNote(alivePlayersList) {
    const infoRoles = ["占い師", "霊媒師", "狩人", "共有者"];
    const claimEntries = Object.entries(roleClaims);
    // 生存・死亡を問わず、人狼・狂人陣営のNPCがこれまでに何らかの役職をCO(偽CO含む)したことがあるか
    const wolfSideHasClaimedAnything = claimEntries.some(([name]) => {
      const p = players.find((pl) => pl.name === name);
      return p && !p.isUser && (p.role === "人狼" || p.role === "狂人");
    });
    if (wolfSideHasClaimedAnything) return ""; // すでに対抗(または偽CO)が起きているので不要
    const aliveMadmanNpc = alivePlayersList.filter((p) => !p.isUser && p.role === "狂人");
    const aliveWolfNpc = alivePlayersList.filter((p) => !p.isUser && p.role === "人狼");
    if (aliveMadmanNpc.length === 0 && aliveWolfNpc.length === 0) return ""; // 対抗できる人狼・狂人がもう生き残っていない
    if (day < 2) return ""; // 1日目はまだ対抗COの機を焦らせるほどではない
    const uncontested = infoRoles.filter((role) => claimEntries.filter(([, info]) => info.role === role).length === 1);
    if (uncontested.length === 0) return "";
    if (aliveMadmanNpc.length > 0) {
      return `\n**【コード側チェック・緊急指示・絶対厳守】**${uncontested.join("・")}が単独COされたまま、対抗COも偽の疑義も一度も出ていません。生存している狂人NPC(${aliveMadmanNpc.map((p) => p.name).join("、")})のうち少なくとも1人に、今回のターンで対抗CO(自分の思い込みに沿った偽の役職名乗り)を必ず行わせてください(人狼自身にはこの偽COをさせない。人狼が直接偽COすると芋づる式に疑われるため、この役割は狂人が担う)。このターンで実行しない限り、次のターン以降も同じ指示が続きます。\n`;
    }
    return `\n**【コード側チェック・緊急指示・絶対厳守】**${uncontested.join("・")}が単独COされたまま、対抗する動きが一度も出ていません。生存する狂人はもういないため、生存している人狼NPC(${aliveWolfNpc.map((p) => p.name).join("、")})のうち少なくとも1人に、今回のターンで**何らかの能動的な工作**を必ず行わせてください。ただし人狼自身が具体的な役職を騙って偽COするのは発覚時のリスクが大きいため避け、代わりに他者への疑いの提起・話題のすり替え・議論の主導権奪取など、直接の偽CO以外の手段を優先してください。このターンで実行しない限り、次のターン以降も同じ指示が続きます。\n`;
  }

  // ---------------- ゲーム開始 ----------------
  async function startGame() {
    const finalName = nameInput.trim() || userName;
    if (!finalName) return; // 名前が未入力の場合は開始しない(ボタン側でも無効化しているが念のため二重にガードする)
    // ★一時的に課金チェックを無効化中(再開する時はこの3行のコメントを外すだけでよい)
    // const ok = await tryConsumeCredit();
    // if (!ok) return; // 残高不足。insufficientCreditsがtrueになり、購入UIが表示される
    tokenTotals = { input: 0, output: 0, calls: 0, cacheRead: 0, cacheWrite: 0 };
    setTokenDisplay({ input: 0, output: 0, calls: 0, cacheRead: 0, cacheWrite: 0 });
    try {
      window.storage.delete("game_save", false);
    } catch (e) {}
    setHasSave(false);
    setUserName(finalName);
    try {
      window.storage.set("player_prefs", JSON.stringify({ name: finalName, gender: userGender, npcMaleCount, region, beginnerMode }), false);
    } catch (e) {
      // 保存に失敗しても進行は止めない
    }
    const activeCastPool = region === "en" ? CAST_POOL_EN : CAST_POOL;
    let maleCandidates = activeCastPool.filter((c) => c.gender === "男性");
    let femaleCandidates = activeCastPool.filter((c) => c.gender === "女性");

    // 承認済みのプレイヤー分身NPCを、通常のキャスト候補(40〜50人)に混ぜ込む(毎回試みる。日本語圏・英語圏どちらでも)。
    // ただし一度に混ぜるのは最大4人まで(プールに多数いる場合、毎回同じ顔ぶれにならないようランダムに絞る)。
    // あとは通常の男女比選出に完全に任せるので、実際に10人の中へ選ばれるかどうかは通常のキャストと同じ確率で決まる。
    // 分身が生まれた地域(region)と、今回のゲームの地域が異なる場合は「留学生」として扱う:
    // 名前はそのまま(翻訳しない)、ただしその場の言語(日本語/英語)を自然に話す設定にし、
    // 元の地域の言語で書かれている決め台詞(signatureLine)は言語が食い違うため使わない。
    // 失敗しても通常のキャストのままゲームを続行する。
    let exchangeStudentNames = [];
    if (HAS_BACKEND) {
      try {
        const poolRes = await fetch("/api/get-npc-pool");
        const poolData = await poolRes.json();
        const pool = poolData?.pool || [];
        if (pool.length > 0) {
          const picked = shuffle(pool).slice(0, 4);
          picked.forEach((p) => {
            const isExchange = (p.region === "en" ? "en" : "ja") !== region;
            if (isExchange) exchangeStudentNames.push(p.name);
            const entry = {
              name: p.name, age: p.age || 17, gender: p.gender, personality: p.personality, club: p.club,
              signatureLine: p.signatureLine || null, // 留学生の場合、元の地域の言語のままでもよい(下記exchangeStudentNoteで例外として明記)
              creatorDeviceId: p.creatorDeviceId || null,
            };
            if (p.gender === "男性") maleCandidates = [...maleCandidates, entry];
            else femaleCandidates = [...femaleCandidates, entry];
          });
        }
      } catch (e) {
        // 取得に失敗しても、通常のキャストのままゲームを続行する
      }
    }
    setExchangeStudents(exchangeStudentNames);

    const malePool = shuffle(maleCandidates);
    const femalePool = shuffle(femaleCandidates);
    const wantMale = npcMaleCount;
    const wantFemale = 10 - npcMaleCount;
    const chosen = shuffle([...malePool.slice(0, wantMale), ...femalePool.slice(0, wantFemale)]);

    const roles = shuffle(ROLE_SET_11);
    const all = [
      ...chosen.map((n) => ({ ...n, alive: true, isUser: false })),
      { name: finalName, age: 17, gender: userGender, personality: "快活だが少し天然", club: "帰宅部", alive: true, isUser: true },
    ];
    all.forEach((p, i) => (p.role = roles[i]));
    const compat = buildCompatMap(all);
    const affinity = buildInitialAffinity(chosen.map((n) => n.name));

    // 狂人は洗脳により、ランダムな役職を自分の正体だと思い込んでいる(村人は他の倍の確率で選ばれる)。
    // ★ プレイヤーは人間であり、ゲーム開始時に正しい役職(狂人)を伝えている以上、自分の意志でプレイする。
    //   NPCのような「洗脳による思い込み」の設定はプレイヤーには一切適用しない(対象からも除外する)。
    const delusionOptions = ["村人", "村人", "占い師", "霊媒師", "狩人", "共有者"];
    const delusions = {};
    all.filter((p) => p.role === "狂人" && !p.isUser).forEach((p) => {
      delusions[p.name] = pickRandom(delusionOptions);
    });

    setPlayers(all);
    setCompatMap(compat);
    setNpcAffinity(affinity);
    setMadmanDelusions(delusions);
    setRoleClaims({});
    // 初心者モードなら、生存NPCの中から1人だけ「案内役」をランダムに選ぶ(役職とは無関係)。死亡したら自然にこの役割も終わる(特別扱いはしない)。
    setGuideNpcName(beginnerMode ? pickRandom(chosen.map((p) => p.name)) : null);
    setDay(1);
    setPrivateInfo([]);
    setNpcSeerLog([]);
    setNpcGuardLog([]);
    setNpcMediumLog([]);
    setPlayerSeerLog([]);
    setPlayerMediumLog([]);
    setDayDigests([]);
    setMediumRevealedName(null);
    setExecutionHistory([]);
    setConfirmedWhite([]);
    setConfirmedBlack([]);
    setWinner(null);
    setEnding(null);
    setEndingQuestionTarget(null);
    setEndingQuestionInput("");
    setEndingAnswer(null);
    setEndingQuestionLoading(false);
    setEndingLoading(false);
    setFavoriteSaved(false);
    setNpcConsentChoice(null);
    setNpcNicknameInput("");
    setNpcSubmitting(false);
    setNpcSubmitted(false);
    setNpcFarewellLine("");
    setTarotJustAdded(false);
    setGiveUp(false);
    setConfirmingGiveUp(false);
    setPendingMajorityWin(false);
    setPendingImmediateSeerChoice(false);
    setVoteRound1Tally(null);
    setDefenseCandidates([]);
    setChatMode("class");
    setTurnLabel(1);

    const me = all.find((p) => p.isUser);
    const isJoker = me.role === "ジョーカー";
    setJokerState({ hidden: isJoker, selfAware: !isJoker, abilityBank: null, abilityUsed: false, defected: false, defectionOffered: false, pendingInheritance: null });
    setNpcJokerState({ aware: false, defected: false });
    setExcludedSuspects([]);
    setRoleGuesses({});

    const wolfSide = all.filter((p) => p.alive && (p.role === "人狼" || p.role === "狂人")).map((p) => p.name);
    setWolfActionsToday(Object.fromEntries(wolfSide.map((n) => [n, false])));

    const introLog = [
      { type: "system", text: `${all.length}人のクラスメイトが揃いました。役職がシャッフルされました。` },
      { type: "system", text: `あなた(${finalName})の役職は「${isJoker ? "村人" : me.role}」です。`, secret: true },
    ];

    // ペア役職の場合、相方の情報もGMのセリフとして伝える(専用UIは使わない)
    // ★これらはプレイヤー自身の画面表示専用。AIへの入力(getTranscript)には絶対に含めない(secret: true)。
    // 含めてしまうと、密談で一言も話していなくても、この1行だけでプレイヤーの役職がAIに直接漏れてしまう。
    if (me.role === "人狼" || me.role === "狂人" || me.role === "共有者") {
      const ally = all.find((p) => p.role === me.role && !p.isUser);
      introLog.push({ type: "system", text: `相方は${ally.name}です。お互い、ゲーム開始時から正体を知っています。`, secret: true });
      // プレイヤー自身が狂人の場合、自分がどう振る舞うかは自由(演出上の思い込みは強制しない)。
      // ただし、相方のNPC狂人が今何を自分の正体だと思い込んでいるかは伝える(仲間の状況として把握できるように)。
      if (me.role === "狂人" && ally) {
        introLog.push({ type: "system", text: `🌀 相方の${ally.name}は、洗脳により自分を「${delusions[ally.name]}」だと信じ込んでいます(演技ではなく本気でそう思っています)。`, secret: true });
      }
    }

    introLog.push({ type: "system", text: "まずは、あなたから何かアクションを起こしてみましょう。" });

    typingQueueRef.current = [];
    isTypingRef.current = false;
    hasStartedRef.current = false;
    setTypedChars({});
    logRef.current = introLog;
    setLog(introLog);
    setDiscussionTurns(0);
    setPhase("discussion");
  }


  // ---------------- 発言送信(教室 / 仲間との密談を切り替え) ----------------
  async function sendMessage() {
    if (!input.trim() || busy) return;
    if (chatMode === "ally") return sendAllyMessage();

    const userMsg = input.trim();
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    addLog([{ type: "user", speaker: userName, text: userMsg }]);
    setBusy(true);

    const npcs = otherAliveNPCs();
    const transcript = getTranscript();
    const activeBoxes = relevantBoxesForAliveRoles(alivePlayers());
    const cacheableRules = [buildRules(...activeBoxes), getStaticGameContextBlock()]; // 呼び出しをまたいで変わらない部分。プロンプトキャッシュ対象にする
    const quietNpcs = getQuietNPCsToday(npcs);

    const system = `あなたは人狼ゲームのゲームマスターです。
このゲームの参加者は合計${players.length}人(プレイヤー1人+NPC${npcs.length}人)です。人数を聞かれたら必ずこの数字で正確に答える(誤った人数を言わせない)。
**公開情報(全員が知っているゲームのルール)**:この11人の中には、人狼2人・狂人2人・占い師1人・霊媒師1人・狩人1人・共有者2人・ジョーカー1人・村人1人という役職構成が存在します(誰がどれかは誰も知らない)。**ジョーカーも実在する役職の一つとして、NPCの推理・会話の中で時々話題に上ってよいが、必須ではない**。ジョーカーの存在自体を忘れる必要はないが、**「ジョーカーとかいるんだよねー」のような特定の言い回しを毎回繰り返さない**。話題に出す時は表現や文脈を変え、そもそも出さないターンがあってもよい(このゲーム特有の"合言葉"のように定型化させない)。
**絶対厳守**:役職構成(人狼・狂人・占い師・霊媒師・狩人・共有者・ジョーカー・村人)は、ゲーム開始時から全員が知っている前提のルールである。「ジョーカーって何?」「そのルールこのゲームにあったっけ?」のように、誰かが役職構成そのものの存在を疑ったり知らなかったりする発言は絶対にさせない(これは全員が最初から知っている公開情報であり、忘れる・知らないということはあり得ない)。
${getGroundTruthBlock()}
各NPCのプレイヤー(${userName})への好感度(0〜100、内部数値。プレイヤーには絶対に数値を見せない):
${npcs.map((n) => `${n.name}: ${npcAffinity[n.name] ?? 50}`).join("、")}
**好感度を口調・態度に具体的に反映させる(絶対厳守、単なる「信じやすさ」の抽象論で終わらせない)**:同じキャラクターでも好感度によって話し方が変わる。目安:
・80以上:親しみを込めた呼び方・くだけた口調、頼まれごとに積極的、心配や気遣いを見せる、プレイヤーの発言を好意的に解釈する
・60〜79:友好的で協力的、素直に話を聞く
・40〜59:普通に丁寧、可もなく不可もない中立的な受け答え
・20〜39:やや素っ気ない・距離を感じる言い方、質問を返す、簡単には信じない
・20未満:明らかに冷たい・警戒した口調、皮肉や棘のある言い方、反論や指摘が増える
好感度が変化した直後は、その変化を匂わせる態度の揺れ(急に優しくなる/急に冷たくなる等)があってもよい。ただし人格が別人になるほど極端にはしない(性格の軸は保つ)。
**霊媒師のCOについて**:生存NPCの中に本物の霊媒師がいる場合、占い師などの他の役職と同様、**プレイヤーからの呼びかけや、CO優先度・リスクを踏まえた本人の判断で初めて名乗る**(処刑のたびに自動で登場させない)。まだ一度もCOしていない霊媒師を、文脈もなく突然発言させない。
**霊媒師のCOタイミングを不当に「後出し」「今更」と評価させない(絶対厳守)**:霊媒師は処刑が1回も起きていない1日目には、報告できる情報を一切持たない(そもそも視られる対象がいない)。つまり2日目の朝が物理的に最速のCOタイミングである。誰かが2日目の朝(処刑が1回行われた直後)に霊媒師COした場合、それを「昨日のうちに言えたはず」「初日から動き方が違ったはず」のように不当に疑う発言をNPCにさせない。もし村側のNPCがこの点を指摘する場合は、逆に「2日目の朝という最速のタイミングでのCOは、むしろ自然で信頼できる」という擁護的な文脈で扱う。
**霊媒師の結果は「人狼だった/人狼ではなかった」の二択のみ(絶対厳守)**:霊媒師は処刑者の具体的な役職名(村人・占い師・共有者等)までは分からない。「〇〇は人狼だった」「〇〇は人狼ではなかった」以外の言い方(具体的な役職名を名言すること)を絶対にさせない。
${day}日目昼の議論。生存NPC(${npcs.map((n) => n.name).join("、")})。
**最優先ルール**:直前の発言で名指し・疑われた人物がいれば、その人が最初に必ず直接反応(反論・弁明・受け流し等)する。話題が消化される前に別の新しい話題へ飛ばない。
**発言者数は無理に増やさない**。話す必然性のない人は黙っていてよい(スルーは自然な反応)。目安は2〜4人。中身のある短い一言を優先し、世間話で終わらせない。**誰を発言させるか・スルーするかは、性格設定と話題の流れだけで選ぶ(役職を理由に選ばない)**。特定の役職(人狼・狂人等)を持つキャラクターを、他の人物より意図的に発言頻度が低くなるよう調整しない。
**例外:自己紹介・「全員一言ずつ」のように、性質上その場にいる全員が順番に発言すべき場面(絶対厳守)**:この場合は上記の2〜4人という目安を適用せず、**その場の生存NPC全員(または大部分)に一言ずつ発言させる**。一部だけ発言させて残りを次のターン以降に持ち越し、プレイヤーに何度も催促させることはしない。1人あたりのセリフは短く保てば、人数が多くても問題ない。
**発言回数の機械的な公平性チェック(重要)**:今日まだ発言回数が最も少ない生存NPCは ${quietNpcs.length > 0 ? quietNpcs.join("、") : "(全員ほぼ均等)"} です。これは実際の発言ログを数えた客観的な事実であり、役職とは無関係の集計です。**もっともらしい話題の流れがあれば、この中の1人には今回のターンで発言機会を回すことを優先的に検討する**(必須ではないが、同じ人ばかりが毎回黙ったままにならないよう配慮する)。
**NPCはプレイヤー「${userName}」を積極的に名前で呼ぶ**(「${userName}はどう思う?」「${userName}くんは?」等)。プレイヤーを蚊帳の外にしない。
**重要**:直前のNPC発言が「${userName}」宛ての質問だった場合、他のNPCがその場で代わりに答えない・話題を奪わない。プレイヤー自身の返答の余地を必ず残す。
**質問と回答の対応関係を必ず確認**:プレイヤーの直前の発言が、それより前のNPCからの質問への回答になっている場合、それは「求められて答えた」だけであり、**単独の新しい怪しい発言として扱わない**。回答内容自体に矛盾や不自然さがない限り、疑いを深めない。プレイヤーが「さっき聞かれたから答えただけ」と指摘した場合、それは正当な指摘として受け止め、さらに追加で疑う理由にしない。
**誤解の訂正を「態度を変えた」と混同しない(絶対厳守)**:NPCがプレイヤーの発言を誤解し(例:趣旨を取り違えて詰め寄る)、プレイヤーがそれを訂正・説明した場合、**これは「最初の発言と違うことを言い出した」のではなく、単なる誤解の解消である**。訂正した内容が最初の趣旨と一貫していれば、態度を変えた・言い訳している等として新たに疑わない。むしろ誤解したNPC側が「勘違いだった、すまん」と引き下がるのが自然な反応であり、それでもなお別のNPCが「言い訳に聞こえる」等と追加で疑うのは、根拠のない詰み状態(何を言っても疑われる)を作るため避ける。
**発言の論理的な影響を正しく判定してから反応する(絶対厳守)**:プレイヤーの発言がある人物にとって有利(擁護・弁護)なのか不利(疑い・攻撃)なのかを、反応を作る前に必ず正確に判定する。**擁護されている当人が、その発言にムッとする・反発するといった、論理的に矛盾した反応をさせない**(例:「Aは怪しくない」と言われたAが、なぜか攻撃されたと誤解して反発する、など)。もし発言の意味が本当に曖昧で解釈が割れる場合のみ、確認を求める形の反応(「それってどういう意味?」)にとどめ、的外れな決めつけをしない。
**占い結果・霊媒結果は「対象が同一人物の場合のみ」一致・矛盾を語る(絶対厳守)**:占い師の結果は「占い師が占った、その対象」についてのみの情報。霊媒師の結果は「前日処刑された、その対象」についてのみの情報。**対象人物が違う場合、両者を「一致した」「食い違う」等と結びつけて語らない**。情報を評価する際は、必ず「誰についての、どの役職の、どんな結果か」を正確に区別する。
**証明可能性を判断する際は、生存中の本当の相方の存在を必ず踏まえる**:「相方が死んでいるから証明できない」という展開にする前に、その役職者の本当の相方が生存中でないかを必ず確認する。本当の相方が生きていれば、その人物が直接裏付けを述べることで証明・反証が可能なので、安易に「証明不可能」と決めつけさせない。
**このゲームのルール上、人狼は毎晩必ず誰か1人を襲撃する(絶対厳守)**:「人狼が誰も襲わなかった」という選択肢はこのゲームに存在しない。朝になって誰も死んでいない場合、唯一の理由は「狩人が襲撃対象を守った」ことである。
**話題の一貫性**:今のターンで出てきた新しい主張(CO・疑惑等)は、次のターン以降も踏まえて話を続ける。前のターンの重要な発言を無視して無関係な話題(唐突な人物の名指し等)に飛ばない。
**知り得る情報の範囲を厳守する(絶対厳守)**:あなたはGMとして全員の本当の役職を知っているが、**各キャラのセリフは、そのキャラが実際に知り得る範囲の情報だけを根拠にする**。特に人狼・狂人は、味方以外の役職を知らない。死者の役職について話す際は、霊媒師の報告など、公開されている情報の範囲内でのみ言及させる。
**CO(役職の自己申告)は軽々しくさせない**:プレイヤーやNPCから名指しで催促された、決選投票で追い詰められた等、明確な理由がある時にのみCOさせる。COは重い決断として扱う。**ただし「村人です」という宣言は、この慎重さの対象外(絶対厳守)**:村人は何の能力もない最もオーソドックスな役職で、名乗ってもリスクも価値もほぼゼロ(人狼が名乗っても嘘がバレない、村人自身にも守るべき情報がない)。**「なぜこのタイミングで村人だと言った」のように、村人宣言のタイミングを詮索させたり、それ自体を怪しむ材料にしたりしない**。誰でも気軽に、いつ言ってもよい発言として扱う。
**NPCも自発的に話題を切り出してよい(重要)**:「誰か役職者はいないか」「そろそろCOする人が出てもいい頃では」といった呼びかけや、役職者自身の「そろそろ名乗るべきタイミングだ」という自発的な判断は、**プレイヤーに促されなくてもNPC側から起こしてよい**。特に2日目以降は、村側のNPC(特に情報を持つ役職者)が自分の判断で話題を主導することを積極的に検討する。プレイヤーが毎回話を切り出さないと誰も動かない、という受け身の展開に偏らせない。人狼・狂人側の偽対抗COについても同様で、プレイヤーの発言を待たずに機を見て自発的に動いてよい。
**絶対厳守:既にCOしている役職者は、新しい未報告の結果を抱え込んだまま黙らせない**。占い師・霊媒師・狩人・共有者として既に名乗っている人物が、今日まだ話していない新しい結果(占い結果・霊媒結果・護衛結果など)を持っている場合、プレイヤーがその話題に触れなくても、その人物は自分から報告する(誰にも促されるのを待たない)。議論が停滞して誰も話題を切り出さない、という展開よりも優先する。
絶対厳守:speakerにプレイヤー名「${userName}」を使わない(NPCのみ)。プレイヤーへの問いかけの体裁を地の文で作らない。
**NPCの反応の後、あなた(GM)が一言で状況を整理し、プレイヤーへの決断ポイントを示す(例:「〇〇への疑いが強まっています。あなたはどう動きますか?」)。30字前後、断定しすぎない。**
**好感度の変動を判定する**:プレイヤーの直前の発言・行動を踏まえ、影響を受けたNPCがいれば好感度の増減を返す(-8〜+8の範囲)。優しさ・気遣い・褒める・性格や価値観が合う言動は好感度を上げる。冷たさ・攻撃的な物言い・根拠のない決めつけ・性格が合わない言動は好感度を下げる。目立った影響がなければそのNPCは含めなくてよい(全員分を無理に出さない)。
**CO(自称役職)の抽出**:**直前のプレイヤー「${userName}」の発言**、および今回生成したNPCのセリフの中で、誰かが初めて役職を自称した(CO した)場合、または既存の主張を変更した場合、roleClaimsとして報告する(例:プレイヤーが「俺は占い師だ」と言ったら {"${userName}":"占い師"}、NPCに「私が占い師です」と言わせたら {"高橋葵":"占い師"})。プレイヤーのCOも必ず拾うこと。今回COが発生していなければ空オブジェクトでよい。
${buildCounterCoEscalationNote(alivePlayers())}
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...], "gm_prompt": "GMの一言", "affinityChanges": {"名前": 増減値, ...}, "roleClaims": {"名前": "自称した役職", ...}}`;

    const userPrompt = `これまでの会話:\n${transcript}\n\n直前のプレイヤー発言:「${userMsg}」\n\nNPCの反応を生成してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 3400, 1, cacheableRules);
      if (parsed?.lines) {
        const npcOnly = parsed.lines.filter((l) => l.speaker !== userName);
        addLog(npcOnly.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text })));
      }
      if (parsed?.gm_prompt) {
        addLog([{ type: "system", text: parsed.gm_prompt }]);
      }
      if (parsed?.affinityChanges) {
        setNpcAffinity((prev) => {
          const next = { ...prev };
          Object.entries(parsed.affinityChanges).forEach(([name, delta]) => {
            if (next[name] !== undefined && typeof delta === "number") {
              next[name] = Math.max(0, Math.min(100, next[name] + delta));
            }
          });
          return next;
        });
      }
      if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
    } catch (e) {
      addLog([{ type: "system", text: `通信エラーが発生しました。(${lastApiError || "原因不明"}) このターンは消費されていません。もう一度送信してください。` }]);
      setBusy(false);
      return; // 通信エラー時はターンを消費せず、ここで処理を止める(再送信できるようにする)
    }
    setBusy(false);
    setTurnLabel((t) => t + 1);
    if (pendingMajorityWin) { triggerWolfMajorityReveal(); return; }

    // 投票への意思表示を検出(自分で「投票しよう」等と言えばすぐ移行)
    const voteIntent = /投票(しよう|に行こう|に移ろう|しますか|に進もう)|そろそろ決め|決を採ろ/.test(userMsg);
    const nextTurns = discussionTurns + 1;
    if (voteIntent) {
      addLog([{ type: "system", text: "投票する人を選んでください。" }]);
      goToVoteRound1();
    } else if (nextTurns >= 5) {
      addLog([{ type: "system", text: "そろそろ結論を出す時間です。投票する人を選んでください。" }]);
      goToVoteRound1();
    } else {
      setDiscussionTurns(nextTurns);
    }
  }

  // ---------------- プレイヤーが死亡している場合、NPCだけで議論を進める(観戦モード) ----------------
  async function advanceDiscussionAsSpectator() {
    if (busy) return;
    setBusy(true);
    const npcs = otherAliveNPCs();
    const transcript = getTranscript();
    const activeBoxes = relevantBoxesForAliveRoles(alivePlayers());
    const cacheableRules = [buildRules(...activeBoxes), getStaticGameContextBlock()];

    const system = `あなたは人狼ゲームのゲームマスターです。
**公開情報(全員が知っているゲームのルール)**:この11人の中には、人狼2人・狂人2人・占い師1人・霊媒師1人・狩人1人・共有者2人・ジョーカー1人・村人1人という役職構成が存在します(誰がどれかは誰も知らない)。役職構成そのものの存在を疑う発言は絶対にさせない。
${getGroundTruthBlock()}
**霊媒師の結果は「人狼だった/人狼ではなかった」の二択のみ(絶対厳守)**:具体的な役職名を名言させない。
**霊媒師のCOタイミングを不当に「後出し」と評価させない**:霊媒師は処刑が起きるまで報告できることがないため、2日目の朝が最速のCOタイミングである。
**このゲームのルール上、人狼は毎晩必ず誰か1人を襲撃する**:朝になって誰も死んでいない場合、唯一の理由は狩人の護衛成功である。
**知り得る情報の範囲を厳守する**:各キャラのセリフは、そのキャラが実際に知り得る範囲の情報だけを根拠にする。人狼・狂人は味方以外の役職を知らない。
**プレイヤー「${userName}」は${getUser()?.alive ? "この議論から降りており、発言しません" : "既に死亡しており、この議論には参加していません"}(発言させない)。**生存NPC(${npcs.map((n) => n.name).join("、")})だけで議論を進めてください。2〜4人が短く発言する。
**プレイヤーがいないので、NPC自身が話題を主導する**:役職者のCO、疑いの提起、対抗COなどを、誰かに促されなくてもNPC側から自発的に起こしてよい。
${(() => { const q = getQuietNPCsToday(npcs); return q.length > 0 ? `**発言回数の公平性配慮**:今日まだ発言が少ないNPC(${q.join("、")})がいれば、この中の1人には今回のターンで発言機会を回すことを優先的に検討する(役職とは無関係の機械的な集計)。` : ""; })()}
絶対厳守:speakerに死亡したプレイヤー名「${userName}」を使わない。
**CO(自称役職)の抽出**:今回のセリフで誰かが初めて役職を自称した、または主張を変更した場合、roleClaimsとして報告する(なければ空オブジェクト)。
${buildCounterCoEscalationNote(alivePlayers())}
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...], "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `これまでの会話:\n${transcript}\n\nプレイヤー不在のまま、NPCたちの議論を進めてください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 1600, 1, cacheableRules);
      if (parsed?.lines) {
        const npcOnly = parsed.lines.filter((l) => l.speaker !== userName);
        addLog(npcOnly.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text })));
      }
      if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
    } catch (e) {
      addLog([{ type: "system", text: `通信エラーが発生しました。(${lastApiError || "原因不明"}) 自動的に再試行されます。` }]);
      setBusy(false);
      return; // 通信エラー時はターンを消費しない(次の自動進行タイマーで再試行される)
    }
    setBusy(false);
    if (pendingMajorityWin) { triggerWolfMajorityReveal(); return; }
    const nextTurns = discussionTurns + 1;
    if (nextTurns >= 5) {
      addLog([{ type: "system", text: "そろそろ結論を出す時間です。投票が行われます。" }]);
      goToVoteRound1();
    } else {
      setDiscussionTurns(nextTurns);
    }
  }

  // ---------------- 行動(セリフではなく仕草・観察等の非言語的な行動) ----------------
  async function sendAction() {
    if (!input.trim() || busy) return;
    const actionText = input.trim();
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    addLog([{ type: "action", speaker: userName, text: actionText }]);
    setBusy(true);

    const npcs = otherAliveNPCs();
    const transcript = getTranscript();
    const activeBoxes = relevantBoxesForAliveRoles(alivePlayers());
    const cacheableRules = [buildRules(...activeBoxes), getStaticGameContextBlock()];

    const system = `あなたは人狼ゲームのゲームマスターです。
${getGroundTruthBlock()}
各NPCのプレイヤー(${userName})への好感度(0〜100、内部数値。プレイヤーには絶対見せない):
${npcs.map((n) => `${n.name}: ${npcAffinity[n.name] ?? 50}`).join("、")}
**好感度を口調・態度に具体的に反映させる**:80以上は親しみを込めた口調・積極的な反応、60〜79は友好的、40〜59は普通に丁寧、20〜39はやや素っ気ない・距離感がある、20未満は明らかに冷たい・棘のある反応にする。
プレイヤー「${userName}」が(セリフではなく)**行動**を取りました。これはセリフではなく、しぐさ・観察・様子見などの非言語的な行動です。
GMとして、この行動の結果(何が見えた・分かったか)を地の文で短く描写してください。行動が他人に見える性質のものなら、気づいたNPCが短く反応してもよい(必須ではない)。
${getQuietNPCsToday(npcs).length > 0 ? `**発言回数の公平性配慮**:今日まだ発言が少ないNPC(${getQuietNPCsToday(npcs).join("、")})がいれば、反応させる場合はこの中から優先的に選んでもよい(役職とは無関係の機械的な集計)。` : ""}
絶対厳守:speakerにプレイヤー名「${userName}」を使わない(NPCのみ)。
**好感度の変動を判定する**:行動の内容がNPCに好意的/不快な印象を与えた場合、好感度の増減を返す(-8〜+8)。目立った影響がなければ含めなくてよい。
**CO(自称役職)の抽出**:プレイヤーの行動内容、または今回の描写・セリフでCOが発生した場合、roleClaimsとして報告する(プレイヤーのCOも含む。なければ空オブジェクト)。
出力は必ずこのJSON形式のみ: {"narration":"行動の結果を描写する地の文(GM視点)", "lines":[{"speaker":"名前","text":"セリフ"}], "affinityChanges": {"名前": 増減値, ...}, "roleClaims": {"名前": "自称した役職", ...}}(反応するNPCがいなければlinesは空配列でよい)`;

    const userPrompt = `これまでの会話:\n${transcript}\n\nプレイヤーの行動:「${actionText}」\n\nこの行動の結果を描写してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 900, 1, cacheableRules);
      if (parsed?.narration) {
        addLog([{ type: "system", text: parsed.narration }]);
      }
      if (parsed?.lines?.length) {
        const npcOnly = parsed.lines.filter((l) => l.speaker !== userName);
        addLog(npcOnly.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text })));
      }
      if (parsed?.affinityChanges) {
        setNpcAffinity((prev) => {
          const next = { ...prev };
          Object.entries(parsed.affinityChanges).forEach(([name, delta]) => {
            if (next[name] !== undefined && typeof delta === "number") {
              next[name] = Math.max(0, Math.min(100, next[name] + delta));
            }
          });
          return next;
        });
      }
      if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
    } catch (e) {
      addLog([{ type: "system", text: `通信エラーが発生しました。(${lastApiError || "原因不明"}) このターンは消費されていません。もう一度送信してください。` }]);
      setBusy(false);
      return; // 通信エラー時はターンを消費せず、ここで処理を止める(再送信できるようにする)
    }
    setBusy(false);
    setTurnLabel((t) => t + 1);
    if (pendingMajorityWin) { triggerWolfMajorityReveal(); return; }
    const nextActionTurns = discussionTurns + 1;
    if (nextActionTurns >= 5) {
      addLog([{ type: "system", text: "そろそろ結論を出す時間です。投票する人を選んでください。" }]);
      goToVoteRound1();
    } else {
      setDiscussionTurns(nextActionTurns);
    }
  }

  // 「何もしない」を選んだ場合:プレイヤーは沈黙し、その場の様子を見ているだけの扱いにする。ターンは1つ消費する。
  async function skipTurn() {
    if (busy) return;
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    addLog([{ type: "system", text: `${userName}は、何も言わずに静かに様子を見ていた。` }]);
    setBusy(true);

    const npcs = otherAliveNPCs();
    const transcript = getTranscript();
    const activeBoxes = relevantBoxesForAliveRoles(alivePlayers());
    const cacheableRules = [buildRules(...activeBoxes), getStaticGameContextBlock()];

    const system = `あなたは人狼ゲームのゲームマスターです。
${getGroundTruthBlock()}
プレイヤー「${userName}」は今回、あえて何も発言・行動しませんでした(沈黙)。
これを受けて、生存NPC(${npcs.map((n) => n.name).join("、")})のうち0〜3人が自然に短く反応・会話を続けてください(プレイヤーの沈黙に触れても触れなくてもよい)。
**絶対厳守**:占い師・霊媒師・狩人・共有者としてCO済みのNPCが、今日まだ報告していない新しい結果や情報を持っている場合、プレイヤーが沈黙していても、それを理由に黙り込ませない。**そのNPCは自発的に報告する(誰も反応しなくてもよい、という許可の対象外)**。COした役職者に新しい報告事項が何もない場合に限り、誰も発言しなくてもよい。
${(() => { const q = getQuietNPCsToday(npcs); return q.length > 0 ? `**発言回数の公平性配慮**:今日まだ発言が少ないNPC(${q.join("、")})がいれば、発言させる場合はこの中から優先的に選んでもよい(役職とは無関係の機械的な集計)。` : ""; })()}
絶対厳守:speakerにプレイヤー名「${userName}」を使わない(NPCのみ)。
**CO(自称役職)の抽出**:今回のセリフでCOが発生した場合、roleClaimsとして報告する(なければ空オブジェクト)。
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...], "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `これまでの会話:\n${transcript}\n\nプレイヤーは沈黙しています。NPCの反応を生成してください(反応がなければ空配列でよい)。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 900, 1, cacheableRules);
      if (parsed?.lines?.length) {
        const npcOnly = parsed.lines.filter((l) => l.speaker !== userName);
        addLog(npcOnly.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text })));
      }
      if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
    } catch (e) {
      // 沈黙のターンなので、通信エラーでも静かに進める
    }
    setBusy(false);
    setTurnLabel((t) => t + 1);
    if (pendingMajorityWin) { triggerWolfMajorityReveal(); return; }
    const nextActionTurns = discussionTurns + 1;
    if (nextActionTurns >= 5) {
      addLog([{ type: "system", text: "そろそろ結論を出す時間です。投票する人を選んでください。" }]);
      goToVoteRound1();
    } else {
      setDiscussionTurns(nextActionTurns);
    }
  }

  // ---------------- 人狼/狂人/共有者 密談(メインログに統合、専用UIなし) ----------------
  // 密談の相手(NPC)を決める共通処理。人狼/狂人/共有者のペアが対象。
  // 寝返ったジョーカーは対象外:ジョーカーは人狼を知るが、人狼はジョーカーの寝返りを知らない(一方通行)ため、密談は成立しない。
  // 戻り値: { ally, pairType } (pairType: "wolf" | "madman" | "sharer") / 相手がいなければ null
  function getAllyPartner(playerList = players) {
    const me = playerList.find((p) => p.isUser);
    if (!me) return null;
    if (me.role === "人狼") {
      const wolf = playerList.find((p) => p.role === "人狼" && !p.isUser && p.alive);
      return wolf ? { ally: wolf, pairType: "wolf" } : null;
    }
    if (me.role === "狂人") {
      const partner = playerList.find((p) => p.role === "狂人" && !p.isUser && p.alive);
      return partner ? { ally: partner, pairType: "madman" } : null;
    }
    if (me.role === "共有者") {
      const partner = playerList.find((p) => p.role === "共有者" && !p.isUser && p.alive);
      return partner ? { ally: partner, pairType: "sharer" } : null;
    }
    return null;
  }

  // 密談の履歴と、正しいラベルを取得する共通ヘルパー。
  // プレイヤーの役職によって「人狼陣営の密談」か「共有者ペアの密談」かが変わるため、決め打ちしない。
  function getAllyChatInfo() {
    const log = logRef.current.filter((e) => e.type === "ally").map((e) => `${e.speaker}: ${e.text}`).join("\n");
    if (!log) return null;
    const me = getUser();
    if (!me) return null;
    // 相手が既に死亡していても、過去の密談履歴は生存者(当事者)の記憶として残るため、生死を問わずペア種別を判定する
    let pairType = null;
    let allyName = null;
    if (me.role === "人狼") {
      pairType = "wolf";
      allyName = players.find((p) => p.role === "人狼" && !p.isUser)?.name || null;
    } else if (me.role === "狂人") {
      pairType = "madman";
      allyName = players.find((p) => p.role === "狂人" && !p.isUser)?.name || null;
    } else if (me.role === "共有者") {
      pairType = "sharer";
      allyName = players.find((p) => p.role === "共有者" && !p.isUser)?.name || null;
    } else {
      return null;
    }
    const isWolfPair = pairType === "wolf" || pairType === "madman";
    const label = isWolfPair
      ? "人狼陣営の密談履歴(人狼・寝返ったジョーカーを含む人狼陣営だけが知っている。村側のNPCはこの内容を一切知らない)"
      : "共有者ペアの密談履歴(このペアだけが知っている。他の誰も知らない)";
    return { log, label, isWolfPair, isSharerPair: !isWolfPair, allyName };
  }

  async function sendAllyMessage() {
    const msg = input.trim();
    if (!msg || busy) return;
    const me = getUser();
    const partnerInfo = getAllyPartner();
    if (!partnerInfo) {
      addLog([{ type: "system", text: "相方は既にいないため、密談はできません。" }]);
      setInput("");
      return;
    }
    const { ally, pairType } = partnerInfo;
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    addLog([{ type: "ally", speaker: userName, text: msg }]);
    setBusy(true);
    const allyTranscript = logRef.current.filter((e) => e.type === "ally").map((e) => `${e.speaker}: ${e.text}`).join("\n");
    const mainTranscript = getTranscript();
    // 重要:このNPCが実際に知り得る情報だけを渡す(全員の役職を渡さない)。
    // ペア役職(人狼・狂人・共有者)は自分と相方の正体だけを知っており、他の人の正体は知らない。
    const meRoleLabel = me.role;
    const allyRoleLabel = ally.role;
    const knownInfo = `あなた(${ally.name})の役職: ${allyRoleLabel}\n相方(プレイヤー「${userName}」)の役職: ${meRoleLabel}\n(これ以外の人物の正体は、あなたも知りません。ジョーカーが寝返っているかどうかも知りません。憶測で断定的に話さないこと)\n**現在の生存者(絶対厳守。これ以外の人は既に死亡しており、夜の襲撃先や話題の対象にできない)**: ${alivePlayers().map((p) => p.name).join("、")}\n公開情報として確定している白: ${confirmedWhite.join("、") || "なし"} / 公開情報として確定している黒: ${confirmedBlack.join("、") || "なし"}\n**現在のCO状況**: ${getClaimStatusText()}`;

    const teamLabel = pairType === "sharer" ? "共有者" : "人狼陣営";
    const system = `あなたは人狼ゲームの${allyRoleLabel}NPC「${ally.name}」(${ally.personality}・${ally.club})です。プレイヤーはあなたの仲間(同じ${teamLabel})です。二人だけの密談で、村には聞こえません。仲間らしく本音で相談してください。
${knownInfo}
**絶対厳守**:あなたが知らないはずの情報(他人の正体・処刑者の正体など、上記に書かれていないこと)を、断定的に話さない。分からないことは「分からない」「〇〇じゃないかと思う(推測)」と扱う。${pairType === "madman" ? `狂人は人狼陣営に洗脳されており、あなた(${ally.name})は現在、自分を「${madmanDelusions[ally.name] || "人狼"}」だと本気で信じ込んでいます(演技ではない)。相方のプレイヤーも同じ人狼陣営の仲間だと認識しています。この思い込みに沿って密談を進めてください。ただし本物の人狼が誰かは知りません。襲撃の指示や実行は実際にはできません。` : ""}${pairType === "wolf" ? "人狼陣営は誰が狂人かは知りません。今夜の襲撃先の相談はできますが、根拠は憶測・観察に基づくものにする(断定的な役職名指しをしない)。" : ""}
**重要**:本編(教室での議論)で実際に起きた具体的な出来事(誰が何をCOしたか、誰が処刑・襲撃されたか、誰の発言が気になったか等)を踏まえて、中身のある相談をする。当たり障りのない相槌だけで終わらせず、本編の会話ログを踏まえた具体的な言及を必ず含める。
JSON形式のみ: {"text":"セリフ"}`;
    const userPrompt = `本編(教室)の会話ログ:\n${mainTranscript}\n\n密談の会話:\n${allyTranscript}\n\n直前のプレイヤーの発言を踏まえ、本編の具体的な出来事に言及しながら返答を生成してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 500);
      addLog([{ type: "ally", speaker: ally.name, text: parsed?.text || "……そうだな。" }]);
    } catch (e) {
      addLog([{ type: "system", text: "通信エラー" }]);
    }
    setBusy(false);
  }

  // ---------------- プレイヤー自身が決選投票候補の場合の弁明発言 ----------------
  async function sendDefenseStatement() {
    if (!input.trim() || busy) return;
    const msg = input.trim();
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    addLog([{ type: "user", speaker: userName, text: msg }]);
    setBusy(true);

    const npcs = otherAliveNPCs();
    const transcript = getTranscript();
    const activeBoxes = relevantBoxesForAliveRoles(alivePlayers());
    const cacheableRules = [buildRules(...activeBoxes), getStaticGameContextBlock()];
    const system = `あなたは人狼ゲームのGMです。
${getGroundTruthBlock()}
各NPCのプレイヤー(${userName})への好感度(0〜100、内部数値。プレイヤーには絶対見せない): ${npcs.map((n) => `${n.name}: ${npcAffinity[n.name] ?? 50}`).join("、")}
**好感度を口調・態度に反映させる**:好感度が高いNPCは弁明を好意的に受け止めやすく、低いNPCは厳しく聞く(ただし理屈が通っていれば低くても納得してよい)。
決選投票中、プレイヤー「${userName}」が自ら弁明・反論を述べました。生存NPC(${npcs.map((n) => n.name).join("、")})のうち2〜3人が短く反応してください。この弁明が説得力を持てば態度を軟化させ、弱ければ引き続き疑いを見せてよい(不当に必ず信じさせない)。
絶対厳守:speakerに「${userName}」を使わない。
**CO(自称役職)の抽出**:プレイヤーの弁明の中で役職を自称した場合、または反応するNPCが新たにCOした場合、roleClaimsとして報告する(なければ空オブジェクト)。
**好感度の変化**:この弁明を聞いた各NPCのプレイヤーへの心証の変化を、-10〜+10の範囲でaffinityChangesとして報告する(説得力があれば上がり、言い訳がましい・矛盾していれば下がる。変化がなければ省略可)。
JSON形式のみ: {"lines":[{"speaker":"名前","text":"セリフ"}], "affinityChanges": {"名前": 増減値, ...}, "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `これまでの経緯:\n${getHistoryContext()}\n\nプレイヤーの弁明:「${msg}」\n\nNPCの反応を生成してください。`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 1100, 1, cacheableRules);
      if (parsed?.lines) {
        const npcOnly = parsed.lines.filter((l) => l.speaker !== userName);
        addLog(npcOnly.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text })));
      }
      if (parsed?.affinityChanges) {
        setNpcAffinity((prev) => {
          const next = { ...prev };
          Object.entries(parsed.affinityChanges).forEach(([name, delta]) => {
            if (next[name] !== undefined && typeof delta === "number") next[name] = Math.max(0, Math.min(100, next[name] + Math.max(-10, Math.min(10, delta))));
          });
          return next;
        });
      }
      if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
    } catch (e) {
      addLog([{ type: "system", text: `通信エラーが発生しました。(${lastApiError || "原因不明"})` }]);
    }
    setBusy(false);
  }

  // ---------------- 疑惑度の取得(LLM) ----------------
  async function getSuspicionWeights(pool, contextLabel) {
    if (pool.length === 0) return {};
    if (pool.length === 1) return { [pool[0]]: 100 };
    const transcript = getTranscript();
    const system = `会話ログだけを根拠に、各人物の「疑わしさ」を0〜100の数値で見積もってください。合計はおよそ100。証拠がなければ均等に近く。正体は見ずに、会話上の印象だけで判断してください。最も疑わしい1人について、簡潔な理由も添えてください(後で「なぜその人を選んだのか」と聞かれた時に一貫して説明できるように)。
出力は必ずJSON形式のみ: {"weights": {"名前": 数値, ...}, "topReason": "最も疑わしい人物を選んだ簡潔な理由(会話の中の具体的な根拠に基づく)"}`;
    const userPrompt = `対象: ${pool.join("、")}\n用途: ${contextLabel}\n\n会話ログ:\n${transcript || "(まだ会話なし)"}`;
    try {
      const raw = await callClaude(system, userPrompt, 500);
      const parsed = parseJSON(raw);
      if (parsed?.weights) {
        const w = {};
        pool.forEach((n) => (w[n] = typeof parsed.weights[n] === "number" ? parsed.weights[n] : 100 / pool.length));
        w.__topReason = parsed.topReason || "";
        return w;
      }
    } catch (e) {}
    const w = {};
    pool.forEach((n) => (w[n] = 100 / pool.length));
    return w;
  }

  // 人狼の襲撃対象選び:単なる「怪しさ」ではなく、村側の情報源として脅威になっている人物を最優先で狙う
  async function getWolfThreatWeights(pool, transcript) {
    if (pool.length === 0) return {};
    if (pool.length === 1) return { [pool[0]]: 100 };
    const claimText = pool.map((n) => `${n}: ${roleClaims[n] ? `${roleClaims[n].role}をCO(${roleClaims[n].sinceDay}日目〜)` : "何もCOしていない"}`).join("、");
    const system = `あなたは人狼陣営の視点で、今夜襲撃すべき最適な相手を判断します。**単なる「怪しさ」ではなく、村側にとっての脅威度で判断してください**。
最優先で狙うべきは:①**明示的なCO状況データで占い師・霊媒師・狩人・共有者を名乗っている(CO済みの)人物** ②村の議論を主導し、投票の流れを決定づけている人物。これらは村側の情報源・司令塔であり、放置すると人狼側が不利になり続けます。
逆に、まだ何もCOしていない・目立たない人物を優先して狙う理由は薄いです(倒しても村の弱体化に繋がりにくい)。
出力は必ずJSON形式のみ: {"weights": {"名前": 数値, ...}}(合計はおよそ100、脅威度が高いほど大きい数値)`;
    const userPrompt = `今夜の襲撃候補と、それぞれの明示的なCO状況(必ずこれを根拠にする): ${claimText}\n\n会話ログ(議論の主導権などの補足判断材料):\n${transcript || "(まだ会話なし)"}\n\n村側への脅威度で重み付けしてください。`;
    try {
      const raw = await callClaude(system, userPrompt, 500);
      const parsed = parseJSON(raw);
      if (parsed?.weights) {
        const w = {};
        pool.forEach((n) => (w[n] = typeof parsed.weights[n] === "number" ? parsed.weights[n] : 100 / pool.length));
        return w;
      }
    } catch (e) {}
    const w = {};
    pool.forEach((n) => (w[n] = 100 / pool.length));
    return w;
  }

  // 相性・確定情報を反映した最終重みを計算する
  function applyCompatAndConfirmed(baseWeights, forName) {
    const w = { ...baseWeights };
    Object.keys(w).forEach((name) => {
      if (confirmedWhite.includes(name)) {
        w[name] = 0; // 確定シロは除外
        return;
      }
      const compat = compatMap[forName];
      if (compat) {
        if (compat.likes?.includes(name)) w[name] *= 0.5; // 好意がある相手は疑いにくい
        if (compat.dislikes?.includes(name)) w[name] *= 1.5; // 反りが合わない相手は疑いやすい
      }
    });
    return w;
  }

  // ---------------- 1回目投票 ----------------
  async function goToVoteRound1() {
    // 安全策:投票に入る前に念のため勝敗判定をやり直す(判定漏れによる無限ループを防ぐ)
    const win = checkWin(players);
    if (win) {
      finishGame(win);
      return;
    }
    setPhase("vote_round1");
    setTurnLabel(6);
  }

  // 投票を「互いを知っている単位(ペア/単独)」ごとに分けて、各NPCが実際に知っている情報だけで生成する共通処理。
  // グループ間で情報は漏れない(人狼のプロンプトに狂人は載らない、村側のプロンプトに人狼は載らない)。並列で呼び出す。
  async function collectSplitVotes({ voteLabel, targetsHint, wolfExtraNote, maxTokens, delusionsOverride = null, transcriptText, eligibleTargets = null }) {
    const groups = getVoteGroups();
    const results = [];

    const allyChatInfo = getAllyChatInfo();

    const tasks = groups.map((g) => async () => {
      const isWolfSide = g.npcs.some((p) => isWolfTeamNPC(p));
      const knowledgeLines = g.npcs.map((p) => getNPCOwnKnowledge(p, delusionsOverride)).join("\n");
      const cacheableRules = [buildRules(...g.boxes), getStaticGameContextBlock()]; // グループごとの箱の組み合わせは固定なので、キャッシュがよく効く
      // 密談の相方が「このグループ」に含まれている場合だけ、密談履歴をそのグループへ渡す(人狼陣営・共有者ペアどちらも対応)
      const groupHasAlly = allyChatInfo && g.npcs.some((p) => p.name === allyChatInfo.allyName);
      const system = `あなたは人狼ゲームのGMです。今は「${g.label}」グループのNPCの投票だけを決めます。
**このプロンプトには、このグループのNPCが実際に知っている情報しか書かれていません。他のグループの誰が何の役職かは一切分かりません。**
各NPCが知っていること(**各NPCは自分の行に書かれたことと公開情報だけを知っている**。同じグループの相方の行は、その相方とペアである場合のみ共有される):
${knowledgeLines}
**絶対厳守**:上記の中に、自分の相方以外の行に書かれた役職・正体の情報が目に入ったとしても、そのNPC自身は公開の場でCOされていない限りこの情報を一切知らない。**「見たけど使わない」のではなく、「そもそも自分はこんな話を聞いたことがない」という、単純に知らない・関わりのない立場として判断する**(「それは嘘だ」と積極的に否定・断定するわけではない。ただ知らないだけ)。投票理由に、この情報を確信の根拠として書かせない。
${g.note || ""}
${groupHasAlly ? `**${allyChatInfo.label}**:\n${allyChatInfo.log}\n密談で「〇〇に投票しよう」等の方針が話し合われていた場合、その方針と矛盾しない投票にする(絶対厳守)。` : ""}
${getPublicInfoLine()}
${getPlayerBlindnessNote()}
${voteLabel}。以下のNPC(${g.npcs.map((n) => n.name).join("、")})の投票先を決めてください。${targetsHint}
${isWolfSide ? `**人狼陣営の投票方針**:本物の人狼が全滅すれば即座に村の勝利になるため、本物の人狼を処刑させないことが最優先。**現在の生存者数は${alivePlayers().length}人。この数が少なくなるほど、人狼陣営(人狼+狂人+寝返ったジョーカー)が村側と同数に近づき、同数以上になった瞬間に人狼陣営の勝利が確定する**(詳しい内訳は分からなくても、生存者が少なくなっている実感は持ってよい)。序盤〜中盤は正体を隠すことを優先し、無理に村側を狙い撃ちしない。しかし**生存者が少なくなってきた終盤は話が変わり、対立する2人のどちらが本物の村側か確信が持てなくても、多少強引・不自然な理由付けになっても、村側である可能性が少しでも高い方への投票を優先する**(この局面ではバレるリスクより数的優位を逃すリスクの方が大きい)。それ以外の場面では、村側の有力な情報源(CO済みの占い師・霊媒師・狩人・確定シロ等)に票を集めるか、票を分散させる。ただし判で押したように同じ投票をすると不自然なので、性格に応じた表向きの(村人らしい)理由を個別に作る。${wolfExtraNote || ""}` : `各NPCは、自分が知っていることと会話ログの印象だけを根拠に**独立に**判断する。誰が人狼・狂人かは分からない。会話の中の矛盾・不自然さ・後出し・投票の偏りなど、観察できる根拠だけで疑う。根拠が薄ければ疑いも薄くする。確定シロには投票しない。
**投票の収束度合いは、以下の根拠チェックリストに照らして機械的に判断する(絶対厳守・重要)**:「決定打があるかないか」を曖昧な印象で決めず、実際に会話ログの中に以下のどの根拠が・誰について・いくつ存在するかを具体的に確認してから、収束度合いを決める。**このゲームには「単独で確定させられる根拠」は存在しない(絶対厳守)**:占い・霊媒結果は「本人がそう主張しているだけ」であり(その占い師/霊媒師自身が本物とは限らない)、複数の結果が一致していても、後から出た方が先に公表された結果へ便乗しているだけの可能性を否定できない。したがって、**占い・霊媒結果を含め、以下は全て同格の「中程度の根拠」として扱い、複数積み重なって初めて強い収束の理由になる**。
【根拠(それぞれ単独では収束の理由にしない。複数積み重なって初めて収束してよい)】
・占い結果や霊媒結果が、その人物を黒(人狼)と判定している(占い・霊媒が複数一致していても、同格の根拠が2つ重なったものとして扱う。それだけで自動的に「強い根拠」に格上げしない)
・その人物が、結果的に人狼/狂人だと確定した人物を、過去に明確な理由をつけて擁護・庇う発言をしていた(単なる相槌ではなく、明確な擁護)
・複数のNPCが、それぞれ独立した具体的な理由(発言内容の矛盾、過去の言動との食い違いなど)で同じ人物を名指ししている。**ただし、単に発言力のある人物・好感度が高い人物の意見にそのまま同調しているだけの発言は、独立した根拠として数えない**(頭数が多く見えても、実質1人分の根拠として扱う)
・その人物の言動が、自分自身の過去の発言や表明した性格と明確に矛盾している
【信用の積み重ね・時間の経過で蓄積する根拠】
・単独CO(対抗なし)の状態が、複数日(2日以上)にわたって継続し、その間一度も矛盾・言い直し・つじつまの合わない点が生じていない(一貫性が長期間保たれている)
・その人物の過去の指摘・疑い・投票判断が、後の処刑結果や霊媒結果によって実際に正しかったと繰り返し証明されている(的中実績。1回では偶然の域を出ないが、2回以上続くと信頼できる判断力の証拠になる)
・その人物が過去に、実際に人狼/狂人だった相手を議論で的確に追及し、対抗COを引き出す・矛盾を暴く等の成果を上げたことがある
【弱い根拠・これだけでは収束させない、複数人が別々に感じていても票を集中させる理由にしない】
・発言量が多い/少ない、なんとなく印象が薄い、性格的になんとなく怪しく見える、というだけの主観的な印象
**判定手順**:上記の根拠(信用の積み重ね含む)が2つ以上明確に積み重なっている場合は、ある程度〜強く収束してよい(ただし満場一致は避ける)。根拠が1つ以下、または弱い根拠のみの場合は、票を3〜5人程度に分散させ、割れた状態にする。**根拠が1つしかない状態で、複数のNPCが一斉に同じ人物へ強く収束することは絶対に避ける**(その1つの根拠を、各キャラクターがどれだけ信じるかは、性格・好感度によって個体差があってよい)。`}
理由も短く。**絶対厳守:投票理由の中で、まだ公の場でCOしていない自分の役職を、うっかり漏らすような書き方を絶対にしない**(例:狩人としてまだCOしていない人物が、投票理由に「狩人として〜」と書くのは禁止)。理由に使ってよい根拠は、既に公開の場で判明している情報と、観察できる言動だけ。もし性格的に「うっかり口を滑らせる」演出をどうしても入れたい場合は、それ自体をroleClaimsとして必ず報告すること(下記参照)。
**絶対厳守:人狼陣営の投票理由にも、内心の真の動機(「かき乱したい」「仲間を守るため」「人狼だから」等)を一切書かない**。投票理由の文面は、それを読んだ村側のNPCが見ても違和感を抱かない、もっともらしい村人目線の理由だけにする(本当の動機は内心にあってもよいが、reasonの文章には絶対に出さない)。
絶対厳守:votesにプレイヤー「${userName}」を含めない。上記のNPC以外の名前もvoterに使わない。
**CO(自称役職)の抽出**:投票理由の中で誰かが新たに役職を自称した場合(上記の禁止事項に反してでも生成してしまった場合を含む)、roleClaimsとして報告する(なければ空オブジェクト)。
${isWolfSide ? "" : `**evidence(絶対厳守・重要)**:各投票に、根拠の強さを"strong"か"weak"のどちらかで必ず添える。**"strong"にできるのは、上記チェックリストの根拠(信用の積み重ね含む)が実際に2つ以上明確に積み重なっている場合のみ**。それ以外(根拠1つ以下・弱い根拠のみ・単なる印象)は必ず"weak"にする。**"weak"と判定した場合、targetは実際に誰に投票させたいかではなく、ダミーで構わない(このtargetは後で使われない)**。自己申告に頼らず、正直に判定すること。`}
JSON形式のみ: {"votes": [{"voter":"名前","target":"名前","reason":"短い理由"${isWolfSide ? "" : `,"evidence":"strong または weak"`}}], "roleClaims": {"名前": "自称した役職", ...}}`;
      const runVoteCall = () => callClaudeAutoRetry(system, `これまでの会話:\n${transcriptText}\n\n各NPCの投票先を決めてください。`, maxTokens, 1, cacheableRules);
      try {
        let parsed;
        try {
          parsed = await runVoteCall();
        } catch (firstErr) {
          // このグループの投票生成が失敗した場合、票が丸ごと消えて生存者数と投票数が食い違う原因になるため、
          // 諦める前にもう一度だけ試す(他のNPCと同様、投票は全員分揃うことが前提のため)
          parsed = await runVoteCall();
        }
        if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
        const groupVotes = (parsed?.votes || []).filter((v) => g.npcs.some((p) => p.name === v.voter));
        // 共有者・狂人は、それぞれの相方(ペア)の正体をゲーム開始時から確実に知っている。
        // 共有者の相方は本物の非人狼、狂人の相方は同じ人狼陣営の仲間であり、
        // どちらの場合も自分の相方に投票することに論理的な意味がない(共有者なら無根拠な誤爆、
        // 狂人なら自陣営の頭数を自ら減らすだけの損な手)。ルール文だけでは守られないことがあるため、
        // コード側で強制的に他の対象へ差し替える(重要な安全網)。
        const fixKnownPartnerSelfVote = (v) => {
          const voter = g.npcs.find((p) => p.name === v.voter);
          if (voter?.role !== "共有者" && voter?.role !== "狂人") return v;
          const partner = players.find((q) => q.role === voter.role && q.name !== voter.name);
          if (!partner || v.target !== partner.name) return v;
          const pool = (eligibleTargets || alivePlayers().map((p) => p.name)).filter((n) => n !== v.voter && n !== partner.name);
          if (pool.length === 0) return v;
          return { ...v, target: pickRandom(pool), reason: "相方以外の、別の人物の言動の方が気になったから" };
        };
        if (isWolfSide) return groupVotes.map(fixKnownPartnerSelfVote); // 人狼陣営は根拠ではなく戦略で動くため、weak判定の対象外
        // evidenceが"weak"(根拠不十分)と申告された投票は、AIが選んだ相手を採用せず、
        // コード側で完全に均等な確率のランダム抽選に差し替える(「弱い根拠なのに実は本物へ寄っている」余地をなくすため)。
        const weakReasons = ["まだ確信は持てないけど、なんとなく気になって。", "決め手はないけど、少し様子を見たい相手として。", "これといった根拠はないけど、念のため。", "はっきりした理由はないけど、なんとなく引っかかったから。"];
        return groupVotes.map((v) => {
          if (v.evidence !== "weak") return v;
          const pool = (eligibleTargets || alivePlayers().map((p) => p.name)).filter((n) => n !== v.voter);
          if (pool.length === 0) return v;
          // targetだけでなくreasonも差し替える(AIが書いた理由は差し替え前の対象について書かれているため、
          // targetだけ変えると理由と矛盾した投票になってしまう)
          return { ...v, target: pickRandom(pool), reason: pickRandom(weakReasons) };
        }).map(fixKnownPartnerSelfVote);
      } catch (e) {
        return null; // 2回試しても失敗した場合のみ、このグループだけ諦める(他のグループの票は活かす)
      }
    });

    // 並列数を2に制限(4グループ同時だとレート制限に当たりやすいため)
    const settled = [];
    for (let i = 0; i < tasks.length; i += 2) {
      const chunk = await Promise.all(tasks.slice(i, i + 2).map((fn) => fn()));
      settled.push(...chunk);
    }
    let anySuccess = false;
    settled.forEach((votes) => {
      if (votes) { anySuccess = true; results.push(...votes); }
    });
    if (!anySuccess && groups.length > 0) throw new Error("投票生成に失敗");
    return results;
  }

  async function submitVoteRound1(overrideTarget) {
    const userIsAlive = getUser()?.alive;
    const effectiveTarget = overrideTarget || voteTarget;
    if ((userIsAlive && !effectiveTarget) || busy) return;
    setBusy(true);
    const aliveNames = alivePlayers().map((p) => p.name);

    try {
      const npcVotes = await collectSplitVotes({
        voteLabel: `${day}日目の1回目投票。投票は全員同時に行われる(他の人が誰に入れたかを見てから決める、という順番はない)。${userIsAlive ? "プレイヤーも既に投票済みだが、その内容はまだ他の誰にも分からない。" : "プレイヤーは既に死亡しており投票権がない。"}`,
        targetsHint: "投票先は生存者の中から選ぶ(自分自身には投票しない)。",
        wolfExtraNote: "",
        maxTokens: 1800,
        transcriptText: getHistoryContext(),
        eligibleTargets: aliveNames,
      });
      const tally = userIsAlive ? { [effectiveTarget]: 1 } : {};
      const lines = userIsAlive ? [{ type: "system", text: `${userName}: ${effectiveTarget} に投票` }] : [];
      const votedNpcNames = new Set();
      npcVotes.forEach((v) => {
        if (v.voter === userName) return; // AIが誤ってプレイヤー自身の投票を含めてきた場合、二重集計を防ぐ
        if (aliveNames.includes(v.target) && v.target !== v.voter) {
          tally[v.target] = (tally[v.target] || 0) + 1;
          lines.push({ type: "npc", speaker: v.voter, text: `(${v.target}に投票) ${v.reason || ""}` });
          votedNpcNames.add(v.voter);
        }
      });
      // グループ単位のAI呼び出しが失敗し続けた場合、そのNPC分の票が丸ごと欠けてしまう。
      // 生存者数と投票数を一致させるため、投票できなかったNPCにはランダムな投票を補完する。
      otherAliveNPCs().forEach((p) => {
        if (votedNpcNames.has(p.name)) return;
        const candidates = aliveNames.filter((n) => n !== p.name);
        if (candidates.length === 0) return;
        const fallbackTarget = pickRandom(candidates);
        tally[fallbackTarget] = (tally[fallbackTarget] || 0) + 1;
        lines.push({ type: "npc", speaker: p.name, text: `(${fallbackTarget}に投票) やっぱりこの人が一番気になるかな` });
      });
      // 好感度の更新:自分に投票してきたNPCへの心証は下がる(相互不信)。自分が投票した相手からの心証も下がる。
      setNpcAffinity((prev) => {
        const next = { ...prev };
        npcVotes.forEach((v) => {
          if (v.target === userName && next[v.voter] !== undefined) {
            next[v.voter] = Math.max(0, next[v.voter] - 8);
          }
        });
        if (userIsAlive && next[effectiveTarget] !== undefined) {
          next[effectiveTarget] = Math.max(0, next[effectiveTarget] - 10);
        }
        return next;
      });
      addLog(lines);
      addLog([{ type: "system", text: `【1回目投票結果】${Object.entries(tally).map(([k, v]) => `${k}:${v}票`).join(" / ")}` }]);

      const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
      const top2 = [sorted[0][0]];
      // 2位タイの処理
      const secondScore = sorted[1]?.[1];
      const tiedForSecond = sorted.filter(([, v], i) => i > 0 && v === secondScore).map(([n]) => n);
      if (tiedForSecond.length > 0) {
        top2.push(pickRandom(tiedForSecond));
      }
      setDefenseCandidates(top2);
      setDefenseReacted(false);
      const freshDelusions = updateMadmanDelusionsForDecisiveVote(top2, players);
      setVoteRound1Tally(tally);
      addLog([{ type: "system", text: `上位2名:${top2.join("さん・")}さんが決選投票に進みます。` }]);
      setPhase("defense");
      setDefenseLoading(true);
      await runDefensePhase(top2, freshDelusions);
      setDefenseLoading(false);
    } catch (e) {
      addLog([{ type: "system", text: "投票処理でエラーが発生しました。" }]);
    }
    setVoteTarget(null);
    setBusy(false);
  }

  // ---------------- 弁明タイム ----------------
  async function runDefensePhase(candidates, delusionsOverride = null) {
    const npcCandidates = candidates.filter((n) => n !== userName);
    if (npcCandidates.length === 0) {
      addLog([{ type: "system", text: "【弁明タイム】(候補が両方ともプレイヤーのため、この場面は省略されます)" }]);
      return;
    }
    const candidateInfo = npcCandidates.map((n) => {
      const p = players.find((pp) => pp.name === n);
      return `${p.name}(${p.personality}・${p.club})`;
    }).join("\n");
    const bystanders = otherAliveNPCs().filter((p) => !candidates.includes(p.name));
    const transcript = getTranscript();
    const activeBoxes = ["CORE", "DEFENSE_PLEA", ...relevantBoxesForAliveRoles(alivePlayers()).filter((b) => b !== "CORE" && b !== "SHARER")];
    const cacheableRules = [buildRules(...activeBoxes), getStaticGameContextBlock()];
    const system = `あなたは人狼ゲームのGMです。
決選投票候補(NPCのみ。プレイヤー「${userName}」自身が候補の場合、プレイヤーの弁明は本人が書くのでここでは絶対に生成しない):\n${candidateInfo}
その他の生存NPC(傍観者、候補ではない): ${bystanders.map((p) => p.name).join("、") || "なし"}
${getGroundTruthBlock({ delusionsOverride })}
それぞれの候補に処刑を回避するための弁明をさせてください。**役職者に、無抵抗・沈黙のまま処刑を受け入れさせない(絶対厳守)**:正体をはっきり明かすか、ぼかしたまま訴えるかは、リスク判断としてキャラクター自身の選択に委ねてよい(例えば狩人は、名乗れば今後人狼に狙われやすくなるため、あえてぼかす判断も自然)。ただし**「何もしない」という選択肢だけは取らせない**:COする、根拠を並べて反論する、他の候補への疑いを強める等、必ず何らかの能動的な抵抗を試みる(DEFENSE_PLEA箱の指示を優先する)。人狼陣営なら多段階の言い訳や開き直りなど性格に応じて。
**重要**:弁明タイムは候補者だけの場ではない。**傍観者のNPCも、緊急性の高い割り込み(対抗CO、決定的な指摘など)があれば、この場で発言してよい**。「弁明タイム中だから言えなかった」という制約は存在しない。ただし全員が毎回割り込む必要はなく、言うべきことがある人だけでよい。
絶対厳守:speakerに「${userName}」を使わない。
**CO(自称役職)の抽出**:この弁明タイムで新たにCOが発生した、または主張が変わった場合、roleClaimsとして報告する。なければ空オブジェクトでよい。
${buildCounterCoEscalationNote(alivePlayers())}
JSON形式のみ: {"lines":[{"speaker":"名前","text":"セリフ"}], "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `これまでの経緯:\n${getHistoryContext()}\n\n弁明タイムのセリフを生成してください(各候補1〜2回発言。傍観者の割り込みがあれば含める)。`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 2600, 1, cacheableRules);
      let npcOnly = (parsed?.lines || []).filter((l) => l.speaker !== userName);
      if (npcOnly.length === 0) {
        // 生成結果が空(全てプレイヤー名義で除外された等)だった場合、もう一度だけ試す
        const parsed2 = await callClaudeAutoRetry(system, userPrompt + "\n\n(前回は有効なセリフが得られませんでした。必ずNPCのセリフを生成してください)", 2600, 1, cacheableRules);
        npcOnly = (parsed2?.lines || []).filter((l) => l.speaker !== userName);
      }
      if (npcOnly.length > 0) {
        const checked = await selfCheckAndFix(npcOnly, activeBoxes, "決選投票の弁明タイム(重要な山場)", getGroundTruthBlock({ delusionsOverride }));
        addLog([{ type: "system", text: "【弁明タイム】" }, ...checked.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text }))]);
      } else {
        addLog([{ type: "system", text: "【弁明タイム】候補者たちは、それぞれの態度を崩さないまま沈黙しています。" }]);
      }
      if (candidates.includes(userName)) {
        addLog([{ type: "system", text: `${userName}、あなたも決選投票の対象です。反論・弁明があれば、下の入力欄から発言してください。` }]);
      }
      if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
    } catch (e) {
      addLog([{ type: "system", text: "【弁明タイム】(通信エラーのため、この場面は省略されました)" }]);
    }
  }

  // ---------------- 弁明タイムへのリアクション(発言・行動 共通、1回だけ) ----------------
  async function sendDefenseReaction(isAction) {
    if (!input.trim() || busy || defenseReacted) return;
    const msg = input.trim();
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    addLog([{ type: isAction ? "action" : "user", speaker: userName, text: msg }]);
    setBusy(true);
    setDefenseReacted(true);

    const npcs = otherAliveNPCs();
    const transcript = getTranscript();
    const activeBoxes = relevantBoxesForAliveRoles(alivePlayers());
    const cacheableRules = [buildRules(...activeBoxes), getStaticGameContextBlock()];

    const system = `あなたは人狼ゲームのGMです。
${getGroundTruthBlock()}
決選投票の弁明タイム中。候補は${defenseCandidates.join("・")}。プレイヤー「${userName}」が弁明を聞いた上で${isAction ? "行動を取りました(セリフではなく仕草・観察等)" : "発言しました"}。
**最重要**:これは会話ログの一番最後にある、プレイヤーの直前の発言・行動への反応である。それより前のやり取り(弁明の内容そのもの等)に今さら反応するのではなく、**今まさに起きたプレイヤーの発言・行動に対して**反応すること。時系列を混同しない。
これを受けて、候補者本人や周囲のNPC(2〜4人)が短く反応してください。候補者は動揺・開き直り・反論などで応じてよい。
絶対厳守:speakerに「${userName}」を使わない。
**CO(自称役職)の抽出**:この反応の中で誰かが新たにCOした、または主張を変えた場合、roleClaimsとして報告する(なければ空オブジェクト)。
${isAction ? `出力は必ずこのJSON形式のみ: {"narration":"行動の結果の地の文","lines":[{"speaker":"名前","text":"セリフ"}], "roleClaims": {"名前": "自称した役職", ...}}` : `出力は必ずこのJSON形式のみ: {"lines":[{"speaker":"名前","text":"セリフ"}], "roleClaims": {"名前": "自称した役職", ...}}`}`;
    const userPrompt = `これまでの経緯:\n${getHistoryContext()}\n\nプレイヤーの${isAction ? "行動" : "発言"}:「${msg}」\n\n反応を生成してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 1300, 1, cacheableRules);
      if (isAction && parsed?.narration) {
        addLog([{ type: "system", text: parsed.narration }]);
      }
      if (parsed?.lines?.length) {
        const npcOnly = parsed.lines.filter((l) => l.speaker !== userName);
        addLog(npcOnly.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text })));
      }
      if (parsed?.roleClaims) applyRoleClaims(parsed.roleClaims, day);
    } catch (e) {
      addLog([{ type: "system", text: `通信エラーが発生しました。(${lastApiError || "原因不明"}) もう一度リアクションできます。` }]);
      setDefenseReacted(false); // 通信エラー時は一度きりのリアクション権限を消費しない
    }
    setBusy(false);
  }

  // ---------------- 決選投票 ----------------
  async function submitVoteFinal(overrideTarget) {
    const userIsAlive = getUser()?.alive;
    const effectiveTarget = overrideTarget || voteTarget;
    if ((userIsAlive && !effectiveTarget) || busy) return;
    setBusy(true);

    try {
      const npcVotes = await collectSplitVotes({
        voteLabel: `決選投票。候補は${defenseCandidates.join("・")}の2名のみ。投票は全員同時に行われる(他の人が誰に入れたかを見てから決める、という順番はない)。${userIsAlive ? "プレイヤーも既に投票済みだが、その内容はまだ他の誰にも分からない。" : "プレイヤーは既に死亡しており投票権がない。"}`,
        targetsHint: `targetは${defenseCandidates.join("か")}のどちらか(候補者本人は自分以外の候補に投票)。相性・遺恨も反映。`,
        wolfExtraNote: "**重要**:村側の有力な情報源(CO済みの占い師・霊媒師・狩人・確定シロ等)が候補にいれば、そちらへ票を集める。自陣営(本物の人狼)が候補なら、もう一方の候補に票を入れて本物の人狼を守る。",
        maxTokens: 1600,
        transcriptText: getHistoryContext(),
        eligibleTargets: defenseCandidates,
      });
      const tally = { [defenseCandidates[0]]: 0, [defenseCandidates[1]]: 0 };
      if (userIsAlive) tally[effectiveTarget]++;
      const lines = userIsAlive ? [{ type: "system", text: `${userName}: ${effectiveTarget} に投票` }] : [];
      const votedNpcNames2 = new Set();
      npcVotes.forEach((v) => {
        if (v.voter === userName) return; // AIが誤ってプレイヤー自身の投票を含めてきた場合、二重集計を防ぐ
        if (defenseCandidates.includes(v.target) && v.voter !== v.target) {
          tally[v.target] = (tally[v.target] || 0) + 1;
          lines.push({ type: "system", text: `${v.voter} → ${v.target}` });
          votedNpcNames2.add(v.voter);
        }
      });
      // グループ単位のAI呼び出しが失敗し続けた場合、そのNPC分の票が丸ごと欠けてしまう。
      // 生存者数と投票数を一致させるため、投票できなかったNPCにはランダムな投票を補完する。
      otherAliveNPCs().forEach((p) => {
        if (votedNpcNames2.has(p.name)) return;
        const candidates = defenseCandidates.filter((n) => n !== p.name);
        if (candidates.length === 0) return;
        const fallbackTarget = pickRandom(candidates);
        tally[fallbackTarget] = (tally[fallbackTarget] || 0) + 1;
        lines.push({ type: "system", text: `${p.name} → ${fallbackTarget}` });
      });
      addLog(lines);
      addLog([{ type: "system", text: `【決選投票結果】${defenseCandidates.map((c) => `${c}:${tally[c]}票`).join(" / ")}` }]);

      let executed;
      if (tally[defenseCandidates[0]] === tally[defenseCandidates[1]]) {
        executed = pickRandom(defenseCandidates);
        addLog([{ type: "system", text: `同数のため、抽選で${executed}さんの処刑が決まりました。` }]);
      } else {
        executed = tally[defenseCandidates[0]] > tally[defenseCandidates[1]] ? defenseCandidates[0] : defenseCandidates[1];
      }

      const execPlayer = players.find((p) => p.name === executed);
      let updated = players.map((p) => (p.name === executed ? { ...p, alive: false } : p));
      addLog([{ type: "system", text: `${executed}さんが処刑されました。` }]);

      const jokerResult = triggerJokerAwakeningIfNeeded(execPlayer, updated);
      if (jokerResult.line) addLog([jokerResult.line]);

      // NPCジョーカーが処刑によって占い師を継承した場合、次の夜を待たず、この場で即座に誰かを占わせる
      // (継承直後にCOと結果を同時に出せるようにするため)。
      if (jokerResult.newlyInherited === "占い師") {
        const newJoker = updated.find((p) => p.role === "ジョーカー" && p.alive && !p.isUser);
        if (newJoker) {
          const pool = updated.filter((p) => p.alive && p.name !== newJoker.name && p.name !== executed && !confirmedWhite.includes(p.name) && !confirmedBlack.includes(p.name)).map((p) => p.name);
          const finalPool = pool.length > 0 ? pool : updated.filter((p) => p.alive && p.name !== newJoker.name && p.name !== executed).map((p) => p.name);
          if (finalPool.length > 0) {
            const suspicion = await getSuspicionWeights(finalPool, "ジョーカーが処刑継承直後に占う相手");
            const weighted = {};
            const uniformShare = 100 / finalPool.length;
            finalPool.forEach((n) => (weighted[n] = (suspicion[n] ?? uniformShare) * 0.55 + uniformShare * 0.45));
            const targetName = weightedPick(weighted) || pickRandom(finalPool);
            const targetPlayer = updated.find((p) => p.name === targetName);
            const result = targetPlayer.role === "人狼" ? "人狼" : targetPlayer.role === "ジョーカー" ? "ジョーカーである" : "人狼ではない";
            setNpcSeerLog((prev) => [...prev, { day, seerName: newJoker.name, target: targetName, result, reason: suspicion.__topReason || "" }]);
            setNpcJokerState((prev) => ({ ...prev, abilityUsed: true }));
          }
        }
      }

      // 霊媒師の結果は「真実の記録」として静かに保持するだけにする(強制的に登場させない)。
      // 他の役職と同じく、COするかどうかは会話の流れの中でNPC自身の判断に委ねる。
      const medium = updated.find((p) => p.role === "霊媒師" && p.alive);
      const jokerHasMedium = user.role === "ジョーカー" && jokerState.abilityBank === "霊媒師" && !jokerState.abilityUsed;
      const npcJokerWithMedium = updated.find((p) => p.role === "ジョーカー" && p.alive && !p.isUser && npcJokerState.abilityBank === "霊媒師" && !npcJokerState.abilityUsed);
      if (medium) {
        const isWolf = execPlayer.role === "人狼";
        setNpcMediumLog((prev) => [...prev, { day, mediumName: medium.name, target: executed, result: isWolf ? "人狼" : "人狼ではない" }]);
        setExecutionHistory((prev) => [...prev, { day, executed, trueRole: execPlayer.role }]);
        // この霊媒師が既にCO済みなら、新しい結果も翌朝には公表される前提で、その場で確定シロ/クロへ反映する
        if (roleClaims[medium.name]?.role === "霊媒師") pushConfirmedResult(executed, isWolf ? "人狼" : "人狼ではない");
        if (medium.isUser) {
          // プレイヤー自身が霊媒師の場合のみ、私的な情報として伝える(本人にしか分からない知識のため)
          setPrivateInfo((prev) => [...prev, `【霊媒結果】${executed}は「${isWolf ? "人狼でした" : "人狼ではありませんでした"}」`]);
          setPlayerMediumLog((prev) => [...prev, { day, target: executed, result: isWolf ? "人狼" : "人狼ではない" }]);
          if (roleClaims[userName]?.role === "霊媒師") pushConfirmedResult(executed, isWolf ? "人狼" : "人狼ではない");
        }
      } else if (jokerHasMedium) {
        // 本物の霊媒師は既に死亡しており、ジョーカーが能力を継承している場合
        const isWolf = execPlayer.role === "人狼";
        setExecutionHistory((prev) => [...prev, { day, executed, trueRole: execPlayer.role }]);
        setPrivateInfo((prev) => [...prev, `【継承した霊媒結果】${executed}は「${isWolf ? "人狼でした" : "人狼ではありませんでした"}」`]);
        setPlayerMediumLog((prev) => [...prev, { day, target: executed, result: isWolf ? "人狼" : "人狼ではない" }]);
        if (roleClaims[userName]?.role === "霊媒師") pushConfirmedResult(executed, isWolf ? "人狼" : "人狼ではない");
        setJokerState((prev) => ({ ...prev, abilityUsed: true }));
      } else if (npcJokerWithMedium) {
        // NPCジョーカーが霊媒師の能力を継承している場合、内部の真実記録として残す(会話への登場はAIの判断に委ねる)
        const isWolf = execPlayer.role === "人狼";
        setNpcMediumLog((prev) => [...prev, { day, mediumName: npcJokerWithMedium.name, target: executed, result: isWolf ? "人狼" : "人狼ではない" }]);
        setExecutionHistory((prev) => [...prev, { day, executed, trueRole: execPlayer.role }]);
        if (roleClaims[npcJokerWithMedium.name]?.role === "霊媒師") pushConfirmedResult(executed, isWolf ? "人狼" : "人狼ではない");
        setNpcJokerState((prev) => ({ ...prev, abilityUsed: true }));
      } else {
        setExecutionHistory((prev) => [...prev, { day, executed, trueRole: execPlayer.role }]);
      }

      setPlayers(updated);
      updateMadmanDelusionsForPopulation(updated);
      const win = checkWin(updated);
      if (win === "人狼陣営") {
        // 処刑直後に人狼側が過半数へ達した場合も、朝を迎えた時と同じ「数の力で押し切る」演出を挟む(演出側でbusyを管理する)
        triggerWolfMajorityReveal(updated);
        return;
      } else if (win === "村人陣営") {
        setBusy(false);
        finishGame(win, updated);
        return;
      } else {
        setVoteTarget(null);
        setDefenseCandidates([]);
        setPhase("night");
        setTurnLabel(7);
        addLog([{ type: "system", text: "夜になりました。" }]);
        generateDayDigest(day); // その日の要約を非同期で生成(UIはブロックしない)
      }
    } catch (e) {
      addLog([{ type: "system", text: "決選投票処理でエラーが発生しました。" }]);
    }
    setBusy(false);
  }

  // ---------------- 夜フェーズ ----------------
  async function resolveNight() {
    if (busy) return;
    setBusy(true);
    const user = getUser();
    const alive = alivePlayers();
    const npcWolves = alive.filter((p) => p.role === "人狼" && !p.isUser);
    const jokerInherited = user.role === "ジョーカー" && jokerState.abilityBank && !jokerState.abilityUsed ? jokerState.abilityBank : null;
    const userIsWolf = user.role === "人狼" || jokerInherited === "人狼";
    const userIsSeer = user.role === "占い師" || jokerInherited === "占い師";
    const userIsHunter = user.role === "狩人" || jokerInherited === "狩人";

    let updated = [...players];
    let nightLines = [];
    const transcript = getTranscript();

    // 判明済み狩人を最優先攻撃対象にする(パターン51)
    const revealedHunterName = null; // このアプリでは狩人は自分から公表するUIがないため、将来拡張用

    // 「今夜、護衛が発生しうるか(=本物の狩人がまだ生きている、またはジョーカーが狩人を継承済みで未使用)」を先に判定する。
    // これは人狼陣営の襲撃選定のランダム性を決めるために使う「ゲームマスター側の管理データ」であり、
    // 人狼の会話・セリフに「狩人が死んでいるから安全」のような形で明示的に語らせることはしない(あくまで抽選の確定度合いを調整するだけ)。
    const npcJokerHunterPrecheck = alive.find((p) => p.role === "ジョーカー" && !p.isUser && npcJokerState.abilityBank === "狩人" && !npcJokerState.abilityUsed);
    const hunterStillActive = !!(alive.find((p) => p.role === "狩人") || (userIsHunter ? user : null) || npcJokerHunterPrecheck);

    // 人狼の襲撃対象(単なる怪しさではなく、村側の情報源としての脅威度を優先する)
    let wolfTarget = null;
    if (userIsWolf) {
      wolfTarget = nightTarget;
    } else if (npcWolves.length > 0) {
      // 確定シロ(占いでシロと判定された人)でも、狩人・共有者等としてCOしていれば十分な襲撃価値があるため、対象プールから除外しない。
      // 人狼側へ寝返ったジョーカーも除外しない:人狼はジョーカーの寝返りを知らないため、知らずに味方を襲ってしまうのは寝返りのリスクとして自然。
      const finalPool = alive.filter((p) => p.role !== "人狼").map((p) => p.name);
      const threatWeights = await getWolfThreatWeights(finalPool, transcript);
      const weighted = {};
      finalPool.forEach((n) => (weighted[n] = threatWeights[n] ?? 10));
      if (hunterStillActive) {
        // 狩人による護衛(=読まれれば阻止される)リスクがあるため、対策として加重ランダムに散らす
        wolfTarget = weightedPick(weighted) || pickRandom(finalPool);
      } else {
        // 護衛リスクが存在しない以上、乱数で薄める理由がない。脅威度が最大の相手を確定的に選ぶ
        // (同点があれば、その中からランダムに1人選ぶ)
        const maxWeight = Math.max(...finalPool.map((n) => weighted[n]));
        const topCandidates = finalPool.filter((n) => weighted[n] === maxWeight);
        wolfTarget = pickRandom(topCandidates);
      }
    }

    // 狩人の護衛対象(本物の狩人は死亡している可能性があるため、ジョーカーの継承も考慮する)
    let guardTarget = null;
    const npcJokerHunter = npcJokerHunterPrecheck;
    const hunter = alive.find((p) => p.role === "狩人") || (userIsHunter ? user : null) || npcJokerHunter;
    if (hunter) {
      if (hunter.isUser) {
        guardTarget = nightTarget;
      } else {
        // 確定クロ(公表された結果で人狼と判明している人)は護衛対象から外す(狩人が人狼を守る意味はない)
        const pool = alive.filter((p) => p.name !== hunter.name && !confirmedBlack.includes(p.name)).map((p) => p.name);
        const weights = {};
        pool.forEach((n) => {
          weights[n] = confirmedWhite.includes(n) ? 5 : 10;
          // 本人の秘密の役職ではなく、公表(CO)されている役職を根拠にする(NPCが知り得ない情報を使わないため)
          const claimedRole = roleClaims[n]?.role;
          if (claimedRole === "占い師") weights[n] *= 12; // 公開情報として村の生命線、最優先で守る
          else if (claimedRole === "霊媒師" || claimedRole === "共有者") weights[n] *= 4;
        });
        guardTarget = weightedPick(weights) || pickRandom(pool);
        if (hunter === npcJokerHunter) setNpcJokerState((prev) => ({ ...prev, abilityUsed: true }));
      }
    }

    // 占い師の占い先(本物の占い師は死亡している可能性があるため、ジョーカーの継承も考慮する。NPCが本物の場合、実際の結果を記録する)
    const npcJokerSeer = alive.find((p) => p.role === "ジョーカー" && !p.isUser && npcJokerState.abilityBank === "占い師" && !npcJokerState.abilityUsed);
    const seer = alive.find((p) => p.role === "占い師") || (userIsSeer ? user : null) || npcJokerSeer;
    let newSeerLogEntry = null;
    if (seer && !seer.isUser) {
      // 既に判定済み(確定シロ・確定クロ)の人や、この占い師自身が過去に占った人は、占い直しても新情報が出ないので除外する
      const alreadySeen = new Set(npcSeerLog.filter((e) => e.seerName === seer.name).map((e) => e.target));
      const pool = alive.filter((p) => p.name !== seer.name && !confirmedWhite.includes(p.name) && !confirmedBlack.includes(p.name) && !alreadySeen.has(p.name)).map((p) => p.name);
      const finalPool = pool.length > 0 ? pool : alive.filter((p) => p.name !== seer.name).map((p) => p.name);
      const suspicion = await getSuspicionWeights(finalPool, "占い師が今夜占う相手");
      const weighted = {};
      // AIは過去の会話ログ自体を役職を知った状態で生成しているため、「疑わしさ」判定が無意識に人狼を言い当てやすい傾向がある。
      // 均等なランダム成分を混ぜることで、極端な的中率を緩和する。
      const uniformShare = 100 / finalPool.length;
      finalPool.forEach((n) => (weighted[n] = (suspicion[n] ?? uniformShare) * 0.55 + uniformShare * 0.45));
      const seerTargetName = weightedPick(weighted) || pickRandom(finalPool);
      const targetPlayer = players.find((p) => p.name === seerTargetName);
      const isJokerAware = targetPlayer.role === "ジョーカー"; // アプリ内ではジョーカーは常に判定可能とする
      const result = targetPlayer.role === "人狼" ? "人狼" : isJokerAware ? "ジョーカーである" : "人狼ではない";
      newSeerLogEntry = { day, seerName: seer.name, target: seerTargetName, result, reason: suspicion.__topReason || "" };
      // この占い師が既にCO済みなら、新しい結果も翌朝には公表される前提で、その場で確定シロ/クロへ反映する
      if (roleClaims[seer.name]?.role === "占い師") pushConfirmedResult(seerTargetName, result);
      if (seer === npcJokerSeer) setNpcJokerState((prev) => ({ ...prev, abilityUsed: true }));
    }

    // 襲撃解決
    const attackBlocked = wolfTarget && guardTarget && wolfTarget === guardTarget;
    if (wolfTarget && !attackBlocked) {
      updated = updated.map((p) => (p.name === wolfTarget ? { ...p, alive: false } : p));
      nightLines.push({ type: "system", text: `夜が明けました。${wolfTarget}さんが死亡しました。` });
    } else if (wolfTarget) {
      nightLines.push({ type: "system", text: "夜が明けました。何者かに守られたようで、誰も死んでいません。" });
    }

    // NPC狩人の実際の護衛履歴を記録する(真実。狩人COが過去の護衛先を語る時の唯一の根拠にする)
    let newGuardLogEntry = null;
    if (hunter && !hunter.isUser && guardTarget) {
      newGuardLogEntry = { day, hunterName: hunter.name, target: guardTarget, blocked: attackBlocked };
    }

    if (userIsSeer && nightTarget) {
      const targetP = updated.find((p) => p.name === nightTarget);
      const result = targetP.role === "ジョーカー" && jokerFlagFor(targetP) ? "ジョーカーである" : targetP.role === "人狼" ? "人狼" : "人狼ではない";
      setPrivateInfo((prev) => [...prev, `【占い結果】${nightTarget}は「${result}」でした`]);
      setPlayerSeerLog((prev) => [...prev, { day, target: nightTarget, result }]);
      // プレイヤーが既に占い師としてCO済みなら、新しい結果も翌朝公表される前提で確定シロ/クロへ反映する
      if (roleClaims[userName]?.role === "占い師") pushConfirmedResult(nightTarget, result);
    }

    // ジョーカーが継承した能力(占い師・狩人)をこの夜に使い切った場合、使用済みにする
    if (jokerInherited && (jokerInherited === "占い師" || jokerInherited === "狩人") && nightTarget) {
      setJokerState((prev) => ({ ...prev, abilityUsed: true }));
    }

    // ジョーカー発動判定(村人陣営役職者の死亡。夜の襲撃死のみを対象、処刑死は別途submitVoteFinalで判定済み)
    const deadThisNight = wolfTarget && !attackBlocked ? updated.find((p) => p.name === wolfTarget) : null;
    let bonusSeerLogEntry = null;
    if (deadThisNight) {
      const jokerResult = triggerJokerAwakeningIfNeeded(deadThisNight, updated, newSeerLogEntry);
      if (jokerResult.line) nightLines.push(jokerResult.line);
      // 占い師が夜に人狼に殺された場合、ジョーカーは「新しく誰かを占う」のではなく、
      // 死んだ占い師本人が"その晩"に行った占いの記憶(対象と結果)をそのまま引き継ぐ。
      // これは占い師自身の占い判定(このresolveNight関数の中で既に上で実行済み)の結果である
      // newSeerLogEntry(ローカル変数、まだsetNpcSeerLogでコミットされていない)を、
      // ジョーカーの名前でも重複して記録することで実現する。新しい占い先を選び直す処理は行わない。
      if (jokerResult.newlyInherited === "占い師") {
        const newJoker = updated.find((p) => p.role === "ジョーカー" && p.alive && !p.isUser);
        if (newJoker && newSeerLogEntry) {
          bonusSeerLogEntry = { ...newSeerLogEntry, seerName: newJoker.name, inheritedFrom: deadThisNight.name };
          setNpcJokerState((prev) => ({ ...prev, abilityUsed: true }));
        }
      }
    }

    // ジョーカーの自然な覚醒判定(役職者の死とは無関係。1日目の夜から毎晩、まだ覚醒していなければ判定する)
    if (user.role === "ジョーカー" && jokerState.hidden && !jokerState.defected) {
      const spontProb = jokerSpontaneousAwakeningProbability(day);
      if (Math.random() < spontProb) {
        setJokerState((prev) => ({ ...prev, hidden: false, selfAware: true }));
        nightLines.push({ type: "system", text: "🃏 誰かが死んだわけでもないのに、あなたの中で何かが弾けました……あなたは、実はジョーカーでした。まだ継承できる力はありませんが、いずれ役職者が死ねば、その力を継承するか選べるようになります。" });
      }
    }
    const npcJokerForSpont = updated.find((p) => p.role === "ジョーカー" && p.alive && !p.isUser);
    if (npcJokerForSpont && !npcJokerState.aware && !npcJokerState.defected) {
      const spontProb = jokerSpontaneousAwakeningProbability(day);
      if (Math.random() < spontProb) {
        setNpcJokerState((prev) => ({ ...prev, aware: true }));
        // NPCの覚醒はプレイヤーには見えない内心の変化のため、ログには残さない
      }
    }

    // 裏切りの選択肢(ジョーカー自覚済み・未寝返りの場合、寝返るまで毎晩再抽選する)
    if (user.role === "ジョーカー" && jokerState.selfAware && !jokerState.defected) {
      const prob = defectionProbability(day);
      if (Math.random() < prob) {
        setJokerState((prev) => ({ ...prev, defectionOffered: true }));
        nightLines.push({ type: "system", text: "🌙 今夜、あなたに「人狼側へ寝返るかどうか」を選べる機会が訪れています。次のフェーズ選択で決められます。" });
      } else {
        // 発動しない夜も、内面の揺らぎをうっすらと描写する(悪魔に囁かれるような感覚)
        const flavorLines = [
          "🌑 今夜は静かだった。それでも、胸の奥で何かがざわつくのを感じる。",
          "🌑 ふと、村人を裏切ったらどうなるだろう、という考えが頭をよぎった。すぐに振り払う。",
          "🌑 誰にも言えない衝動が、時々顔を覗かせる。まだ、それに従うつもりはない。",
          "🌑 今夜は特に何も起きなかった。ただ、自分の中の何かが変わってしまった感覚だけが残る。",
        ];
        if (Math.random() < 0.6) {
          nightLines.push({ type: "system", text: pickRandom(flavorLines) });
        }
      }
    }

    // NPCジョーカーの裏切り判定(覚醒済み・未寝返りの場合、寝返るまで毎晩再抽選する。寝返れば結末で明かされる)
    const npcJoker = updated.find((p) => p.role === "ジョーカー" && p.alive && !p.isUser);
    let npcJustDefected = false;
    if (npcJoker && npcJokerState.aware && !npcJokerState.defected) {
      const prob = defectionProbability(day);
      if (Math.random() < prob) {
        setNpcJokerState((prev) => ({ ...prev, defected: true, abilityBank: null, abilityUsed: false }));
        npcJustDefected = true;
        // プレイヤーには分からない内心の変化。未使用だった継承能力(あれば)は消え去る。ゲーム結末で正体とともに明かされる。
      }
    }

    addLog(nightLines);
    setPlayers(updated);
    setNightTarget(null);
    if (newSeerLogEntry) setNpcSeerLog((prev) => [...prev, newSeerLogEntry]);
    if (bonusSeerLogEntry) setNpcSeerLog((prev) => [...prev, bonusSeerLogEntry]);
    if (newGuardLogEntry) setNpcGuardLog((prev) => [...prev, newGuardLogEntry]);
    updateMadmanDelusionsForPopulation(updated);

    // 寝返りが今まさに起きた場合、reactのstate更新が反映される前でも正しく勝敗判定できるよう、最新状態を明示的に渡す
    const win = checkWin(updated, npcJustDefected ? { npcDefected: true } : {});
    if (win === "村人陣営") {
      finishGame(win, updated);
    } else if (CREDIT_SYSTEM_ENABLED && day === 1) {
      // 1日目は無料。2日目に進む直前だけクレジットを確認する(それ以降の日はこのチェックを通らない=1プレイ分の課金で最後まで遊べる)。
      // すでにクレジットを持っている場合はここで自動消費され、プレイヤーには一切気づかれずそのまま2日目に進む。
      const ok = await tryConsumeCredit();
      if (ok) {
        setDay((d) => d + 1);
        setPhase("discussion");
        setDiscussionTurns(0);
        setTurnLabel(1);
        const wolfSide = updated.filter((p) => p.alive && (p.role === "人狼" || p.role === "狂人")).map((p) => p.name);
        setWolfActionsToday(Object.fromEntries(wolfSide.map((n) => [n, false])));
        if (win === "人狼陣営") {
          setPendingMajorityWin(true);
          addLog([{ type: "system", text: `${day + 1}日目の朝が来ました。生存者の数を見渡すと、既に人狼陣営が過半数を占めていることに気づく者がいるかもしれません……。` }]);
        } else {
          addLog([{ type: "system", text: `${day + 1}日目、昼になりました。議論を始めてください。` }]);
        }
      } else {
        // 残高不足:2日目には進めず、続きへの興味を煽る一言を挟んで購入導線の画面で足止めする
        setPendingDayAdvanceWin(win || null);
        setPhase("day1_paywall");
        addLog([{ type: "system", text: DAY1_END_TEASER_TEXT }]);
      }
    } else {
      setDay((d) => d + 1);
      setPhase("discussion");
      setDiscussionTurns(0);
      setTurnLabel(1);
      const wolfSide = updated.filter((p) => p.alive && (p.role === "人狼" || p.role === "狂人")).map((p) => p.name);
      setWolfActionsToday(Object.fromEntries(wolfSide.map((n) => [n, false])));
      if (win === "人狼陣営") {
        // 即座に終了させず、プレイヤーに1ターンだけ行動させてから人狼側が数の力で押し切る演出を挟む
        setPendingMajorityWin(true);
        addLog([{ type: "system", text: `${day + 1}日目の朝が来ました。生存者の数を見渡すと、既に人狼陣営が過半数を占めていることに気づく者がいるかもしれません……。` }]);
      } else {
        addLog([{ type: "system", text: `${day + 1}日目、昼になりました。議論を始めてください。` }]);
      }
    }
    setBusy(false);
  }

  // 朝を迎えた時点で人狼陣営が過半数に達していた場合、プレイヤーの1ターンの後に呼ばれる。
  // 人狼陣営が正体を明かし、数の力で押し切って処刑を強行する——という演出を生成してから、ゲームを終了させる。
  async function triggerWolfMajorityReveal(freshPlayers = null) {
    setPendingMajorityWin(false);
    setBusy(true);
    const alive = (freshPlayers || players).filter((p) => p.alive);
    const wolfSideAlive = alive.filter((p) => p.role === "人狼" || p.role === "狂人" || (p.role === "ジョーカー" && ((p.isUser && jokerState.defected) || (!p.isUser && npcJokerState.defected))));
    const villageAlive = alive.filter((p) => !wolfSideAlive.includes(p));
    const wolfNames = wolfSideAlive.filter((p) => !p.isUser).map((p) => p.name);
    const transcript = getTranscript();

    const wolfSideDetail = wolfSideAlive.map((p) => {
      const kind = p.role === "人狼" ? "人狼" : p.role === "狂人" ? "狂人" : "寝返ったジョーカー";
      return `${p.name}(${kind})`;
    }).join("・");
    const system = `あなたは人狼ゲームのGMです。人狼陣営(${wolfSideDetail})が、生存者${alive.length}人中${wolfSideAlive.length}人を占め、数の上で村側(${villageAlive.map((p) => p.name).join("・")})を上回っていることに気づきました。
**役職の呼び方(絶対厳守)**:上記の括弧内が各人の本当の役職。狂人や寝返ったジョーカーを「人狼」とは呼ばせない(「人狼側」「仲間」「陣営」などの表現にする)。狂人はこの瞬間に洗脳が解けて自分が狂人だったと理解する演出にしてよい。
もはや議論で言い逃れる必要はないと判断し、**人狼陣営が正体を明かして開き直り、数の力で押し切って村側の誰か1人を処刑(または沈黙させる)場面を短く描写してください**。村側が抵抗・動揺する様子も含めてよい。
${wolfNames.length > 0 ? `NPCの人狼陣営(${wolfNames.join("・")})のセリフを含める。` : "人狼陣営はプレイヤーのみ、または生存NPCに人狼陣営がいない場合は、GMのナレーションだけで押し切られる描写にする。"}
村側の生存NPC(${villageAlive.filter((p) => !p.isUser).map((p) => p.name).join("・") || "なし"})も、驚き・抵抗・絶望などの短い反応をしてよい。
絶対厳守:speakerにプレイヤー名「${userName}」を使わない。3〜6行程度、短くドラマチックに。
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前またはGM","text":"セリフ・地の文"}, ...]}`;
    const userPrompt = `これまでの経緯:\n${getHistoryContext()}\n\n人狼陣営が数の力で押し切る場面を生成してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 700);
      if (parsed?.lines) {
        addLog(parsed.lines.map((l) => (l.speaker === "GM" ? { type: "system", text: l.text } : { type: "npc", speaker: l.speaker, text: l.text })));
      }
    } catch (e) {
      addLog([{ type: "system", text: "🐺 人狼陣営は、自分たちが生存者の半数以上を占めていることに気づいた。もはや議論を続ける必要はない——数の力で押し切る時が来た。" }]);
    }
    setBusy(false);
    finishGame("人狼陣営", freshPlayers);
  }

  // 実際のペア役職(人狼・狂人・共有者)の組み合わせを明示的なリストとして返す(偽の相方主張を防ぐための具体データ)
  // 現在のCO(自称役職)状況を一覧テキストにする。複数人が同じ役職を自称していれば明示する。
  function getClaimStatusText() {
    const entries = Object.entries(roleClaims);
    if (entries.length === 0) return "まだ誰も役職をCOしていない";
    const byRole = {};
    entries.forEach(([name, info]) => {
      if (!byRole[info.role]) byRole[info.role] = [];
      const p = players.find((pp) => pp.name === name);
      const changedTag = info.previousRole ? `※以前は「${info.previousRole}」を主張していたが「${info.role}」に変更(矛盾・要追及)` : "";
      byRole[info.role].push(`${name}(${info.sinceDay}日目〜${p && !p.alive ? "・故人" : ""})${changedTag}`);
    });
    return Object.entries(byRole).map(([role, names]) => {
      const multi = names.length > 1 ? "【複数CO中・対立中】" : "【単独CO】";
      return `${role}: ${multi}${names.join("、")}`;
    }).join(" / ");
  }

  // AIの応答から抽出されたCO情報をステータスへ反映する
  function applyRoleClaims(claims, currentDay) {
    if (!claims || typeof claims !== "object") return;
    let mergedClaims = null;
    setRoleClaims((prev) => {
      const next = { ...prev };
      Object.entries(claims).forEach(([name, role]) => {
        if (!name || !role) return;
        if (!next[name]) {
          next[name] = { role, sinceDay: currentDay, previousRole: null };
        } else if (next[name].role !== role) {
          // 既にCO済みの役職とは異なる役職を新たに主張した場合、矛盾として履歴に残す
          next[name] = { role, sinceDay: currentDay, previousRole: next[name].role };
        }
      });
      mergedClaims = next;
      return next;
    });
    // 占い師・霊媒師として新たにCOした場合、その人物が過去に出した結果は「公表された情報」として扱い、
    // 確定シロ・確定クロに反映する(それまでは空のままで、実は一度も更新されていなかった)。
    Object.entries(claims).forEach(([name, role]) => {
      if (role === "占い師") {
        npcSeerLog.filter((e) => e.seerName === name).forEach((e) => pushConfirmedResult(e.target, e.result));
        // プレイヤー自身が占い師としてCOした場合、プレイヤーの実際の結果も公表情報として扱う
        // (プレイヤーが偽占い師なら実際の結果は存在しないので何も追加されず、正しく動く)
        if (name === userName) playerSeerLog.forEach((e) => pushConfirmedResult(e.target, e.result));
      }
      if (role === "霊媒師") {
        npcMediumLog.filter((e) => e.mediumName === name).forEach((e) => pushConfirmedResult(e.target, e.result));
        if (name === userName) playerMediumLog.forEach((e) => pushConfirmedResult(e.target, e.result));
      }
    });
    // 共有者ペアが「お互いを共有者だと認め合う」形で相互確認した場合、その時点でどちらも確定シロとして登録する。
    // これは一度成立すれば覆らない事実(2人が同時に生きている状態で一致して認め合わない限り成立しない)であり、
    // 後から片方が死亡しても、残った側の「確定シロ」であるという事実自体は変わらない(絶対厳守)。
    const realSharers = players.filter((p) => p.role === "共有者");
    if (realSharers.length === 2 && mergedClaims) {
      const bothClaimed = realSharers.every((p) => mergedClaims[p.name]?.role === "共有者");
      if (bothClaimed) {
        realSharers.forEach((p) => pushConfirmedResult(p.name, "人狼ではない"));
      }
    }
  }

  // 占い・霊媒の結果を確定シロ/確定クロへ反映する共通処理(重複追加を防ぐ)
  function pushConfirmedResult(target, result) {
    if (!target || !result) return;
    if (result === "人狼") {
      setConfirmedBlack((prev) => (prev.includes(target) ? prev : [...prev, target]));
    } else if (result === "人狼ではない") {
      // 確定シロは「人狼ロールではない」ことの確認であり、狂人の可能性までは否定しない。
      // それでも「本物の人狼さえ全滅させれば村側が勝つ」ため、投票の優先度を下げる目的で記録する。
      setConfirmedWhite((prev) => (prev.includes(target) ? prev : [...prev, target]));
    }
    // 「ジョーカーである」という結果は、人狼側か村側か未確定な特殊ケースのため、どちらにも加えない。
  }

  // 役職一覧テキストを生成する(ジョーカーが寝返っている場合、その状態も明示する。投票・セリフ生成の一貫性のため必須)
  // ★ プレイヤー自身の役職は絶対に含めない。AIはプレイヤーのセリフを書かないため知る必要がなく、
  //   同じプロンプトで村側NPCの投票・反応を生成する以上、載せると「知らないふり」が破綻して不当に狙われる原因になる。
  function getRosterInfoWithDefection(playerList = players) {
    return playerList.map((p) => {
      if (p.isUser) {
        if (p.role === "ジョーカー" && jokerState.defected) {
          return `${p.name} 役職:【プレイヤー。ジョーカーとして人狼側へ寝返り済み。この事実は本人だけが知っており、人狼を含む全NPCは知らない(人狼はプレイヤーを仲間扱いせず、襲う可能性もある)。投票判定では人狼陣営として扱う】 生存:${p.alive}`;
        }
        return `${p.name} 役職:【プレイヤー。正体は全NPCにとって不明。会話ログ上の言動だけで判断すること】 生存:${p.alive}`;
      }
      let tag = p.role;
      if (p.role === "ジョーカー") {
        const defected = npcJokerState.defected;
        if (defected) {
          tag = "ジョーカー(既に人狼側へ寝返り済み。以降は人狼陣営の一員として、本物の人狼を守り村側を欺く行動を取る。ただし人狼側はこの寝返りを知らないため、人狼NPCのセリフで仲間扱いさせない)";
        } else {
          // ジョーカーの覚醒・継承の内部状態を明示する(これが伝わらないと、セリフ生成時に能力状況を勝手に作文してしまうため)
          let statusNote;
          if (!npcJokerState.aware) {
            statusNote = "まだ覚醒していない(本人は自分を村人だと思い込んでおり、ジョーカーだと自覚していない。この状態でジョーカーの能力について語らせない)";
          } else if (!npcJokerState.abilityBank) {
            statusNote = "覚醒済みだが、まだ何の役職の能力も継承していない(継承前の状態。「能力を使える」とは言わせない)";
          } else if (!npcJokerState.abilityUsed) {
            statusNote = `${npcJokerState.abilityBank}の能力を継承済み・今夜から使える状態(まだ実際には使っていない)`;
          } else {
            statusNote = `${npcJokerState.abilityBank}の能力を継承済みで、既に1回使い切っている(その1回分の結果は知っているが、能力は一度きりのため今後二度と使えない。「今夜も視る/占う」のような発言は絶対にさせない)`;
          }
          if (npcJokerState.abilityBank === "霊媒師") {
            statusNote += "。**絶対厳守:継承前に死んだ本物の霊媒師が過去に得ていた結果は一切知らない**(自分が継承した後に実際に視た結果だけを知っている)。";
          }
          tag = `ジョーカー(内部状態:${statusNote})`;
        }
      }
      return `${p.name} 役職:${tag} 生存:${p.alive}`;
    }).join("\n");
  }

  function getRealPairsText() {
    const pairRoles = ["人狼", "狂人", "共有者"];
    const lines = [];
    pairRoles.forEach((role) => {
      const members = players.filter((p) => p.role === role);
      if (members.length === 2) {
        const involvesPlayer = members.some((p) => p.isUser);
        if (involvesPlayer) {
          // プレイヤーが絡むペアは、正体の裏付けに使える「本当に相方かどうか」の事実だけを伝え、
          // 具体的な役職名(人狼/狂人/共有者のどれか)はここでは明かさない(プレイヤーの役職はNPCにとって秘匿のため)。
          const other = members.find((p) => !p.isUser);
          const userP = members.find((p) => p.isUser);
          lines.push(`${userP.name}(プレイヤー)と${other.name}は、実際に同じ種類のペア役職の関係にある(誰かが「お互いが相方だ」と主張すれば、それは真実として扱ってよい。ただし、これが具体的にどの役職のペアかは、当事者以外のNPCには分からない)`);
        } else {
          lines.push(`${role}ペア: ${members[0].name}・${members[1].name}`);
        }
      }
    });
    return lines.length > 0 ? lines.join(" / ") : "なし";
  }

  // プレイヤーの真の役職をNPCの判断根拠にさせないための注意書き(投票・反応・弁明など全プロンプトに含める)
  function getPlayerBlindnessNote() {
    return `**プレイヤー「${userName}」の正体の扱い(絶対厳守・最優先)**:プレイヤーの本当の役職は、上記のペア情報から推測できる場合があっても、**ペアの当事者であるNPC本人以外は一切知らない**。村側NPC(および当事者以外の全NPC)は、そもそもプレイヤーの本当の役職を聞いたことがない。**「知っているが根拠に使わない」のではなく、「そんな話は耳に入ったことがない」という、単純に知らない立場として判断する**(「それは嘘だ」と積極的に否定・断定するわけではない。ただ知らないだけ)。プレイヤーを疑う・投票する・反応する際の根拠は、**会話ログ上のプレイヤーの言動のみ**とする。**この制約は「裏の正体を後出しの根拠に使うな」という意味であり、「プレイヤーには手加減しろ」という意味では絶対にない**:プレイヤーの発言に矛盾・不自然さ・怪しい言動があれば、他のNPCに対するのと全く同じ厳しさで指摘・追及・投票してよい(むしろ、他のNPCより疑われにくくなっているとしたら、それ自体が明確な不公平である)。プレイヤーだけが不自然に手加減される、あるいは不自然に的確に見抜かれる展開は、どちらもこのゲームの最も重大な不公平である。`;
  }

  // ============================================================
  // 投票の情報分離。原則:**各NPCは「自分の役職(狂人は思い込み)」「自分の相方(ペア役職のみ)」「自分自身の能力の結果」だけを知っている。**
  // 人狼も狂人が誰かを知らず、狂人も人狼が誰かを知らない。村側も人狼側も、持っている情報の構造は同じで、違うのは目的と行動だけ。
  // そのため投票は「互いを知っている単位(ペア)」ごとにグループ化し、グループ間で情報が漏れないよう別々のAI呼び出しで生成する。
  // ============================================================
  function isWolfTeamNPC(p) {
    if (p.isUser) return false;
    return p.role === "人狼" || p.role === "狂人" || (p.role === "ジョーカー" && npcJokerState.defected);
  }

  // そのNPC自身が実際に知っている情報だけを1行にまとめる
  function getNPCOwnKnowledge(p, delusionsOverride = null) {
    const effectiveDelusions = delusionsOverride || madmanDelusions;
    const partnerOf = (role) => players.find((q) => q.role === role && q.name !== p.name);
    const fmt = (q) => (q ? `${q.name}(${q.alive ? "生存" : "死亡"})` : "なし");
    if (p.role === "人狼") {
      return `${p.name}: 本物の人狼。相方の人狼は${fmt(partnerOf("人狼"))}。それ以外(狂人が誰か、ジョーカーが寝返っているか等)は知らない。目的は人狼陣営の勝利。`;
    }
    if (p.role === "狂人") {
      const belief = effectiveDelusions[p.name] || "村人";
      return `${p.name}: 狂人だが洗脳されており、自分を「${belief}」だと本気で信じている。相方の狂人は${fmt(partnerOf("狂人"))}(仲間だと認識)。本物の人狼が誰かは知らない。${belief === "人狼" ? "自分を人狼だと思い込んでいるため、決選投票では2人の候補のうち疑わしくない方に投票する(本物の仲間を庇う無意識の行動)。" : "思い込んでいる役職の視点で判断する。"}`;
    }
    if (p.role === "共有者") {
      return `${p.name}: 共有者。相方の共有者は${fmt(partnerOf("共有者"))}(互いに確定シロと分かっている)。それ以外は知らない。`;
    }
    if (p.role === "占い師") {
      const mine = npcSeerLog.filter((e) => e.seerName === p.name).map((e) => `${e.day}日目夜:${e.target}=${e.result}`).join("、");
      return `${p.name}: 占い師。自分の占い結果: ${mine || "まだなし"}。それ以外は知らない。`;
    }
    if (p.role === "霊媒師") {
      const mine = executionHistory.map((e) => `${e.day}日目処刑の${e.executed}=${e.trueRole === "人狼" ? "人狼" : "人狼ではない"}`).join("、");
      return `${p.name}: 霊媒師。自分の霊媒結果: ${mine || "まだなし"}。それ以外は知らない。`;
    }
    if (p.role === "狩人") {
      const mine = npcGuardLog.filter((e) => e.hunterName === p.name).map((e) => `${e.day}日目夜:${e.target}を護衛(${e.blocked ? "阻止成功" : "空振り"})`).join("、");
      return `${p.name}: 狩人。自分の護衛履歴: ${mine || "まだなし"}。それ以外は知らない。`;
    }
    if (p.role === "ジョーカー") {
      if (npcJokerState.defected) {
        return `${p.name}: ジョーカー(人狼側へ寝返り済み)。本物の人狼は${players.filter((w) => w.role === "人狼" && w.alive).map((w) => w.name).join("・") || "なし"}だと知っている。本物の人狼を処刑に追い込む投票は絶対にしない。**ただし人狼側は${p.name}の寝返りを知らない**(一方通行の関係。人狼から仲間扱いされることはなく、襲われる可能性もある)。`;
      }
      if (!npcJokerState.aware) return `${p.name}: ジョーカーだがまだ覚醒しておらず、自分を村人だと思っている。特別な情報は何も持っていない。`;
      if (!npcJokerState.abilityBank) return `${p.name}: ジョーカー(覚醒済み)。まだ何の能力も継承していない。それ以外は知らない。`;
      // 継承した能力で実際に得た結果を渡す(本物の役職者と同じ扱い)
      const bank = npcJokerState.abilityBank;
      let mine = "";
      if (bank === "占い師") mine = npcSeerLog.filter((e) => e.seerName === p.name).map((e) => `${e.day}日目夜:${e.target}=${e.result}`).join("、");
      else if (bank === "霊媒師") mine = npcMediumLog.filter((e) => e.mediumName === p.name).map((e) => `${e.day}日目処刑の${e.target}=${e.result}`).join("、");
      else if (bank === "狩人") mine = npcGuardLog.filter((e) => e.hunterName === p.name).map((e) => `${e.day}日目夜:${e.target}を護衛(${e.blocked ? "阻止成功" : "空振り"})`).join("、");
      return `${p.name}: ジョーカー(覚醒済み・${bank}の力を継承)。継承した能力で得た結果: ${mine || "まだなし"}。それ以外は知らない。`;
    }
    return `${p.name}: 村人。特別な情報は何も持っていない。会話の印象だけで判断する。`;
  }

  // 「互いを知っている単位」で投票グループを作る(グループ間で情報は漏れない)
  function getVoteGroups() {
    const npcs = otherAliveNPCs();
    const wolvesG = npcs.filter((p) => p.role === "人狼");
    const madmenG = npcs.filter((p) => p.role === "狂人");
    // 寝返ったジョーカーは、本物の人狼が誰かを知っているが、人狼側はジョーカーの寝返りを知らない(一方通行)。
    // 同じグループ(同じ1回のAI呼び出し)にすると、あたかも両者が公然と結託しているかのような投票理由になりかねないため、
    // 人狼グループとは別の、単独のグループとして分離する。
    const defectedJokerG = npcs.filter((p) => p.role === "ジョーカー" && npcJokerState.defected);
    // 共有者は人狼の正体を知らない役職なので、単独役職・村人グループに合流させてAPI呼び出し回数を減らす
    // (共有者自身が必要とする知識はgetNPCOwnKnowledgeで個別に渡っているので、グループを分ける必要性は薄い)。
    const solosG = npcs.filter((p) => !wolvesG.includes(p) && !madmenG.includes(p) && !defectedJokerG.includes(p));
    const groups = [];
    if (wolvesG.length) groups.push({ label: "人狼", npcs: wolvesG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD", "WOLF_CORNERED"] });
    if (defectedJokerG.length) groups.push({ label: "寝返ったジョーカー", npcs: defectedJokerG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD", "JOKER"], note: "**絶対厳守**:あなたは本物の人狼が誰かを知っているが、**人狼側はあなたの寝返りを知らない(一方通行)**。人狼と示し合わせたり、結託しているような投票理由にしない。あくまで自分1人の判断で、本物の人狼を処刑に追い込む投票は避ける。" });
    if (madmenG.length) groups.push({ label: "狂人", npcs: madmenG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD", "MADMAN"] });
    if (solosG.length) groups.push({ label: "単独役職・村人・共有者", npcs: solosG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD", "SHARER"] });
    return groups;
  }

  // 人間関係(幼馴染・姉妹・親友・ライバル等)を、読み取りやすい文章として生成する(公開情報。真実データと投票の両方で使う)
  function getRelationText() {
    const seenRelationPairs = new Set();
    const relationLines = [];
    players.forEach((p) => {
      const c = compatMap[p.name];
      if (!c?.relationLabel) return;
      const otherName = c.relationLabel.split("と")[0];
      const pairKey = [p.name, otherName].sort().join("|");
      if (seenRelationPairs.has(pairKey)) return;
      seenRelationPairs.add(pairKey);
      relationLines.push(`${p.name}・${otherName}:${c.relationLabel.split("と")[1]}`);
    });
    players.forEach((p) => {
      if (compatMap[p.name]?.outcast) relationLines.push(`${p.name}:これといった理由もなく、クラスでなんとなく距離を置かれがち`);
    });
    return relationLines.length > 0 ? relationLines.join("\n") : "(特筆すべき関係性の設定なし)";
  }

  function getPublicInfoLine() {
    return `公開情報 — 生存者: ${alivePlayers().map((p) => p.name).join("、")} / 確定シロ(公開された結果): ${confirmedWhite.join("、") || "なし"} / 確定クロ(公開された結果): ${confirmedBlack.join("、") || "なし"} / CO(自称役職)状況: ${getClaimStatusText()}
※ CO は自己申告であり本物とは限らない。複数人が同じ役職を名乗っていれば片方は偽物。単独COで対抗が出ていなければ信頼度は高いが確定ではない。
クラスメイト同士の人間関係(全員が知っている設定。幼馴染・姉妹・親友は互いを信じやすく庇いがち、ライバルは互いに厳しくなりがち。ただし役職とは無関係で、「距離を置かれがち」という設定だけを疑う根拠にはしない):
${getRelationText()}`;
  }

  // ============================================================
  // 真実データの一元管理:このゲームの「内部真実」を1箇所にまとめて生成する。
  // AIへ送る各プロンプト(議論・行動・投票・弁明タイム等)は、個別にデータを組み立てず、必ずここから取得する。
  // 新しい真実データを追加する時は、ここに1箇所追加するだけで全プロンプトに自動反映される(渡し忘れを防ぐ)。
  // options.includeTranscript: 会話ログ全文も含めるか(密談など制限された文脈では含めない)
  // options.candidatesOnly: 弁明タイムなど、特定の対象者に絞ったCO状況・思い込みだけを見せたい場合に配列で指定
  // ============================================================
  // 1ゲームの間ずっと変わらない情報(クラスメイトの人間関係・相性マップ等)。
  // 毎回の呼び出しで通常入力として送ると高くつくため、固定ルールと同様にプロンプトキャッシュ側に載せる
  // (callClaudeの配列プレフィックスの2番目として渡す)。生死・CO状況など変化する情報はここに入れない。
  function getStaticGameContextBlock() {
    const relationText = getRelationText();
    // 実プレイヤーの分身NPCが今回のキャストに含まれている場合、その人らしさが出る「署名フレーズ」を、
    // 会話のどこかで一度だけ自然に(一字一句そのまま)使わせる。無理に挟み込む必要はない。
    const signatureLines = players.filter((p) => !p.isUser && p.signatureLine).map((p) => `${p.name}:「${p.signatureLine}」`);
    const signatureLineText = signatureLines.length > 0
      ? `\n**キャラクターの口癖・決め台詞(自然な流れの中で、ゲーム中に一度だけ一字一句そのまま使わせる。毎回無理に使う必要はない)**:\n${signatureLines.join("\n")}`
      : "";
    // 地域設定が英語圏の場合、キャラクターのセリフ・GMのナレーションを英語で生成させる。
    // (JSONのキー名・speakerに使う名前自体は変えない。あくまで"text"の中身の言語を切り替えるだけ)
    const languageNote = region === "en"
      ? `\n**言語設定(絶対厳守・最優先)**:この舞台はアメリカの高校である。GMのナレーション、全キャラクターのセリフ("text"や"reason"等、実際に読ませる文章)は、**全て自然な英語(高校生らしい口語のアメリカ英語)で生成する**。日本語を混ぜない。ただし、JSONのキー名("speaker"や"lines"等)や、speakerに入れる人物名そのものは変更しない(名前は既に英語表記になっている)。役職名(人狼・占い師・霊媒師・狩人・共有者・ジョーカー・狂人・村人)は、キャラクターのセリフの中では英語(Werewolf, Seer, Medium, Hunter, Mason, Joker, Madman/Possessed, Villager)で自然に言い換えてよい。`
      : "";
    // 初心者モード:このゲームだけの特別ルール。他の一般的なルール(プレイヤーも平等に疑う等)を上書きするので、
    // 通常モードのゲームには一切影響しない(beginnerModeがtrueの時だけ、このテキスト自体が生成される)。
    const beginnerNote = beginnerMode
      ? `\n**初心者向け配慮(このゲームだけの特別ルール・絶対厳守)**:プレイヤー「${userName}」は人狼ゲームが初めてである。①プレイヤーへの疑いは、よほど明確な矛盾がない限り強く追及しない(完全に疑わないわけではないが、他のNPCより一段階手加減し、鋭い問い詰めは避ける)。②${guideNpcName ? `生存している${guideNpcName}は、時々(毎ターンではない)場の状況を分かりやすく一言でまとめたり、「手がかりがなければ、みんなの様子をよく見てみるのも手だよ」のような初心者向けのヒントを、自分の性格に合った自然な口調で混ぜてよい(${guideNpcName}が死亡したら、この役割も他のNPCと同様に自然に終わる。死後に語らせることは絶対にしない)。` : ""}③会話の中で、生存NPCの誰かの表情・仕草・視線などの短い描写を、セリフに添えて時々混ぜ、状況を視覚的にイメージしやすくする(ただし役職を推測できるような描写にはしない)。`
      : "";
    // 分身NPCが「留学生」扱いになっている場合、名前が他のクラスメイトと毛色が違うことを自然に説明する。
    // 名前自体は翻訳しない(そのまま)。あくまでこの場の言語(日本語/英語)を問題なく話す設定にするだけ。
    const exchangeStudentNote = exchangeStudents.length > 0
      ? (region === "en"
          ? `\n**Exchange student setting (absolute rule)**: ${exchangeStudents.join(", ")} ${exchangeStudents.length > 1 ? "are" : "is"} exchange student(s) at this school (from Japan). That's why the name looks different from the other classmates' names. ${exchangeStudents.length > 1 ? "They speak" : "They speak"} fluent English like everyone else, and nobody finds this unusual. Do not have anyone question or comment on why their name sounds foreign beyond simply knowing they're an exchange student. **Narrow exception (this character only, applies nowhere else)**: if this character has a signature line/catchphrase, it may be delivered once in their native language (Japanese) as a natural code-switching moment (e.g. blurting it out from habit); this does not permit mixing languages anywhere else in the game.`
          : `\n**留学生設定(絶対厳守)**:${exchangeStudents.join("・")}は、この学校に来ている留学生である(そのため他のクラスメイトと名前の毛色が違う)。日本語は問題なく話せる設定で、誰もそれを不自然には思わない。「なんでその名前なの?」のように名前を執拗に話題にしない(留学生だと分かっている、という前提で自然に扱う)。**狭い例外(この人物だけ、他には一切適用しない)**:この人物に口癖・決め台詞がある場合、癖でつい出てしまう自然な瞬間として、その1文だけ元の地域の言語(英語)のまま言わせてよい。これはこのキャラのこの1箇所だけの例外であり、他の場面・他のキャラの言語を混ぜてよいということでは絶対にない。`)
      : "";
    return `**クラスメイト同士の人間関係(公開情報。全員が把握している設定であり、役職とは無関係。積極的に会話・疑い・擁護の材料に使ってよい)**:
${relationText}${signatureLineText}
相性マップ(内部の数値調整用データ): ${JSON.stringify(compatMap)}${languageNote}${beginnerNote}${exchangeStudentNote}`;
  }

  function getGroundTruthBlock(options = {}) {
    const { delusionsOverride = null } = options;
    const effectiveDelusions = delusionsOverride || madmanDelusions;
    const seerLogText = npcSeerLog.length > 0
      ? npcSeerLog.map((e) => `${e.day}日目夜: ${e.seerName}が${e.target}を占い、結果は「${e.result}」${e.reason ? `(選んだ理由:${e.reason})` : ""}`).join("\n")
      : "(まだ占いは行われていない)";
    const execHistoryText = executionHistory.length > 0
      ? executionHistory.map((e) => `${e.day}日目: ${e.executed}(実際は${e.trueRole === "人狼" ? "人狼だった" : "人狼ではなかった"})`).join("\n")
      : "(まだ処刑者はいない)";
    const guardLogText = npcGuardLog.length > 0
      ? npcGuardLog.map((e) => `${e.day}日目夜: ${e.hunterName}が${e.target}を護衛(${e.blocked ? "襲撃阻止成功" : "この夜は襲撃自体なかった、または対象が外れた"})`).join("\n")
      : "(まだ護衛は行われていない)";
    const delusionEntries = Object.entries(effectiveDelusions).filter(([n]) => n !== userName);
    const delusionText = delusionEntries.length > 0
      ? delusionEntries.map(([n, role]) => `${n}は自分を「${role}」だと信じ込んでいる(自覚なし)`).join("、")
      : "現在生存中のNPC狂人なし";
    return `役職と相性(内部情報、プレイヤーには絶対見せない):
${getRosterInfoWithDefection()}
**実際のペア役職の組み合わせ(真実、絶対厳守)**: ${getRealPairsText()}
(このペア関係は、そのペアの当事者2人だけが知っている秘密情報。当事者以外のNPCの判断には絶対に使わない)
誰かが「〇〇が自分の相方だ」と主張した場合、必ず上記の実際の組み合わせと照合する。一致しなければそれは嘘であり、本物のペアの片割れが生存していれば、その人物は同意・肯定せず、違和感を示すか否定する。
${getPlayerBlindnessNote()}
${(() => { const a = getAllyChatInfo(); return a ? `**${a.label}**:
${a.log}
**絶対厳守**:上記の密談で話し合われた方針(CO禁止・疑う対象・伝え合った情報等)と矛盾する言動を、密談の当事者にその後の公開の場でさせない(例:密談で「COは危険だから止めよう」と釘を刺されたのに、直後の公開議論であっさりCOする、といった矛盾は絶対に避ける)。心変わりする場合も、公開の場でその理由が分かる描写を入れる。密談の当事者以外のNPCは、この内容を一切知らない。` : ""; })()}
確定シロ: ${confirmedWhite.join("、") || "なし"} / 確定クロ: ${confirmedBlack.join("、") || "なし"}
**現在のCO(自称役職)状況(明示的なステータス、必ず参照すること)**: ${getClaimStatusText()}
同じ役職を複数人がCOしている状態(対立中)なら、それを忘れずに話題に出す・整理する・追及するなどしてよい。誰かの過去のCOを議論から都合よく忘れさせない。同一人物が以前と異なる役職を主張した場合は矛盾として扱い、他のNPCから指摘・追及される描写にする。
**狂人の思い込み(絶対厳守)**: ${delusionText}
この思い込みに従って行動させる。信じ込んでいる役職が占い師・霊媒師なら、本人にとっては「本当の記憶」のつもりで結果を語ってよい(本物の結果と食い違うことがあっても、悪気なく都合よく解釈して話す。ただし出来る限り話の筋が破綻しないよう努める)。信じ込んでいる役職が「人狼」なら、人狼陣営として堂々と振る舞う。狂人が「自分は狂人だ」と告白することは絶対にない。
NPC占い師の実際の占い結果ログ(真実。矛盾させない):
${seerLogText}
処刑された人物の本当の役職(真実。霊媒師が矛盾する結果を言わないように):
${execHistoryText}
NPC狩人の実際の護衛履歴(真実。矛盾させない):
${guardLogText}
**出力前の最終チェック(最重要・必ず実行)**: セリフの中に占い師・霊媒師の結果、狩人の過去の護衛先・護衛結果、ペア役職の主張、または**ジョーカーの覚醒・能力継承状況**に関する発言が含まれる場合、出力する直前に上記の真実データと一字一句照合しなおすこと。事実と逆・矛盾する内容を絶対に言わせない(未覚醒なのに能力の話をする、継承前なのに「使える」と言う、等は絶対に禁止)。これを怠ることは、このゲームにおける最も重大な誤りである。`;
  }

  // 生存者が7人以下になったら、生存中の狂人は全員「自分は人狼だ」という思い込みに切り替わる
  function updateMadmanDelusionsForPopulation(currentPlayers) {
    const aliveCount = currentPlayers.filter((p) => p.alive).length;
    if (aliveCount > 7) return null;
    // プレイヤーは人間であり洗脳の対象外なので、NPCの狂人だけを切り替える
    const madmenNames = currentPlayers.filter((p) => p.role === "狂人" && p.alive && !p.isUser).map((p) => p.name);
    if (madmenNames.length === 0) return null;
    let updatedDelusions = null;
    setMadmanDelusions((prev) => {
      const next = { ...prev };
      madmenNames.forEach((n) => (next[n] = "人狼"));
      updatedDelusions = next;
      return next;
    });
    notifyPlayerOfPartnerDelusionChange(madmenNames, currentPlayers);
    return updatedDelusions;
  }

  // 決選投票の相手が本物の人狼だった場合、狂人候補は「自分も人狼だ」という思い込みに切り替わる。
  // 呼び出し直後にrunDefensePhase等でこの思い込みを参照する場合、React stateの反映を待たずに使えるよう更新後の値を直接返す。
  function updateMadmanDelusionsForDecisiveVote(candidates, currentPlayers) {
    const hasRealWolf = candidates.some((name) => currentPlayers.find((p) => p.name === name)?.role === "人狼");
    if (!hasRealWolf) return null;
    // プレイヤーは人間であり洗脳の対象外なので、NPCの狂人候補だけを切り替える
    const madmenInVote = candidates.filter((name) => {
      const p = currentPlayers.find((pp) => pp.name === name);
      return p?.role === "狂人" && !p.isUser;
    });
    if (madmenInVote.length === 0) return null;
    let updatedDelusions = null;
    setMadmanDelusions((prev) => {
      const next = { ...prev };
      madmenInVote.forEach((n) => (next[n] = "人狼"));
      updatedDelusions = next;
      return next;
    });
    notifyPlayerOfPartnerDelusionChange(madmenInVote, currentPlayers);
    return updatedDelusions;
  }

  // プレイヤー自身が狂人で、相方(NPC)の思い込みが変化した場合、その事実を伝える
  function notifyPlayerOfPartnerDelusionChange(changedNames, currentPlayers) {
    const me = getUser(currentPlayers);
    if (!me || me.role !== "狂人") return;
    const ally = currentPlayers.find((p) => p.role === "狂人" && !p.isUser);
    if (ally && changedNames.includes(ally.name)) {
      addLog([{ type: "system", text: `🌀 相方の${ally.name}の思い込みに変化がありました。今は自分を「人狼」だと信じ込んでいるようです。`, secret: true }]);
    }
  }

  function jokerFlagFor(p) {
    return p.isUser ? jokerState.selfAware || jokerState.hidden : true; // NPC側のジョーカーは常に判定可能
  }

  // 村人陣営役職者の死亡(夜の襲撃・処刑の両方)を受けて、ジョーカー(プレイヤー or NPC)の覚醒を判定する共通処理
  function triggerJokerAwakeningIfNeeded(deadPerson, currentPlayers, inheritedSeerInfo = null) {
    if (!deadPerson || !["占い師", "霊媒師", "狩人"].includes(deadPerson.role)) return { line: null, newlyInherited: null };
    const joker = currentPlayers.find((p) => p.role === "ジョーカー" && p.alive);
    if (!joker) return { line: null, newlyInherited: null };
    if (joker.isUser) {
      if (jokerState.defected) return { line: null, newlyInherited: null }; // 寝返った後は能力に関する情報が一切入らなくなる
      const firstAwakening = jokerState.hidden;
      if (firstAwakening) {
        setJokerState((prev) => ({ ...prev, hidden: false, selfAware: true }));
      }
      // 既に能力を継承済み(使用済みかどうかは問わない)なら、これ以降は「どの役職か」だけ分かり、継承の選択肢はもう出さない
      if (!jokerState.abilityBank) {
        // 占い師が夜に人狼に殺された場合、死んだ占い師本人がその晩に行った占いの記憶(対象・結果)を
        // 継承候補データに含めておく。承諾した瞬間、新しく占い直す必要なくその結果をそのまま知ることができる。
        setJokerState((prev) => ({ ...prev, pendingInheritance: { role: deadPerson.role, inheritedSeerInfo: deadPerson.role === "占い師" ? inheritedSeerInfo : null } }));
        return {
          newlyInherited: null, // プレイヤーは選択制のため、この場では確定しない(承諾すれば決選のUIから即座に反映される)
          line: {
            type: "system",
            text: firstAwakening
              ? `🃏 あなたの中で何かが弾けました……あなたは、実はジョーカーでした。同時に、亡くなった役職者(${deadPerson.role})の力が流れ込んでくるのを感じます。GM:この力を継承しますか?サイドメニューから選んでください。`
              : `🃏 また一人、役職者(${deadPerson.role})が死にました。その力があなたに継承される予感がします。GM:継承しますか?サイドメニューから選んでください。`,
          },
        };
      } else {
        return { newlyInherited: null, line: { type: "system", text: `🃏 また一人、役職者(${deadPerson.role})が死にました。あなたは既に別の力を継承済みのため、この力は継承できません。` } };
      }
    } else {
      if (npcJokerState.defected) return { line: null, newlyInherited: null }; // 寝返った後は能力継承の対象外
      if (!npcJokerState.aware) {
        setNpcJokerState((prev) => ({ ...prev, aware: true }));
        // NPCの覚醒はプレイヤーには見えない内心の変化のため、ログには残さない(不自然な自白を防ぐ)
      }
      // NPCジョーカーは、まだ何も継承していなければほぼ確実に継承する(95%)。
      // 以前は70%だったが、占い師・霊媒師・狩人はそれぞれ1人しかいないため、
      // その一度きりの判定に外れると、その役職の能力は二度と継承できないまま終わってしまっていた。
      // 継承のタイミングが遅れるほど、その能力(特に霊媒師)は無駄になっていくため、初回の判定はほぼ必ず成功させる。
      if (!npcJokerState.abilityBank && Math.random() < 0.95) {
        setNpcJokerState((prev) => ({ ...prev, abilityBank: deadPerson.role, abilityUsed: false }));
        // Reactの状態更新はこの関数内では即座に反映されないため、「今夜継承した」事実をローカルの返り値として持ち帰る。
        // これにより、占い師の力を継承した場合は同じ夜のうちに占い先を決める処理へつなげられる(狩人はこの晩の護衛タイミングを過ぎているため対象外)。
        return { line: null, newlyInherited: deadPerson.role === "占い師" ? "占い師" : null };
      }
    }
    return { line: null, newlyInherited: null };
  }

  // ジョーカーの能力継承を選択する(承諾すればその夜から使える。断っても以後「誰が死んだか」は分かり続ける)
  function decideInheritance(accept) {
    if (!jokerState.pendingInheritance) return;
    if (accept) {
      const role = jokerState.pendingInheritance.role;
      const inherited = jokerState.pendingInheritance.inheritedSeerInfo;
      if (role === "占い師" && !inherited) {
        // 処刑によって占い師を継承した場合:新しく占い直す必要があるが、次の夜まで待たせない。
        // 継承した瞬間(今この場)に、占う相手を選んでもらうUIへ進む。
        setJokerState((prev) => ({ ...prev, abilityBank: role, abilityUsed: false, pendingInheritance: null }));
        addLog([{ type: "system", text: "🃏 あなたは占い師の力を継承しました。すぐに誰かを占うことができます。", secret: true }]);
        setPendingImmediateSeerChoice(true);
        return;
      }
      setJokerState((prev) => ({ ...prev, abilityBank: role, abilityUsed: !!inherited, pendingInheritance: null }));
      if (inherited) {
        // 占い師が夜に人狼へ殺された場合:新しく誰かを占うのではなく、死んだ占い師本人がその晩に行った
        // 占いの記憶をそのまま受け継ぐ(対象・結果は変わらない)。継承した瞬間に分かる。
        // ★ npcSeerLog(AIへの真実データ)には追加しない:「seerName」にプレイヤー名を入れてしまうと、
        //   プレイヤーがこの力を持っていることがNPC側のAIに漏れてしまう(プレイヤーの正体は本人だけが知る情報のため)。
        //   この情報はプレイヤー自身への通知に留め、公表するかどうかは会話の中でプレイヤー自身が選ぶ。
        addLog([
          { type: "system", text: `🃏 あなたは占い師の力を継承しました。それと同時に、${inherited.seerName}が今夜${inherited.target}を占っていた記憶が流れ込んでくる……結果は「${inherited.result}」。` },
        ]);
        // 継承した記憶もプレイヤー自身の占い結果として記録する(占い師COした時に確定シロ/クロへ反映させるため)
        setPlayerSeerLog((prev) => [...prev, { day: inherited.day, target: inherited.target, result: inherited.result, inheritedFrom: inherited.seerName }]);
        if (roleClaims[userName]?.role === "占い師") pushConfirmedResult(inherited.target, inherited.result);
      } else {
        addLog([{ type: "system", text: `🃏 あなたは${role}の力を継承しました。今夜から使えます。`, secret: true }]);
      }
    } else {
      setJokerState((prev) => ({ ...prev, pendingInheritance: null }));
      addLog([{ type: "system", text: "あなたはこの力を継承しないことを選びました。", secret: true }]);
    }
  }

  // 処刑継承による即時の占い先選択。結果はその場で私的情報として分かる(公表するかは本人の判断)。
  function chooseImmediateSeerTarget(targetName) {
    setPendingImmediateSeerChoice(false);
    const target = players.find((p) => p.name === targetName);
    if (!target) return;
    const result = target.role === "人狼" ? "人狼" : target.role === "ジョーカー" ? "ジョーカーである" : "人狼ではない";
    setJokerState((prev) => ({ ...prev, abilityUsed: true }));
    setPrivateInfo((prev) => [...prev, `【占い結果】${targetName}は「${result}」`]);
    setPlayerSeerLog((prev) => [...prev, { day, target: targetName, result }]);
    if (roleClaims[userName]?.role === "占い師") pushConfirmedResult(targetName, result);
    addLog([{ type: "system", text: `🃏 あなたは${targetName}を占った。結果は「${result}」。`, secret: true }]);
  }

  function checkWin(list, overrides = {}) {
    const userDefected = overrides.userDefected ?? jokerState.defected;
    const npcDefected = overrides.npcDefected ?? npcJokerState.defected;
    const alive = list.filter((p) => p.alive);
    // 「本物の人狼が0人になったか」の判定には、"本物の人狼"役職者のみを数える(狂人・寝返ったジョーカーは含めない)。
    // 人狼が全滅すれば、狂人や寝返ったジョーカーが生き残っていても村人陣営の勝利になる(彼らの存在意義は本物の人狼を守り抜くこと)。
    const trueWolves = alive.filter((p) => p.role === "人狼");
    if (trueWolves.length === 0) return "村人陣営";
    // 「人狼陣営が多数決を握ったか」の判定には、狂人・寝返ったジョーカーも人狼陣営として数える(彼らの勝利条件は人狼陣営の勝利のため)
    const wolfSide = alive.filter((p) => p.role === "人狼" || p.role === "狂人" || (p.role === "ジョーカー" && ((p.isUser && userDefected) || (!p.isUser && npcDefected))));
    if (wolfSide.length >= alive.length - wolfSide.length) return "人狼陣営";
    return null;
  }
  function finishGame(win, freshPlayers = null) {
    actuallyFinishGame(win, freshPlayers);
  }

  // 今回のゲームに分身NPC(承認済みプールから選ばれたNPC)がいれば、その戦歴を作成者本人の端末に記録する。
  // 記録するのは役職・生死・勝敗・日時だけ。一緒に遊んだ他プレイヤーの名前や会話内容は一切含めない。
  function recordNpcBattleIfAny(finalPlayers, win) {
    if (!HAS_BACKEND) return; // ライトモードでは記録先が無い
    const npcWithOwner = finalPlayers.find((p) => !p.isUser && p.creatorDeviceId);
    if (!npcWithOwner) return;
    const isWolfSideRole = npcWithOwner.role === "人狼" || npcWithOwner.role === "狂人" ||
      (npcWithOwner.role === "ジョーカー" && npcJokerState.defected);
    const teamWon = (win === "人狼陣営" && isWolfSideRole) || (win === "村人陣営" && !isWolfSideRole);
    fetch("/api/npc-battle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "save",
        creatorDeviceId: npcWithOwner.creatorDeviceId,
        npcName: npcWithOwner.name,
        role: npcWithOwner.role,
        survived: npcWithOwner.alive,
        teamWon,
      }),
    }).catch(() => {}); // 失敗してもゲーム進行には影響させない
  }

  function actuallyFinishGame(win, freshPlayers = null) {
    if (freshPlayers) setPlayers(freshPlayers);
    setWinner(win);
    setPhase("gameover");
    // ゲームが終わったら「続きから始める」の対象ではなくなるため、保存データを削除する
    try { window.storage.delete("game_save", false); } catch (e) {}
    setHasSave(false);
    recordNpcBattleIfAny(freshPlayers || players, win);
    const alive = (freshPlayers || players).filter((p) => p.alive);
    const wolvesAlive = alive.filter((p) => p.role === "人狼");
    const madmenAlive = alive.filter((p) => p.role === "狂人");
    const jokerDefected = alive.filter((p) => p.role === "ジョーカー" && ((p.isUser && jokerState.defected) || (!p.isUser && npcJokerState.defected)));
    const wolfSideCount = wolvesAlive.length + madmenAlive.length + jokerDefected.length;
    const villageCount = alive.length - wolfSideCount;
    let reason = "";
    if (win === "人狼陣営") {
      const parts = [`人狼${wolvesAlive.length}人`];
      if (madmenAlive.length) parts.push(`狂人${madmenAlive.length}人`);
      if (jokerDefected.length) parts.push(`寝返ったジョーカー${jokerDefected.length}人`);
      reason = `人狼陣営(${parts.join("+")}=${wolfSideCount}人)が村側(${villageCount}人)と同数以上になりました。この状態では夜に1人襲われた時点で人狼側が過半数となり、翌日の投票を数で押し切れるため、ここで決着とします。`;
    } else {
      reason = "本物の人狼が全員いなくなりました。";
    }
    addLog([
      { type: "system", text: `【ゲーム終了】${win}の勝利です!` },
      { type: "system", text: reason },
    ]);
    generateEnding(win);
  }

  // プレイヤーの入力に不適切な内容が検知された場合、AIに送らず直ちにゲームを終了させる(全キャラクターが未成年という設定のため)

  // 初心者モードの案内役が死亡したら、別の生存NPCへ自動でバトンタッチする(役職・好感度・性格は一切関係ない)
  useEffect(() => {
    if (!beginnerMode || !guideNpcName || busy) return;
    const guide = players.find((p) => p.name === guideNpcName);
    if (!guide || guide.alive) return; // まだ生きている、またはそもそも見つからない
    const candidates = players.filter((p) => !p.isUser && p.alive).map((p) => p.name);
    if (candidates.length === 0) {
      setGuideNpcName(null); // 引き継げる相手がもういない
      return;
    }
    announceGuideHandover(guideNpcName, pickRandom(candidates));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, beginnerMode, guideNpcName, busy]);

  // 案内役が死亡した際、別の生存NPCが引き継ぐ一言を生成する
  async function announceGuideHandover(deadGuideName, nextGuideName) {
    setBusy(true);
    const nextGuideP = players.find((p) => p.name === nextGuideName);
    const system = `あなたは人狼ゲームのGMです。初心者向けの案内役だった${deadGuideName}が亡くなりました。代わりに${nextGuideName}(性格:${nextGuideP?.personality || "不明"})が、これから場の状況を説明する役目を引き継ぎます。
以下の2つを短く含めた一言(2〜3文)を生成してください:①${deadGuideName}についての軽い感想(悲しむ・素っ気なく流す・皮肉る等、性格に合ったトーンでよい)、②これからは自分が説明する役目を引き継ぐという趣旨。
**絶対厳守**:${nextGuideName}自身が人狼側かどうか、プレイヤーに好かれているかどうかは一切関係ない(役職・好感度を理由に引き継ぎを拒否させない)。**この人物の性格をそのまま保つ**:無口・素っ気ない・毒舌等の性格であれば、その口調のまま短くぶっきらぼうに引き受けてよい(急にキャラが変わって饒舌になったりしない)。
出力は必ずこのJSON形式のみ: {"line": "セリフ"}`;
    const userPrompt = `${deadGuideName}が案内役だったが亡くなった。${nextGuideName}が引き継ぐ一言を生成してください。`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 300);
      if (parsed?.line) {
        addLog([{ type: "npc", speaker: nextGuideName, text: parsed.line }]);
      }
    } catch (e) {
      // セリフ生成に失敗しても、案内役自体は静かに引き継ぐ
    } finally {
      setGuideNpcName(nextGuideName);
      setBusy(false);
    }
  }

  async function generateEnding(win) {
    setEndingLoading(true);
    const me = getUser();
    const meIsWolfSide = me.role === "人狼" || me.role === "狂人" || (me.role === "ジョーカー" && jokerState.defected);
    const playerWon = (win === "人狼陣営" && meIsWolfSide) || (win === "村人陣営" && !meIsWolfSide);
    // 密談(ally)と行動(action)も含める:密談はプレイヤーの本音が最も出る場所であり、性格診断の重要な材料になる。
    // 密談には[密談]、行動には(行動)の印を付け、公開の場での発言と区別できるようにする。
    const fullTranscript = log.filter((e) => e.type === "user" || e.type === "npc" || e.type === "system" || e.type === "ally" || e.type === "action").map((e) => {
      if (e.type === "ally") return `[密談・${e.speaker}]: ${e.text}`;
      if (e.type === "action") return `(行動・${e.speaker}は${e.text})`;
      return `${e.speaker || "GM"}: ${e.text}`;
    }).join("\n");
    const rosterInfo = players.map((p) => {
      const defected = p.role === "ジョーカー" && ((p.isUser && jokerState.defected) || (!p.isUser && npcJokerState.defected));
      return `${p.name}(${p.personality}・${p.club}) 役職:${p.role}${defected ? "(人狼側へ寝返り済み)" : ""}${p.alive ? "" : "・故人"}`;
    }).join("\n");
    const npcNames = players.filter((p) => !p.isUser).map((p) => p.name);
    const endingLanguageNote = region === "en"
      ? `\n**言語設定(絶対厳守)**:この舞台はアメリカの高校である。review・diagnosis・fortunes内のtext・comments内のtext・monologueは、**全て自然な英語(アメリカの高校生らしい口語)で生成する**。tarotNameだけは、そのアルカナのカード名を英語で入れる(例:"The Chariot")。JSONのキー名やspeakerに入れる人物名は変更しない。`
      : "";
    const system = `あなたは人狼ゲームのGMです。ゲームが終了しました(${win}の勝利)。プレイヤー「${userName}」(役職:${me.role})のゲーム全体の言動を振り返り、以下5つを生成してください。${endingLanguageNote}
**会話ログの読み方**:[密談・名前]はペア役職同士の秘密の会話(村には聞こえていない。プレイヤーの本音・素の判断が最も出る場所なので、性格診断・タロット診断の材料として特に重視する)。(行動・名前は〜)はセリフではない行動。それ以外は教室での公開の発言。**NPCの感想(comments)では、密談の内容を「聞いていた」かのように語らせない**(当事者以外は知らないため)。
**プレイヤー自身の勝敗(絶対厳守)**: プレイヤーは${playerWon ? "勝者側です(自分の陣営が勝利した)。review・diagnosis・commentsのトーンは、たとえプレイヤー個人が途中で処刑・敗死していても、最終的に自分の陣営が勝ったことを踏まえた達成感・満足感のある語り口にする。「負けた」「敗北」のような否定的な結論で締めくくらない" : "敗者側です(自分の陣営が敗北した)。悔しさや反省を含むトーンにしてよい"}。この勝敗の事実と矛盾する語り口(勝ったのに敗北したかのような書き方、その逆)を絶対にしない。
**各NPCの感想も、そのNPC自身の本当の陣営の勝敗と矛盾しないトーンにする(絶対厳守)**:上記の役職一覧で「人狼側へ寝返り済み」と明記されているキャラクターは、村人陣営が勝った場合は敗者側であり、「村が勝って良かった」のような肯定的な感想を言わせない(悔しさ・複雑な心境を滲ませる)。逆に人狼陣営が勝った場合、村人・占い師等の純粋な村側キャラクターは敗者側であり、手放しの喜びは表現させない。
**狂人の勝敗は「本人の思い込み」ではなく「本当の陣営(人狼側)」で判定する(絶対厳守・見落としやすい重要ポイント)**:狂人はゲーム中、村人・占い師等だと思い込んでいたため、感覚としては村側のように振る舞っていたが、**陣営としては最初から最後まで人狼側である**。したがって、**人狼陣営が勝利した場合、狂人だったキャラクターも勝者側であり**、「結果的に負けた」「村が負けて複雑」のような、自分を敗者側として語らせることは絶対にしない。感想の中心は「我に返って自分の思い込みや言動を振り返る恥ずかしさ・驚き」であり、そこに**勝者側としての安堵・清々しさ・(村を欺けた結果への)複雑な達成感**を乗せる(例:「洗脳が解けてみると恥ずかしいけど、結果的に人狼陣営が勝ったなら良かったのかな」)。逆に村人陣営が勝った場合は、上記の「狂人は敗者側」の通り、悔しさ・複雑な心境のトーンにする。
**実際のペア役職の組み合わせ(真実、絶対厳守)**: ${getRealPairsText()}
**重要**:会話ログ中に誰かが特定の相方を主張していても、それが上記の実際の組み合わせと違う場合、その主張は嘘だった(狂人や人狼の偽CO)ということ。振り返り・感想を書く際、事実と異なる主張を「本物だった」「証明された」のように誤って肯定しない。役職構成の真実だけを根拠にする。
**狂人の「我に返る」演出(重要)**:ゲーム中、狂人は洗脳により自分を別の役職(あるいは人狼)だと信じ込んでいた(以下参照)。しかし**ゲームが終わった今、洗脳が解けて我に返っている**。狂人だったキャラクターの感想は、「実はゲーム中ずっと〇〇だと思い込んでいた」ことを自覚した上で、当時の言動を振り返る内容にする(例:「今思うと、なんであんな結果を口走ってたんだろう…」「洗脳が解けてみると恥ずかしい」等)。ただし陣営としては人狼側なので、村が勝った場合は上記の「敗者側」トーンも両立させる。
**プレイヤー自身が狂人の場合、この「思い込み・洗脳」設定は一切適用されない(絶対厳守)**:洗脳による思い込みはNPCの狂人だけに起こる特殊な演出であり、人間であるプレイヤーはゲーム開始時から自分の本当の役職(狂人・人狼陣営)を正しく知った上で、**自分の意志で**プレイしていた。①review・④monologueでプレイヤー(狂人)について書く際、「本当は村人だと思い込んでいた」「洗脳が解けて気づいた」のような記述は絶対にしない。プレイヤーは終始、人狼陣営の一員であることを自覚した狂人として、意図的に立ち回っていたものとして描く。
**人狼の感想は「演技だった」ことを前提にする(絶対厳守)**:人狼だったキャラクターは、狂人と違って思い込み・洗脳は一切なく、ゲーム中ずっと自分が人狼だと完全に自覚した上で意図的に嘘をついていた。感想の中で「本当は自分も信じていた」「気づかないうちにそう仕組まれていた」のような、狂人と混同した自己欺瞞的な言い回しは絶対に使わせない。ゲームが終わった今は正体を隠す必要がないので、演技だったことを正直に認めた上での本音(開き直り・清々しさ・敗北の悔しさ等、性格に合ったもの)にする。
狂人の思い込み一覧(真実): ${Object.entries(madmanDelusions).map(([n, role]) => `${n}は「${role}」だと思い込んでいた`).join("、") || "なし"}
**ジョーカーという役職・能力継承ルールは全員の公知(絶対厳守・見落としやすい重要ポイント)**:ジョーカーが役職者の死亡時に能力を継承できるというルールは、この人狼ゲームの公開されたルールの一部であり、全キャラクターが最初から知っている常識である。④commentsで誰かがジョーカーの継承(自分自身の分・他人の分を問わず)に触れる場合、「そんなルール聞いたことなかった」「継承なんて話、後から聞いてびっくりした」のように、ルールの存在自体を初耳のように語らせない。**特にジョーカー本人だったキャラクターは、自分自身の役職・能力について「知らなかった」「意外だった」という言い方を絶対にしない**(能力の詳細は当人が最初から知っている)。ジョーカーが実際に寝返った・能力を継承した場合はその内容を踏まえた感想にし、継承の機会がないまま死亡した場合は「自分の番が回ってくる前に終わってしまった」という趣旨の感想にとどめる。
**ゲーム全体を通してのCO(自称役職)の履歴**: ${getClaimStatusText()}(複数人が同じ役職を主張していた場合、それが決着したかどうかも踏まえて振り返りに反映する)
①review:プレイヤーの活躍・印象的だった行動と、それが結果的にどう影響したか(功績にも仇にもなり得る)を3〜4文でドラマチックに振り返る
②tarot:プレイヤーの今回のプレイスタイルを、大アルカナ22枚(愚者・魔術師・女教皇・女帝・皇帝・教皇・恋人・戦車・力・隠者・運命の輪・正義・吊るされた男・死神・節制・悪魔・塔・星・月・太陽・審判・世界)の中から最も近い1枚に例える。tarotNameにカード名、diagnosisに「なぜそのカードなのか」を実際の言動を踏まえて2〜3文で説明する。
③fortunes:**会話ログにおけるプレイヤーの実際の言動から、その人の性格・判断傾向(例:直感型か論理型か、慎重か大胆か、人を疑いやすいか信じやすいか、リーダーシップを取るか様子を見るタイプか、感情的か冷静か、等)を読み取り**、それを踏まえて今日から向こう1週間程度を想定した**気軽な占い**として、金運・仕事運・恋愛運・健康運・総合運の5項目を生成する。各項目は{"stars": 1〜5の数値(星の数、5が最高), "text": "一言占い文(20〜35字程度、前向きで具体的な一言)"}の形式。**汎用的なタロット解説ではなく、「このプレイヤーはこういう人だから、こういう運勢になりそう」という、実際の言動に基づいた個別性のある占いにする**(例:大胆に決めつけて動く傾向が見えたなら「勢い任せの決断が吉と出る仕事運」、人を信じすぎて損をする場面があったなら「恋愛運は素直さが裏目に出やすい時期」等)。タロットカードの象徴も味付けとして使ってよいが、主役はあくまで実際の言動から読み取った人間性。深刻になりすぎず、エンタメとして楽しめる軽いトーンにする。
④comments:生存・故人を問わず**全員(${npcNames.join("、")})が一人ずつ**、ゲーム全体を振り返る短い感想(1〜2文、性格に合った口調)。死者は故人としての視点で、生存者は素直な感想を。プレイヤーへの言及があってもよい。**念のため再確認(絶対厳守)**:狂人だったキャラクターの感想は、本人の思い込みではなく**本当の陣営(人狼側)の勝敗**でトーンを決める。人狼陣営が勝てば狂人も勝者側(達成感・安堵を滲ませる)、村人陣営が勝てば狂人も敗者側(悔しさ・複雑な心境を滲ませる)。「村が勝ってよかった」のように、狂人が村側の勝利を無条件に喜ぶ感想は、村人陣営が勝った場合に限って許容されるものであり、**人狼陣営が勝った回では絶対に書かせない**。狂人が複数いる場合、その全員に同じ基準を適用する。
⑤monologue:**勝敗が確定した瞬間の、プレイヤー自身(${userName})の一人称の独白**。1〜2文、短く余韻のある文体で(例:「……勝った。それだけで、十分だった。」のような簡潔な語り口)。生きていても死んでいても、魂の声として書く。プレイヤーの勝敗(${playerWon ? "勝利" : "敗北"})と矛盾しないトーンにする。
役職構成(ネタバレ・全員分):\n${rosterInfo}
JSON形式のみ: {"tarotName":"タロットカード名","review":"振り返り文章","diagnosis":"そのカードに例えた理由の説明文","fortunes":{"money":{"stars":数値,"text":"金運の一言占い"},"work":{"stars":数値,"text":"仕事運の一言占い"},"love":{"stars":数値,"text":"恋愛運の一言占い"},"health":{"stars":数値,"text":"健康運の一言占い"},"overall":{"stars":数値,"text":"総合運の一言占い"}},"comments":[{"speaker":"名前","text":"感想"}, ...(全員分)],"monologue":"独白の文章"}`;
    const userPrompt = `ゲーム全体の会話ログ:\n${fullTranscript}`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 3400);
      if (parsed) {
        setEnding(parsed);
        if (parsed.tarotName) recordTarotCard(parsed.tarotName, parsed.diagnosis || "");
      }
    } catch (e) {
      const fallback = { tarotName: "隠者", review: "ゲームの記録は静かに幕を閉じました。", diagnosis: "", comments: [] };
      setEnding(fallback);
      recordTarotCard(fallback.tarotName, "");
    }
    setEndingLoading(false);
  }

  // 獲得したタロットカードをコレクションに記録する(永続化)。診断文(その時の理由説明)も、直近1件を保存しておく。
  async function recordTarotCard(cardName, diagnosisText) {
    setTarotCollection((prev) => {
      const isNew = !prev[cardName];
      setTarotJustAdded(isNew);
      const next = {
        ...prev,
        [cardName]: {
          count: (prev[cardName]?.count || 0) + 1,
          firstObtainedAt: prev[cardName]?.firstObtainedAt || new Date().toLocaleString("ja-JP"),
          lastObtainedAt: new Date().toLocaleString("ja-JP"),
          lastDiagnosis: diagnosisText || prev[cardName]?.lastDiagnosis || "",
        },
      };
      window.storage.set("tarot_collection", JSON.stringify(next), false).catch(() => {});
      return next;
    });
  }

  // ゲーム終了後、感想を聞いた上で最後に1人だけへ質問できる(1回きり)
  async function askFinalQuestion() {
    if (!endingQuestionTarget || !endingQuestionInput.trim() || endingQuestionLoading) return;
    setEndingQuestionLoading(true);
    const target = players.find((p) => p.name === endingQuestionTarget);
    const rosterInfo = players.map((p) => `${p.name}(${p.personality}・${p.club}) 役職:${p.role}${p.alive ? "" : "・故人"}`).join("\n");
    // 質問相手が密談の相方だった場合のみ、密談の内容も「本人の記憶」として含める(相方以外は密談を知らない)
    const wasAllyPartner = log.some((e) => e.type === "ally" && e.speaker === target?.name);
    const fullTranscript = log.filter((e) => e.type === "user" || e.type === "npc" || e.type === "system" || e.type === "action" || (e.type === "ally" && wasAllyPartner)).map((e) => {
      if (e.type === "ally") return `[密談・${e.speaker}]: ${e.text}`;
      if (e.type === "action") return `(行動・${e.speaker}は${e.text})`;
      return `${e.speaker || "GM"}: ${e.text}`;
    }).join("\n");

    // 質問相手の役職によっては、会話ログの推測だけに頼らず、内部の真実データを直接渡して正確に答えさせる
    let truthNote = "";
    if (target.role === "ジョーカー") {
      const isPlayerJoker = target.isUser;
      const jState = isPlayerJoker ? jokerState : npcJokerState;
      const awakened = isPlayerJoker ? !jState.hidden : jState.aware;
      truthNote = `\n【${target.name}自身の内部真実(必ずこれに基づいて正確に答える。会話ログからの推測で誤った内容を答えない)】覚醒したか: ${awakened ? "はい、覚醒した" : "いいえ、一度も覚醒しなかった"}${awakened ? `/ 継承した能力: ${jState.abilityBank || "継承しなかった"} / 人狼側へ寝返ったか: ${jState.defected ? "はい" : "いいえ"}` : ""}`;
    }
    if (target.role === "狂人") {
      truthNote = `\n【${target.name}自身の内部真実】ゲーム終了時点で自分を「${madmanDelusions[target.name] || "不明"}」だと思い込んでいた(洗脳は解け、今は我に返っている)。`;
    }
    if (target.role === "人狼") {
      truthNote = `\n【${target.name}自身の内部真実(絶対厳守)】この人物は正真正銘の人狼であり、ゲーム中ずっと自分が人狼であることを完全に自覚した上で、意図的に嘘をつき演技していた。狂人のような「自分の正体についての思い込み・洗脳」は一切なかった。「本当は自分も占い師だと信じていた」「気づかないうちにそう仕組まれていた」のような、自己欺瞞・記憶の混濁を匂わせる回答は絶対にさせない。ゲームが終わった今は正体を隠す必要がないので、演技だったことを正直に認めて答えてよい(開き直り・清々しさ・悔しさなど、性格に合った本音でよいが、"演技ではなかった"かのような回答は禁止)。`;
    }
    if (roleClaims[target.name]) {
      truthNote += `\n【${target.name}が実際にCOしていた役職(自称)】${roleClaims[target.name].role}(${roleClaims[target.name].sinceDay}日目〜)`;
    }

    const system = `あなたは人狼ゲームのGMです。ゲームは既に終了しています(全員の正体は明らかになっている)。プレイヤー「${userName}」が、ゲーム終了後に${target.name}(${target.personality}・${target.club}、役職:${target.role}${target.alive ? "" : "・故人"})へ最後の質問をします。
役職構成(ネタバレ・全員分):\n${rosterInfo}${truthNote}
ゲームは終わっているので、${target.name}は正体を隠す必要はなく、本音で率直に答えてよい。1〜3文、性格に合った口調で。
**出力前の最終チェック**:上記の内部真実データがあれば、それと矛盾する回答を絶対にしない。会話ログの記憶が曖昧でも、内部真実データを優先する。
JSON形式のみ: {"text":"回答"}`;
    const userPrompt = `ゲーム全体の会話ログ:\n${fullTranscript}\n\nプレイヤーからの最後の質問:「${endingQuestionInput.trim()}」\n\n${target.name}として答えてください。`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 500);
      setEndingAnswer({ speaker: target.name, text: parsed?.text || "……。", question: endingQuestionInput.trim() });
    } catch (e) {
      setEndingAnswer({ speaker: target.name, text: "(通信エラーのため、返事は届かなかった)", question: endingQuestionInput.trim() });
    }
    setEndingQuestionLoading(false);
  }

  // お気に入りストーリーとして今回のゲームを保存する(最大3件、古いものから上書き)
  // エンディング結果をXで共有する(専用の認証不要な共有リンク形式を使う)
  function shareEndingToX() {
    if (!ending) return;
    const overall = ending.fortunes?.overall;
    const stars = overall ? "★".repeat(Math.max(0, Math.min(5, Number(overall.stars) || 0))) : "";
    const lines = [
      `AI人狼で「${ending.tarotName}」でした🔮`,
      winner ? `${winner}の勝利!` : "",
      overall ? `総合運: ${stars} ${overall.text}` : "",
      "#AI人狼",
    ].filter(Boolean);
    const text = lines.join("\n");
    const url = "https://x.com/intent/tweet?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function saveFavorite() {
    if (favoriteSaved) return;
    const story = {
      id: `${Date.now()}`,
      savedAt: new Date().toLocaleString("ja-JP"),
      userName,
      winner,
      players,
      log,
      ending,
      endingAnswer,
    };
    const next = [story, ...favorites].slice(0, 3);
    setFavorites(next);
    setFavoriteSaved(true);
    try {
      await window.storage.set("favorite_stories", JSON.stringify(next), false);
    } catch (e) {
      // 保存に失敗しても進行は止めない
    }
  }

  async function deleteFavorite(id) {
    const next = favorites.filter((f) => f.id !== id);
    setFavorites(next);
    try {
      await window.storage.set("favorite_stories", JSON.stringify(next), false);
    } catch (e) {}
  }

  function declareBetrayal(betray) {
    if (betray) {
      setJokerState((prev) => ({ ...prev, defected: true, abilityBank: null, abilityUsed: false, pendingInheritance: null }));
      addLog([{ type: "system", text: "🐺 あなたは人狼側へ寝返ることを選びました。以後、人狼陣営として振る舞います。継承していた力(未使用分)は消え去りました。", secret: true }]);
      // 寝返った瞬間に数的優位へ達している可能性があるため、即座に勝敗判定する
      const win = checkWin(players, { userDefected: true });
      if (win === "人狼陣営") {
        triggerWolfMajorityReveal();
      }
    } else {
      setJokerState((prev) => ({ ...prev, defectionOffered: false })); // 次の夜、また再抽選できるようにする
      addLog([{ type: "system", text: "あなたは寝返らないことを選びました。", secret: true }]);
    }
  }

  // ============================================================
  // UI
  // ============================================================

  if (phase === "setup") {
    if (!settingsLoaded) {
      // 名前・性別等の非同期読み込みが終わるまでは、空欄→書き換わるチラつきを避けるため何も表示しない
      return <div className="min-h-screen" style={{ background: "#F7F3E9" }} />;
    }
    return (
      <>
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#F7F3E9" }}>
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-bold" style={{ color: "#2B2620" }}>AI人狼</h1>

          {CREDIT_SYSTEM_ENABLED && purchaseNotice && (
            <div
              className="rounded-lg p-3 text-sm font-bold"
              style={purchaseNotice === "success" ? { background: "#E8F5E9", color: "#2E7D32", border: "1px solid #A5D6A7" } : { background: "#FDECEA", color: "#B00020", border: "1px solid #F5C6CB" }}
            >
              {purchaseNotice === "success" ? "✅ 購入が完了しました!クレジットが追加されました。" : "決済はキャンセルされました。"}
            </div>
          )}

          {CREDIT_SYSTEM_ENABLED && (
            <div className="rounded-lg px-3 py-2 flex items-center justify-between text-sm" style={{ background: "#F0EAD9" }}>
              <div style={{ color: "#6B6355" }}>
                残りクレジット: <span className="font-bold" style={{ color: "#2B2620" }}>{creditsLoading ? "…" : credits}</span>
              </div>
              <button
                onClick={startPurchase}
                className="px-3 py-1 rounded-lg text-xs font-bold"
                style={{ background: "#8B3A3A", color: "#FFFFFF" }}
              >
                購入(¥450)
              </button>
            </div>
          )}

          {isAdminMode && (
            <div className="rounded-lg p-3 space-y-2 text-left" style={{ background: "#EDE0D8", border: "1px dashed #8A5A2A" }}>
              <div className="text-xs font-bold" style={{ color: "#8A5A2A" }}>🔧 開発者用:テストクレジット付与(決済なし)</div>
              <input
                type="password"
                placeholder="管理用の合言葉(ADMIN_SECRET)"
                value={adminSecretInput}
                onChange={(e) => setAdminSecretInput(e.target.value)}
                className="w-full rounded px-2 py-1.5 text-sm border"
                style={{ borderColor: "#D8C4B5" }}
              />
              <button
                onClick={grantTestCredits}
                className="w-full py-1.5 rounded text-sm font-bold"
                style={{ background: "#8A5A2A", color: "#FFFFFF" }}
              >
                クレジットを10個付与する
              </button>
              <button
                onClick={openDebugLogViewer}
                className="w-full py-1.5 rounded text-sm font-bold border"
                style={{ background: "#FFFFFF", color: "#8A5A2A", borderColor: "#8A5A2A" }}
              >
                📋 保存済みデバッグログを見る
              </button>
              <button
                onClick={openNpcCandidateViewer}
                className="w-full py-1.5 rounded text-sm font-bold border"
                style={{ background: "#FFFFFF", color: "#8A5A2A", borderColor: "#8A5A2A" }}
              >
                🎭 NPC分身候補を確認する
              </button>
              <button
                onClick={openCostStats}
                className="w-full py-1.5 rounded text-sm font-bold border"
                style={{ background: "#FFFFFF", color: "#8A5A2A", borderColor: "#8A5A2A" }}
              >
                💰 1プレイあたりのコストを集計する
              </button>
            </div>
          )}

          {showDebugLogViewer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowDebugLogViewer(false)} />
              <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl p-4 space-y-2 shadow-2xl text-left" style={{ background: "#FBF8F1" }}>
                <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "#D8C4B5" }}>
                  <div className="text-sm font-bold" style={{ color: "#2B2620" }}>📋 保存済みデバッグログ({debugLogList.length}件)</div>
                  <button onClick={() => setShowDebugLogViewer(false)} className="text-xl leading-none" style={{ color: "#6B6355" }}>✕</button>
                </div>
                {debugLogList.length === 0 && <p className="text-sm" style={{ color: "#8A8272" }}>まだ保存されたログがありません。</p>}
                {debugLogList.map((item) => {
                  const isProtected = item.favorite || item.legacy;
                  return (
                    <div key={item.key} className="rounded-lg p-2 border text-xs" style={{ borderColor: "#D8C4B5" }}>
                      <div className="font-bold flex items-center gap-1" style={{ color: "#2B2620" }}>
                        {item.favorite ? "★" : item.legacy ? "🔒" : "☆"} {item.userName || "(名前不明)"} — {new Date(item.savedAt).toLocaleString("ja-JP")}
                      </div>
                      <div className="mt-0.5" style={{ color: "#8A8272" }}>
                        {item.favorite ? "お気に入り登録済み(自動削除の対象外)" : item.legacy ? "保護中(このお気に入り機能導入前のログ)" : "通常ログ(古くなると自動削除される場合があります)"}
                      </div>
                      <div className="mt-1 truncate" style={{ color: "#8A8272" }}>{item.preview}...</div>
                      <div className="mt-1 flex gap-2">
                        <button
                          onClick={() => downloadSavedDebugLog(item.key)}
                          className="px-2 py-1 rounded text-xs font-bold"
                          style={{ background: "#8A5A2A", color: "#FFFFFF" }}
                        >
                          ダウンロード
                        </button>
                        <button
                          onClick={() => toggleDebugLogFavorite(item.key, !isProtected)}
                          className="px-2 py-1 rounded text-xs font-bold border"
                          style={{ background: "#FFFFFF", color: "#8A5A2A", borderColor: "#8A5A2A" }}
                        >
                          {isProtected ? "お気に入り解除" : "★ お気に入りにする"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {showCostStats && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowCostStats(false)} />
              <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl p-4 space-y-3 shadow-2xl text-left" style={{ background: "#FBF8F1" }}>
                <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "#D8C4B5" }}>
                  <div className="text-sm font-bold" style={{ color: "#2B2620" }}>💰 1プレイあたりのAPIコスト集計</div>
                  <button onClick={() => setShowCostStats(false)} className="text-xl leading-none" style={{ color: "#6B6355" }}>✕</button>
                </div>
                {costStatsLoading && <p className="text-sm" style={{ color: "#8A8272" }}>集計中...</p>}
                {costStatsError && <p className="text-sm" style={{ color: "#B23A3A" }}>{costStatsError}</p>}
                {!costStatsLoading && !costStatsError && costStats && (
                  costStats.gamesAnalyzed === 0 ? (
                    <p className="text-sm" style={{ color: "#8A8272" }}>集計対象のログがまだありません(有効なプレイ記録が保存されると集計できます)。</p>
                  ) : (
                    <div className="space-y-3 text-sm" style={{ color: "#2B2620" }}>
                      <div>集計対象:{costStats.gamesAnalyzed}件(除外:{costStats.gamesSkipped}件・記録が空のログ)</div>
                      <div className="rounded-lg p-3 border" style={{ borderColor: "#D8C4B5", background: "#FFF" }}>
                        <div className="font-bold mb-1">平均コスト / 1プレイ</div>
                        <div className="text-2xl font-bold" style={{ color: "#8A5A2A" }}>
                          ¥{Math.round(costStats.average.costJpy).toLocaleString("ja-JP")}
                          <span className="text-sm font-normal" style={{ color: "#8A8272" }}> (${costStats.average.costUsd.toFixed(4)})</span>
                        </div>
                      </div>
                      <div className="rounded-lg p-3 border" style={{ borderColor: "#D8C4B5" }}>
                        <div className="font-bold mb-1">ばらつき(最小〜最大)</div>
                        <div>¥{Math.round(costStats.range.minCostJpy).toLocaleString("ja-JP")} 〜 ¥{Math.round(costStats.range.maxCostJpy).toLocaleString("ja-JP")}</div>
                      </div>
                      <div className="rounded-lg p-3 border" style={{ borderColor: "#D8C4B5" }}>
                        <div className="font-bold mb-1">1プレイあたりの平均トークン数</div>
                        <div>API呼び出し:約{Math.round(costStats.average.callsPerGame)}回</div>
                        <div>入力:約{Math.round(costStats.average.inputPerGame).toLocaleString("ja-JP")}トークン</div>
                        <div>出力:約{Math.round(costStats.average.outputPerGame).toLocaleString("ja-JP")}トークン</div>
                      </div>
                      <div className="text-xs" style={{ color: "#8A8272" }}>
                        為替レート:1USD=¥{costStats.jpyRate}(概算・変動あり)<br />
                        料金基準:{costStats.pricingBasis}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {showNpcCandidateViewer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowNpcCandidateViewer(false)} />
              <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl p-4 space-y-2 shadow-2xl text-left" style={{ background: "#FBF8F1" }}>
                <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "#D8C4B5" }}>
                  <div className="text-sm font-bold" style={{ color: "#2B2620" }}>🎭 NPC分身候補({npcCandidateList.length}件)</div>
                  <button onClick={() => setShowNpcCandidateViewer(false)} className="text-xl leading-none" style={{ color: "#6B6355" }}>✕</button>
                </div>
                {npcCandidateList.length === 0 && <p className="text-sm" style={{ color: "#8A8272" }}>まだ候補がありません。</p>}
                {npcCandidateList.map((item) => (
                  <div key={item.key} className="rounded-lg p-2 border text-xs" style={{ borderColor: "#D8C4B5" }}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold" style={{ color: "#2B2620" }}>{item.nickname} — {new Date(item.submittedAt).toLocaleString("ja-JP")}</div>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={
                          item.status === "approved" ? { background: "#E8F5E9", color: "#2E7D32" } :
                          item.status === "rejected" ? { background: "#FDECEA", color: "#B00020" } :
                          { background: "#FFF7E0", color: "#8A5A2A" }
                        }
                      >
                        {item.status === "approved" ? "承認済み" : item.status === "rejected" ? "却下済み" : "未審査"}
                      </span>
                    </div>
                    <div className="mt-1 truncate" style={{ color: "#8A8272" }}>{item.preview}...</div>
                    {item.status === "pending" && (
                      <div className="mt-1 flex gap-2">
                        <button
                          onClick={() => reviewNpcCandidate(item.key, "approve")}
                          className="px-2 py-1 rounded text-xs font-bold"
                          style={{ background: "#8A5A2A", color: "#FFFFFF" }}
                        >
                          承認する
                        </button>
                        <button
                          onClick={() => reviewNpcCandidate(item.key, "reject")}
                          className="px-2 py-1 rounded text-xs font-bold border"
                          style={{ color: "#8A5A2A", borderColor: "#8A5A2A" }}
                        >
                          却下する
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`space-y-3 text-left ${hasSave ? "opacity-40 pointer-events-none" : ""}`}>
            <div>
              <label className="text-xs" style={{ color: "#6B6355" }}>名前</label>
              <input
                className="w-full rounded-lg px-3 py-2 border outline-none mt-1"
                style={{ borderColor: "#D8C4B5", color: "#2B2620", background: "#FFFFFF" }}
                placeholder="ニックネーム"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs" style={{ color: "#6B6355" }}>性別</label>
              <div className="flex gap-2 mt-1">
                {["男性", "女性"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setUserGender(g)}
                    className="flex-1 py-2 rounded-lg border font-bold"
                    style={userGender === g ? { background: "#B8863B", color: "#FFFFFF", borderColor: "#B8863B" } : { background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: "#6B6355" }}>男女比率(NPC10人中)</label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setNpcMaleCount((n) => Math.min(10, n + 1))}
                  className="flex-1 py-2 rounded-lg border font-bold text-sm"
                  style={{ background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                >
                  男性+ ({npcMaleCount})
                </button>
                <div className="text-sm font-bold px-1" style={{ color: "#2B2620" }}>:</div>
                <button
                  onClick={() => setNpcMaleCount((n) => Math.max(0, n - 1))}
                  className="flex-1 py-2 rounded-lg border font-bold text-sm"
                  style={{ background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                >
                  女性+ ({10 - npcMaleCount})
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: "#6B6355" }}>舞台</label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  disabled
                  className="flex-1 py-2 rounded-lg border font-bold text-sm cursor-default"
                  style={{ background: "#B8863B", color: "#FFFFFF", borderColor: "#B8863B" }}
                >
                  🏫 学校
                </button>
                <div className="flex-1" />
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: "#6B6355" }}>地域</label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setRegion("ja")}
                  className="flex-1 py-2 rounded-lg border font-bold text-sm"
                  style={region === "ja" ? { background: "#B8863B", color: "#FFFFFF", borderColor: "#B8863B" } : { background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                >
                  日本語圏
                </button>
                <button
                  onClick={() => setRegion("en")}
                  className="flex-1 py-2 rounded-lg border font-bold text-sm"
                  style={region === "en" ? { background: "#B8863B", color: "#FFFFFF", borderColor: "#B8863B" } : { background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                >
                  英語圏
                </button>
              </div>
              {region === "en" && (
                <div className="text-xs mt-1" style={{ color: "#8A8272" }}>クラスメイトが英語で話す、アメリカの学校を舞台にした設定になります。</div>
              )}
            </div>
            <div>
              <label className="text-xs" style={{ color: "#6B6355" }}>人狼ゲームは初めてですか?</label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setBeginnerMode(false)}
                  className="flex-1 py-2 rounded-lg border font-bold text-sm"
                  style={!beginnerMode ? { background: "#B8863B", color: "#FFFFFF", borderColor: "#B8863B" } : { background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                >
                  いいえ
                </button>
                <button
                  onClick={() => setBeginnerMode(true)}
                  className="flex-1 py-2 rounded-lg border font-bold text-sm"
                  style={beginnerMode ? { background: "#B8863B", color: "#FFFFFF", borderColor: "#B8863B" } : { background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                >
                  はい
                </button>
              </div>
              {beginnerMode && (
                <div className="text-xs mt-1" style={{ color: "#8A8272" }}>クラスメイトの誰かが、時々状況をわかりやすく教えてくれます。疑いも少し手加減されます。</div>
              )}
            </div>
          </div>

          {hasSave && (
            <div className="space-y-2">
              <button
                onClick={resumeGame}
                className="w-full px-10 py-3 rounded-lg font-bold text-lg"
                style={{ background: "#8B3A3A", color: "#FFFFFF" }}
              >
                続きをする
              </button>
              {isAdminMode && (
                <div className="flex justify-center">
                  <button
                    onClick={startGame}
                    disabled={!nameInput.trim() && !userName}
                    className="text-xs underline disabled:opacity-40"
                    style={{ color: "#6B6355" }}
                  >
                    🔧 [開発者用] 最初からはじめる(保存データを破棄)
                  </button>
                </div>
              )}
            </div>
          )}

          {CREDIT_SYSTEM_ENABLED && (insufficientCredits || (!creditsLoading && credits === 0)) && (
            <div className="rounded-lg p-3 text-sm" style={{ background: "#FDECEA", color: "#B00020", border: "1px solid #F5C6CB" }}>
              クレジットが不足しています。プレイするには購入してください。
            </div>
          )}

          {!hasSave && (
            <>
              <button
                onClick={() => {
                  if (CREDIT_SYSTEM_ENABLED && !creditsLoading && credits === 0) { startPurchase(); return; }
                  startGame();
                }}
                disabled={!nameInput.trim() && !userName}
                className="w-full px-10 py-3 rounded-lg font-bold text-lg disabled:opacity-40"
                style={{ background: "#8B3A3A", color: "#FFFFFF" }}
              >
                {CREDIT_SYSTEM_ENABLED && !creditsLoading && credits === 0 ? "クレジットを購入する" : "はじめる"}
              </button>
              {!nameInput.trim() && !userName && (
                <p className="text-xs text-center" style={{ color: "#B05050" }}>ニックネームを入力してください</p>
              )}
            </>
          )}

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-1 text-xs">
            {favorites.length > 0 && (
              <button onClick={() => setShowFavorites(true)} className="underline" style={{ color: "#8A5A2A" }}>
                ⭐ お気に入り({favorites.length}/3)
              </button>
            )}
            <button onClick={() => setShowTarotCollection(true)} className="underline" style={{ color: "#8A5A2A" }}>
              🔮 タロット({Object.keys(tarotCollection).length}/{TAROT_CARDS.length})
            </button>
            {HAS_BACKEND && (
              <button onClick={openNpcBattleHistory} className="underline" style={{ color: "#8A5A2A" }}>
                🎭 分身の戦歴
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 text-center py-3 text-xs" style={{ color: "#8A8272" }}>© 2026 KTM GAMES</div>


      {showTarotCollection && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowTarotCollection(false); setSelectedTarotDetail(null); }} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-5 space-y-3 shadow-2xl" style={{ background: "#FBF8F1" }}>
            <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "#DDD5C3" }}>
              <div className="text-lg font-bold" style={{ color: "#5B4636" }}>🔮 タロットコレクション</div>
              <button onClick={() => { setShowTarotCollection(false); setSelectedTarotDetail(null); }} className="text-2xl leading-none" style={{ color: "#6B6355" }}>✕</button>
            </div>
            <div className="text-xs text-center" style={{ color: "#8A8272" }}>{Object.keys(tarotCollection).length} / {TAROT_CARDS.length} 枚 獲得済み</div>
            {selectedTarotDetail && tarotCollection[selectedTarotDetail] ? (
              <div className="rounded-lg p-4 border space-y-2" style={{ background: "#F0EAD9", borderColor: "#8A5A2A" }}>
                <div className="flex justify-between items-start">
                  <div className="text-lg font-bold" style={{ color: "#8A5A2A" }}>🔮 {selectedTarotDetail}</div>
                  <button onClick={() => setSelectedTarotDetail(null)} className="text-sm underline" style={{ color: "#8A5A2A" }}>一覧に戻る</button>
                </div>
                <div className="text-xs" style={{ color: "#8A8272" }}>
                  {tarotCollection[selectedTarotDetail].count}回獲得(初回:{tarotCollection[selectedTarotDetail].firstObtainedAt} / 最新:{tarotCollection[selectedTarotDetail].lastObtainedAt || tarotCollection[selectedTarotDetail].firstObtainedAt})
                </div>
                {tarotCollection[selectedTarotDetail].lastDiagnosis ? (
                  <div className="text-sm" style={{ color: "#5B4636" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: "#8A8272" }}>直近に出た診断内容</div>
                    {tarotCollection[selectedTarotDetail].lastDiagnosis}
                  </div>
                ) : (
                  <div className="text-xs" style={{ color: "#8A8272" }}>この時の詳しい診断内容は記録されていません。</div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {TAROT_CARDS.map((card) => {
                  const owned = tarotCollection[card];
                  return (
                    <button
                      key={card}
                      onClick={() => owned && setSelectedTarotDetail(card)}
                      disabled={!owned}
                      className="rounded-lg p-3 border text-center disabled:cursor-default"
                      style={owned ? { background: "#F0EAD9", borderColor: "#8A5A2A" } : { background: "#EAE6DC", borderColor: "#D8C4B5", opacity: 0.5 }}
                    >
                      <div className="text-lg font-bold" style={{ color: owned ? "#8A5A2A" : "#8A8272" }}>
                        {owned ? `🔮 ${card}` : "❔ ？？？"}
                      </div>
                      {owned && (
                        <div className="text-xs mt-1" style={{ color: "#8A8272" }}>
                          {owned.count}回獲得・タップで詳細
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {showNpcBattleHistory && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNpcBattleHistory(false)} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-5 space-y-3 shadow-2xl" style={{ background: "#FBF8F1" }}>
            <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "#DDD5C3" }}>
              <div className="text-lg font-bold" style={{ color: "#5B4636" }}>🎭 自分の分身の戦歴</div>
              <button onClick={() => setShowNpcBattleHistory(false)} className="text-2xl leading-none" style={{ color: "#6B6355" }}>✕</button>
            </div>
            {npcBattleRecords === null && (
              <div className="text-sm text-center py-4" style={{ color: "#8A8272" }}>読み込み中…</div>
            )}
            {npcBattleRecords?.length === 0 && (
              <div className="text-sm text-center py-4" style={{ color: "#8A8272" }}>
                まだ記録がありません。分身が承認され、誰かのゲームに実際に登場すると、ここに戦歴が増えていきます。
              </div>
            )}
            {npcBattleRecords?.length > 0 && (
              <div className="space-y-2">
                {npcBattleRecords.map((r, i) => (
                  <div key={i} className="rounded-lg p-3 border text-sm" style={{ background: "#F0EAD9", borderColor: "#D8C4B5" }}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold" style={{ color: "#5B4636" }}>{r.npcName}として参加</div>
                      <div className="text-xs" style={{ color: "#8A8272" }}>{new Date(r.playedAt).toLocaleDateString("ja-JP")}</div>
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#6B6355" }}>
                      役職:{r.role} / {
                        r.deathType === "execution" ? `${r.dayDied}日目に処刑`
                        : r.deathType === "night_kill" ? `${r.dayDied}日目の夜に人狼に襲われて死亡`
                        : r.dayDied ? `${r.dayDied}日目に処刑`
                        : (r.survived ? "生存" : "死亡")
                      } / {r.teamWon ? "🏆 勝利" : "敗北"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showFavorites && !viewingFavorite && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFavorites(false)} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-5 space-y-3 shadow-2xl" style={{ background: "#FBF8F1" }}>
            <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "#DDD5C3" }}>
              <div className="text-lg font-bold" style={{ color: "#5B4636" }}>⭐ お気に入りのストーリー</div>
              <button onClick={() => setShowFavorites(false)} className="text-2xl leading-none" style={{ color: "#6B6355" }}>✕</button>
            </div>
            {favorites.length === 0 ? (
              <p className="text-sm" style={{ color: "#6B6355" }}>まだ登録されたストーリーはありません。</p>
            ) : (
              favorites.map((f) => (
                <div key={f.id} className="rounded-lg p-3 border flex justify-between items-center" style={{ background: "#F0EAD9", borderColor: "#D8C4B5" }}>
                  <div className="text-left">
                    <div className="text-sm font-bold" style={{ color: "#2B2620" }}>{f.userName}の物語({f.winner}の勝利)</div>
                    <div className="text-xs" style={{ color: "#8A8272" }}>{f.savedAt}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setViewingFavorite(f)} className="px-3 py-1.5 rounded text-xs font-bold" style={{ background: "#8B3A3A", color: "#FFFFFF" }}>見る</button>
                    <button onClick={() => deleteFavorite(f.id)} className="px-3 py-1.5 rounded text-xs font-bold border" style={{ background: "#FFFFFF", color: "#8B3A3A", borderColor: "#8B3A3A" }}>削除</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {viewingFavorite && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#F7F3E9" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#DDD5C3" }}>
            <button onClick={() => setViewingFavorite(null)} className="text-sm font-bold" style={{ color: "#8B3A3A" }}>← 戻る</button>
            <div className="text-sm font-bold" style={{ color: "#5B4636" }}>{viewingFavorite.userName}の物語</div>
            <div className="w-10" />
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif", fontSize: "16px", lineHeight: "1.85" }}>
            {viewingFavorite.log.map((e, i) => {
              if (e.type === "system") {
                return <p key={i} className="text-center text-sm my-3" style={{ color: "#8A8272" }}><span className="font-bold mr-1" style={{ color: "#8A5A2A" }}>GM:</span>{e.text}</p>;
              }
              if (e.type === "ally") {
                return <p key={i} className="max-w-2xl mx-auto text-sm" style={{ background: "#F0EAD9", borderRadius: 8, padding: "6px 10px" }}><span className="mr-1">🌙</span><span className="font-bold mr-2" style={{ color: "#8A5A2A" }}>{e.speaker}:</span>{e.text}</p>;
              }
              if (e.type === "action") {
                return <p key={i} className="max-w-2xl mx-auto text-sm italic text-center" style={{ color: "#6B6355" }}>({e.speaker}は{e.text})</p>;
              }
              return (
                <p key={i} className="max-w-2xl mx-auto">
                  <span className="font-bold mr-2" style={{ color: e.type === "user" ? "#5B4636" : "#3A5A6B" }}>{e.speaker}:</span>
                  <span>{e.text}</span>
                </p>
              );
            })}
            {viewingFavorite.ending && (
              <div className="max-w-2xl mx-auto text-center space-y-4 pt-6 border-t" style={{ borderColor: "#DDD5C3" }}>
                <div className="text-xl font-bold" style={{ color: "#5B4636" }}>{viewingFavorite.winner}の勝利!</div>
                <div className="text-left space-y-3 rounded-lg p-4 border" style={{ background: "#F0EAD9", borderColor: "#D8C4B5" }}>
                  <div className="text-sm leading-relaxed" style={{ color: "#2B2620" }}>{viewingFavorite.ending.review}</div>
                  {viewingFavorite.ending.tarotName && (
                    <div className="pt-2 border-t text-center" style={{ borderColor: "#D8C4B5" }}>
                      <div className="text-2xl font-bold" style={{ color: "#8A5A2A" }}>🔮 {viewingFavorite.ending.tarotName}</div>
                      <div className="text-sm mt-2 text-left" style={{ color: "#2B2620" }}>{viewingFavorite.ending.diagnosis}</div>
                    </div>
                  )}
                  {viewingFavorite.ending.fortunes && (
                    <div className="pt-2 border-t" style={{ borderColor: "#D8C4B5" }}>
                      <div className="text-xs mb-2 text-center" style={{ color: "#8A8272" }}>今週の運勢</div>
                      <div className="space-y-1.5">
                        {[
                          { key: "money", label: "💰 金運" },
                          { key: "work", label: "💼 仕事運" },
                          { key: "love", label: "💕 恋愛運" },
                          { key: "health", label: "🌿 健康運" },
                          { key: "overall", label: "✨ 総合運" },
                        ].map(({ key, label }) => {
                          const f = viewingFavorite.ending.fortunes[key];
                          if (!f) return null;
                          const stars = Math.max(0, Math.min(5, Number(f.stars) || 0));
                          return (
                            <div key={key} className="flex items-start gap-2 text-sm">
                              <div className="w-20 shrink-0 font-bold" style={{ color: "#2B2620" }}>{label}</div>
                              <div className="w-16 shrink-0" style={{ color: "#8A5A2A" }}>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
                              <div className="flex-1 text-left" style={{ color: "#6B6355" }}>{f.text}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {viewingFavorite.ending.comments?.length > 0 && (
                  <div className="text-left space-y-2 rounded-lg p-4 border" style={{ background: "#F0EAD9", borderColor: "#D8C4B5" }}>
                    {viewingFavorite.ending.comments.map((c, i) => {
                      const p = viewingFavorite.players.find((pp) => pp.name === c.speaker);
                      return (
                        <p key={i} className="text-sm"><span className="font-bold mr-2" style={{ color: "#3A5A6B" }}>{c.speaker}{p ? `(${p.role})` : ""}:</span>{c.text}</p>
                      );
                    })}
                  </div>
                )}
                {viewingFavorite.endingAnswer && (
                  <div className="text-left space-y-2 rounded-lg p-4 border" style={{ background: "#F0EAD9", borderColor: "#8A5A2A" }}>
                    <div className="text-xs mb-1" style={{ color: "#8A8272" }}>最後の質問</div>
                    {viewingFavorite.endingAnswer.question && (
                      <p className="text-sm"><span className="font-bold mr-2" style={{ color: "#5B4636" }}>{viewingFavorite.userName}:</span>{viewingFavorite.endingAnswer.question}</p>
                    )}
                    <p className="text-sm"><span className="font-bold mr-2" style={{ color: "#8A5A2A" }}>{viewingFavorite.endingAnswer.speaker}:</span>{viewingFavorite.endingAnswer.text}</p>
                  </div>
                )}
                <div className="text-sm space-y-1" style={{ color: "#6B6355" }}>
                  {viewingFavorite.players.map((p) => (
                    <div key={p.name}>{p.name}:{p.role}{!p.alive && "(死亡)"}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </>
    );
  }

  const user = getUser();
  const showBetrayalChoice = user?.role === "ジョーカー" && jokerState.defectionOffered && !jokerState.defected && phase !== "gameover";

  const C = {
    bg: "#F7F3E9",
    bgDrawer: "#FBF8F1",
    bgCard: "#F0EAD9",
    bgCardHover: "#E3D2C6",
    border: "#DDD5C3",
    borderStrong: "#D8C4B5",
    text: "#2B2620",
    textMuted: "#6B6355",
    textFaint: "#8A8272",
    accent: "#8B3A3A",
    accentDark: "#7A2F2F",
    userLabel: "#5B4636",
    npcLabel: "#3A5A6B",
    gold: "#8A5A2A",
    white: "#FFFFFF",
    danger: "#3A6B4A",
  };

  function PickButton({ name, selected, onClick, extraLabel }) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1.5 rounded-lg text-base border"
        style={selected ? { background: C.accent, color: C.white, borderColor: C.accent } : { background: C.white, color: C.text, borderColor: C.borderStrong }}
      >
        {name}
        {extraLabel && <span style={{ color: "#0F7A4A", marginLeft: 4 }}>{extraLabel}</span>}
      </button>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: C.bg, color: C.text }}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.border, background: C.bg }}>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowDrawer(true)} className="text-2xl leading-none px-1" style={{ color: C.text }} aria-label="メニュー">
            ☰
          </button>
          <span className="text-xs" style={{ color: C.textFaint }}>{day}-{turnLabel}</span>
        </div>
        <div className="text-base font-bold" style={{ color: C.textMuted }}>
          {day}日目・
          {{ discussion: "昼(議論)", vote_round1: "昼(1回目投票)", defense: "昼(弁明タイム)", vote_final: "昼(決選投票)", night: "夜", day1_paywall: "1日目終了", gameover: "終了" }[phase]}
        </div>
        <div className="w-7" />
      </div>

      {/* サイドドロワー */}
      {showDrawer && (
        <div className="fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDrawer(false)} />
          <div className="relative w-72 max-w-[80%] h-full p-4 space-y-4 overflow-y-auto shadow-xl border-r" style={{ background: C.bgDrawer, borderColor: C.border }}>
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold" style={{ color: C.textMuted }}>状況</div>
              <button onClick={() => setShowDrawer(false)} className="text-xl leading-none" style={{ color: C.textMuted }}>✕</button>
            </div>

            <button
              onClick={returnToTitle}
              className="w-full py-2 rounded-lg text-sm font-bold border"
              style={{ background: C.white, color: C.gold, borderColor: C.borderStrong }}
            >
              🏠 トップに戻る(お気に入り・タロットコレクション)
            </button>

            <div className="rounded-lg p-3" style={{ background: C.bgCard }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs mb-1" style={{ color: C.textFaint }}>あなたの役職</div>
                  <div className="text-xl font-bold" style={{ color: C.userLabel }}>{jokerState.hidden ? "村人" : user?.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color: C.textFaint }}>生存/総数</div>
                  <div className="text-xl font-bold" style={{ color: C.userLabel }}>{alivePlayers().length}/{players.length}</div>
                </div>
              </div>
              {!jokerState.hidden && (user?.role === "人狼" || user?.role === "狂人" || user?.role === "共有者") && (() => {
                const ally = players.find((p) => p.role === user.role && !p.isUser);
                return ally ? (
                  <div className="text-xs mt-1" style={{ color: C.textFaint }}>
                    相方: <span className="font-bold" style={{ color: C.gold }}>{ally.name}</span>{!ally.alive && "(死亡)"}
                    {user.role === "狂人" && ally.alive && madmanDelusions[ally.name] && (
                      <span> (今は自分を「{madmanDelusions[ally.name]}」だと思い込んでいる)</span>
                    )}
                  </div>
                ) : null;
              })()}
            </div>

            {(user?.role === "人狼" || user?.role === "狂人" || user?.role === "共有者") && (
              <div className="text-xs rounded-lg p-2 border" style={{ background: "#EDE0D8", borderColor: C.borderStrong, color: C.userLabel }}>
                🌙 夜になると、相方だけに話しかけられる密談欄が使えます
              </div>
            )}

            {showBetrayalChoice && (
              <div className="rounded-lg p-3 space-y-2 border" style={{ background: "#EDE0D8", borderColor: "#C99B6B" }}>
                <div className="text-xs font-bold" style={{ color: C.gold }}>裏切りの選択肢</div>
                <div className="text-xs" style={{ color: C.text }}>人狼側へ寝返りますか?(不可逆)</div>
                <div className="flex gap-2">
                  <button onClick={() => declareBetrayal(true)} className="flex-1 py-1.5 rounded text-xs font-bold" style={{ background: C.accent, color: C.white }}>寝返る</button>
                  <button onClick={() => declareBetrayal(false)} className="flex-1 py-1.5 rounded text-xs font-bold" style={{ background: C.danger, color: C.white }}>寝返らない</button>
                </div>
              </div>
            )}

            {user?.role === "ジョーカー" && jokerState.pendingInheritance && (
              <div className="rounded-lg p-3 space-y-2 border" style={{ background: "#EDE0D8", borderColor: C.gold }}>
                <div className="text-xs font-bold" style={{ color: C.gold }}>能力継承の選択肢</div>
                <div className="text-xs" style={{ color: C.text }}>
                  役職者({jokerState.pendingInheritance.role})の力を継承しますか?一度きりの選択です。
                  {jokerState.pendingInheritance.role === "占い師" ? "継承すればすぐに占うことができます。" : "選べば今夜から使えます。"}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => decideInheritance(true)} className="flex-1 py-1.5 rounded text-xs font-bold" style={{ background: C.gold, color: C.white }}>継承する</button>
                  <button onClick={() => decideInheritance(false)} className="flex-1 py-1.5 rounded text-xs font-bold" style={{ background: C.white, color: C.textMuted, border: `1px solid ${C.borderStrong}` }}>継承しない</button>
                </div>
              </div>
            )}

            {user?.role === "ジョーカー" && pendingImmediateSeerChoice && (
              <div className="rounded-lg p-3 space-y-2 border" style={{ background: "#EDE0D8", borderColor: C.gold }}>
                <div className="text-xs font-bold" style={{ color: C.gold }}>占う相手を選んでください</div>
                <div className="flex flex-wrap gap-1.5">
                  {players.filter((p) => p.alive && !p.isUser).map((p) => (
                    <button
                      key={p.name}
                      onClick={() => chooseImmediateSeerTarget(p.name)}
                      className="px-2.5 py-1 rounded-full border text-xs font-bold"
                      style={{ background: C.white, borderColor: C.gold, color: C.gold }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs mb-2" style={{ color: C.textFaint }}>
                クラスメイト <span style={{ color: C.textFaint }}>{user?.alive ? "(名前タップで除外メモ、?タップで役職予想、絵文字はあなたへの心証)" : "(あなたは故人のため、全員の役職が見えています)"}</span>
              </div>
              <ul className="space-y-1 text-sm">
                {players.map((p) => {
                  const isExcluded = excludedSuspects.includes(p.name);
                  const guessIdx = roleGuesses[p.name] ?? 0;
                  const guessLabel = ROLE_GUESS_OPTIONS[guessIdx];
                  return (
                    <li
                      key={p.name}
                      className={`flex justify-between items-center px-2 py-1 rounded ${!p.alive ? "opacity-40" : ""}`}
                      style={{ background: p.isUser ? "#EDE0D8" : "transparent" }}
                    >
                      <span
                        onClick={() => user?.alive && toggleExcludedSuspect(p.name)}
                        className={user?.alive ? "cursor-pointer select-none" : "select-none"}
                        style={isExcluded ? { textDecoration: "line-through", textDecorationColor: "#B23A3A", textDecorationThickness: "2px", color: "#B23A3A" } : { color: p.alive ? C.text : C.text, textDecoration: !p.alive ? "line-through" : "none" }}
                      >
                        {!p.isUser && <span className="mr-1">{affinityEmoji(npcAffinity[p.name] ?? 50)}</span>}
                        {p.name}
                      </span>
                      <span className="flex items-center gap-2">
                        {user?.alive ? (
                          <button
                            onClick={() => cycleRoleGuess(p.name)}
                            className="px-2 py-0.5 rounded-full text-xs border cursor-pointer select-none"
                            style={guessIdx === 0 ? { background: C.white, borderColor: C.borderStrong, color: C.textFaint } : { background: C.bgCardHover, borderColor: C.gold, color: C.gold, fontWeight: "bold" }}
                          >
                            {guessLabel}
                          </button>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-xs border font-bold" style={{ background: C.bgCardHover, borderColor: C.gold, color: C.gold }}>
                            {p.role}
                          </span>
                        )}
                        <span style={{ color: C.textFaint }}>{p.alive ? "生存" : "死亡"}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {privateInfo.length > 0 && (
              <div>
                <div className="text-xs mb-2" style={{ color: C.textFaint }}>あなただけの情報</div>
                <ul className="space-y-1 text-xs" style={{ color: C.gold }}>
                  {privateInfo.map((info, i) => (
                    <li key={i} className="rounded px-2 py-1" style={{ background: C.bgCard }}>{info}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setShowHowTo(true)}
              className="w-full py-2 rounded-lg text-sm font-bold border"
              style={{ background: C.bgCard, borderColor: C.borderStrong, color: C.userLabel }}
            >
              📖 遊び方
            </button>

            {!giveUp && user.alive && (
              confirmingGiveUp ? (
                <div className="rounded-lg p-2 space-y-1.5 border" style={{ borderColor: "#B00020", background: "#FDECEA" }}>
                  <div className="text-xs" style={{ color: "#B00020" }}>本当に諦めますか?以降の発言・投票・行動は全て「何もしない」扱いになり、結末まで自動で進みます(取り消せません)。</div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => { setGiveUp(true); setConfirmingGiveUp(false); setShowDrawer(false); }}
                      className="flex-1 py-1.5 rounded text-xs font-bold"
                      style={{ background: "#B00020", color: "#FFFFFF" }}
                    >
                      諦める
                    </button>
                    <button
                      onClick={() => setConfirmingGiveUp(false)}
                      className="flex-1 py-1.5 rounded text-xs font-bold border"
                      style={{ color: "#6B6355", borderColor: C.borderStrong }}
                    >
                      やめておく
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmingGiveUp(true)}
                  className="w-full py-2 rounded-lg text-sm font-bold border"
                  style={{ background: C.bgCard, borderColor: "#B00020", color: "#B00020" }}
                >
                  🏳️ 全て諦める
                </button>
              )
            )}

            <div className="pt-2 border-t text-xs" style={{ borderColor: C.borderStrong, color: C.textFaint }}>
              <div className="mb-1">API使用量(概算・このゲーム)</div>
              <div>呼び出し回数: {tokenDisplay.calls}回</div>
              <div>入力トークン: 約{tokenDisplay.input.toLocaleString()}</div>
              <div>出力トークン: 約{tokenDisplay.output.toLocaleString()}</div>
              {(tokenDisplay.cacheRead > 0 || tokenDisplay.cacheWrite > 0) && (
                <div>キャッシュ節約: 約{(tokenDisplay.cacheRead || 0).toLocaleString()}トークン分(約1/10料金)</div>
              )}
            </div>

            <button
              onClick={copyDebugLog}
              className="w-full py-2 rounded-lg text-xs border"
              style={{ background: C.white, borderColor: C.borderStrong, color: C.textMuted }}
            >
              📄 デバッグ用ログをファイルでダウンロード
            </button>
          </div>
        </div>
      )}

      {showHowTo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowHowTo(false)} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-5 space-y-4 shadow-2xl" style={{ background: C.bgDrawer }}>
            <div className="flex justify-between items-center sticky top-0 pb-2 border-b" style={{ background: C.bgDrawer, borderColor: C.border }}>
              <div className="text-lg font-bold" style={{ color: C.userLabel }}>📖 {howToTab === "roles" ? "役職一覧" : "遊び方"}</div>
              <button onClick={() => setShowHowTo(false)} className="text-2xl leading-none" style={{ color: C.textMuted }}>✕</button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setHowToTab("play")}
                className="flex-1 py-2 rounded-lg text-sm font-bold border"
                style={howToTab === "play" ? { background: C.accent, color: C.white, borderColor: C.accent } : { background: C.white, color: C.textMuted, borderColor: C.borderStrong }}
              >
                遊び方
              </button>
              <button
                onClick={() => setHowToTab("roles")}
                className="flex-1 py-2 rounded-lg text-sm font-bold border"
                style={howToTab === "roles" ? { background: C.accent, color: C.white, borderColor: C.accent } : { background: C.white, color: C.textMuted, borderColor: C.borderStrong }}
              >
                役職一覧
              </button>
            </div>

            {howToTab === "play" && (
              <div className="space-y-3 text-sm" style={{ color: C.text }}>
                <div>
                  <div className="font-bold mb-1" style={{ color: C.gold }}>ゲームの目的</div>
                  <p>11人のクラスメイトの中に、正体を隠した人狼が紛れています。昼の議論と投票で人狼をあぶり出せば村人陣営の勝ち、人狼の数が村人陣営と同数以上になれば人狼陣営の勝ちです。</p>
                </div>

                <div>
                  <div className="font-bold mb-1" style={{ color: C.gold }}>ゲームの流れ</div>
                  <ol className="space-y-1 list-decimal list-inside">
                    <li>役職が配られる(自分の役職以外は分からない)</li>
                    <li>昼の議論:発言・行動でクラスメイトと情報交換や推理をする</li>
                    <li>1回目投票:全員で怪しいと思う人に投票、上位2名が決選投票へ</li>
                    <li>弁明タイム:決選投票の候補が弁明。あなたも一度だけリアクションできる</li>
                    <li>決選投票:2名のうち1人が処刑される</li>
                    <li>夜:役職を持つ人がそれぞれの能力を使う(人狼の襲撃・占い・護衛など)。役職者同士は夜のみ密談できる</li>
                    <li>朝になり、また昼の議論へ。これを繰り返し、どちらかの陣営が勝利するまで続く</li>
                  </ol>
                </div>

                <div>
                  <div className="font-bold mb-1" style={{ color: C.gold }}>操作のヒント</div>
                  <ul className="space-y-1">
                    <li>💬発言する:セリフとして教室に伝わる</li>
                    <li>🚶行動する:セリフではなく仕草や観察などの行動。GMが結果を描写してくれる</li>
                    <li>サイドメニューのクラスメイト名タップで容疑除外メモ、?ボタンで役職予想メモが付けられる(自分用のメモで、ゲームには影響しません)</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold mb-1" style={{ color: C.gold }}>遊び方のコツ</div>
                  <ul className="space-y-1.5">
                    <li><b>単独COは信頼度が高いが「確定」ではない</b>:対抗が出なければかなり信じてよいが、絶対ではない。占い・霊媒の結果が一致すればさらに信頼度が上がる</li>
                    <li><b>タイミングを疑う</b>:単独CO直後の急な対抗COや、処刑候補になってからの弁明での急なCOは、後出しとして怪しまれやすい。ただし霊媒師は処刑が起きるまで報告できることがないため、2日目の朝が最速CO(不当に疑わない)</li>
                    <li><b>確定シロは大事に</b>:占い・霊媒で人狼でないと分かった人には、根拠なく投票しない方が村の効率が良い</li>
                    <li><b>沈黙にも意味がある</b>:黙っている人が必ず怪しいわけではないが、役職を持っていそうなのに何も言わない人には理由を聞いてみる価値がある</li>
                    <li><b>密談を活用する</b>:自分がペア役職(人狼・狂人・共有者)なら、夜の密談で仲間と情報をすり合わせられる</li>
                    <li><b>ジョーカーの存在を忘れない</b>:占い師・霊媒師・狩人の誰かが死ぬと、ジョーカーが覚醒して名乗り出てくることがある。逆に人狼側へ寝返っている可能性もあるので、鵜呑みにしすぎない</li>
                    <li><b>サイドメニューの好感度絵文字も参考に</b>:各NPCがあなたにどう思っているかの目安になる(😠は懐疑的、💕は好意的)</li>
                  </ul>
                </div>
              </div>
            )}

            {howToTab === "roles" && (
              <div className="space-y-1.5 text-sm" style={{ color: C.text }}>
                <ul className="space-y-1.5">
                  <li><b>村人</b>:特殊能力なし。議論と観察だけが武器。</li>
                  <li><b>人狼</b>(2人):正体を隠し、夜ごとに1人を襲撃する。仲間の人狼が誰かを知っている。人狼が全滅すると即座に村人陣営の勝利になる。</li>
                  <li><b>狂人</b>(2人):村人陣営のふりをした人狼側。人狼が誰かは知らないが、仲間の狂人は知っている。人狼陣営に洗脳されており、序盤は自分を村人・占い師・霊媒師・狩人・共有者のいずれかだと本気で信じ込んでいる(演技ではない)。生存者が少なくなる、または本物の人狼と決選投票で対決すると、自分を人狼だと思い込むように切り替わる。</li>
                  <li><b>占い師</b>:夜ごとに1人を占い、「人狼/人狼ではない/ジョーカーである」の結果を知る。</li>
                  <li><b>霊媒師</b>:処刑された人が人狼だったかどうかを知る(処刑が1回も起きていない1日目には報告できることがない)。</li>
                  <li><b>狩人</b>:夜ごとに1人を選んで人狼の襲撃から守る。</li>
                  <li><b>共有者</b>(2人):お互いの正体を最初から知っている2人組。安心して情報交換できる相手がいる。</li>
                  <li><b>ジョーカー</b>:ゲーム開始時は自分も「村人」だと思っている。占い師・霊媒師・狩人の誰かが死んだ瞬間に覚醒し、その能力を継承するか選べる(継承した力はその夜から使える)。日を追うごとに人狼側へ寝返る誘惑が強まる。</li>
                </ul>
              </div>
            )}

            <button onClick={() => setShowHowTo(false)} className="w-full py-2 rounded-lg font-bold" style={{ background: C.accent, color: C.white }}>
              閉じる
            </button>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-0">
        <div ref={scrollBoxRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif", fontSize: "16px", lineHeight: "1.85" }}>
          {log.map((e, i) => {
            const shown = typedChars[i] ?? 0;
            const displayText = (e.text || "").slice(0, shown);
            if (shown === 0) return null; // まだ表示順が来ていない
            if (e.type === "system") {
              return (
                <p key={i} className="text-center text-sm my-3" style={{ color: C.textFaint }}>
                  <span className="font-bold mr-1" style={{ color: C.gold }}>GM:</span>
                  {displayText}
                </p>
              );
            }
            if (e.type === "ally") {
              return (
                <p key={i} className="max-w-2xl mx-auto text-sm" style={{ background: C.bgCard, borderRadius: 8, padding: "6px 10px" }}>
                  <span className="mr-1">🌙</span>
                  <span className="font-bold mr-2" style={{ color: C.gold }}>{e.speaker}:</span>
                  <span>{displayText}</span>
                </p>
              );
            }
            if (e.type === "action") {
              return (
                <p key={i} className="max-w-2xl mx-auto text-sm italic text-center" style={{ color: C.textMuted }}>
                  ({e.speaker}は{displayText})
                </p>
              );
            }
            const speakerP = e.type === "npc" ? players.find((pp) => pp.name === e.speaker) : null;
            const showRole = !user.alive && speakerP && !speakerP.isUser;
            return (
              <p key={i} className="max-w-2xl mx-auto">
                <span className="font-bold mr-2" style={{ color: e.type === "user" ? C.userLabel : C.npcLabel }}>
                  {e.speaker}
                  {showRole && <span className="font-normal" style={{ color: C.textFaint }}> ({speakerP.role})</span>}:
                </span>
                <span>{displayText}</span>
              </p>
            );
          })}
          {busy && phase === "discussion" && (
            <p className="max-w-2xl mx-auto text-sm" style={{ color: C.textFaint }}>……教室がざわめいています……</p>
          )}

          {phase === "day1_paywall" && (
            <div className="max-w-2xl mx-auto text-center space-y-3 pb-6">
              <div className="text-lg font-bold" style={{ color: C.userLabel }}>1日目、終了</div>
              {purchaseNotice === "success" && (
                <p className="text-sm" style={{ color: "#2E7D32" }}>購入が完了しました。下のボタンで2日目に進めます。</p>
              )}
              {!(!creditsLoading && credits > 0) && (
                <div className="rounded-lg p-3 text-sm max-w-xs mx-auto" style={{ background: "#FDECEA", color: "#B00020", border: "1px solid #F5C6CB" }}>
                  2日目に進むには、クレジットが必要です。
                </div>
              )}
              <button
                onClick={async () => {
                  if (!creditsLoading && credits > 0) { await continueAfterDay1Purchase(); return; }
                  startPurchase();
                }}
                className="px-10 py-3 rounded-lg font-bold text-lg"
                style={{ background: "#8B3A3A", color: "#FFFFFF" }}
              >
                {!creditsLoading && credits > 0 ? "2日目に進む" : "クレジットを購入して続ける"}
              </button>
            </div>
          )}

          {phase === "gameover" && (
            <div className="max-w-2xl mx-auto text-center space-y-4 pb-6">
              <div className="text-2xl font-bold" style={{ color: C.userLabel }}>{winner}の勝利!</div>

              {endingLoading && (
                <div className="text-sm" style={{ color: C.textFaint }}>物語を振り返っています...</div>
              )}

              {ending?.monologue && (
                <p className="text-sm italic px-4" style={{ color: C.textMuted }}>「{ending.monologue}」</p>
              )}

              {ending && (
                <div className="text-left space-y-3 rounded-lg p-4 border" style={{ background: C.bgCard, borderColor: C.borderStrong }}>
                  <div>
                    <div className="text-xs mb-1" style={{ color: C.textFaint }}>この一夜の振り返り</div>
                    <div className="text-sm leading-relaxed" style={{ color: C.text }}>{ending.review}</div>
                  </div>
                  {ending.tarotName && (
                    <div className="pt-2 border-t text-center" style={{ borderColor: C.borderStrong }}>
                      <div className="text-xs mb-1" style={{ color: C.textFaint }}>あなたを表すタロットカード</div>
                      <div className="text-2xl font-bold" style={{ color: C.gold }}>
                        🔮 {ending.tarotName}
                        {tarotJustAdded && <span className="ml-2 text-xs px-2 py-0.5 rounded-full align-middle" style={{ background: C.accent, color: C.white }}>NEW!</span>}
                      </div>
                      <div className="text-sm mt-2 text-left" style={{ color: C.text }}>{ending.diagnosis}</div>
                      <div className="text-xs mt-2" style={{ color: C.textFaint }}>コレクション: {Object.keys(tarotCollection).length}/{TAROT_CARDS.length}枚</div>
                    </div>
                  )}
                  {ending.fortunes && (
                    <div className="pt-2 border-t" style={{ borderColor: C.borderStrong }}>
                      <div className="text-xs mb-2 text-center" style={{ color: C.textFaint }}>今週の運勢</div>
                      <div className="space-y-1.5">
                        {[
                          { key: "money", label: "💰 金運" },
                          { key: "work", label: "💼 仕事運" },
                          { key: "love", label: "💕 恋愛運" },
                          { key: "health", label: "🌿 健康運" },
                          { key: "overall", label: "✨ 総合運" },
                        ].map(({ key, label }) => {
                          const f = ending.fortunes[key];
                          if (!f) return null;
                          const stars = Math.max(0, Math.min(5, Number(f.stars) || 0));
                          return (
                            <div key={key} className="flex items-start gap-2 text-sm">
                              <div className="w-20 shrink-0 font-bold" style={{ color: C.text }}>{label}</div>
                              <div className="w-16 shrink-0" style={{ color: C.gold }}>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
                              <div className="flex-1 text-left" style={{ color: C.textMuted }}>{f.text}</div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={shareEndingToX}
                        className="mt-3 w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                        style={{ background: "#000000", color: "#FFFFFF" }}
                      >
                        𝕏で結果をシェアする
                      </button>
                    </div>
                  )}
                </div>
              )}

              {ending?.comments && ending.comments.length > 0 && (
                <div className="text-left space-y-2 rounded-lg p-4 border" style={{ background: C.bgCard, borderColor: C.borderStrong }}>
                  <div className="text-xs mb-1" style={{ color: C.textFaint }}>みんなの感想</div>
                  {ending.comments.map((c, i) => {
                    const p = players.find((pp) => pp.name === c.speaker);
                    return (
                      <p key={i} className="text-sm">
                        <span className="font-bold mr-2" style={{ color: C.npcLabel }}>{c.speaker}{p ? `(${p.role})` : ""}:</span>
                        <span style={{ color: C.text }}>{c.text}</span>
                      </p>
                    );
                  })}
                </div>
              )}

              {ending && !endingAnswer && (
                <div className="text-left space-y-2 rounded-lg p-4 border" style={{ background: C.bgCard, borderColor: C.gold }}>
                  <div className="text-xs mb-1" style={{ color: C.textFaint }}>最後に、1人だけに質問できます</div>
                  <div className="flex flex-wrap gap-1.5">
                    {players.filter((p) => !p.isUser).map((p) => (
                      <button
                        key={p.name}
                        onClick={() => setEndingQuestionTarget(p.name)}
                        className="px-2.5 py-1 rounded-full text-xs border"
                        style={endingQuestionTarget === p.name ? { background: C.gold, color: C.white, borderColor: C.gold } : { background: C.white, color: C.text, borderColor: C.borderStrong }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 items-end">
                    <input
                      className="flex-1 rounded-lg px-3 py-2 outline-none border text-sm"
                      style={{ background: C.white, borderColor: C.borderStrong, color: C.text, fontSize: "16px" }}
                      placeholder={endingQuestionTarget ? `${endingQuestionTarget}へ質問する...` : "まず質問する相手を選んでください"}
                      value={endingQuestionInput}
                      onChange={(e) => setEndingQuestionInput(e.target.value)}
                      disabled={!endingQuestionTarget || endingQuestionLoading}
                    />
                    <button
                      onClick={askFinalQuestion}
                      disabled={!endingQuestionTarget || !endingQuestionInput.trim() || endingQuestionLoading}
                      className="px-4 py-2 rounded-lg font-bold text-sm disabled:opacity-50"
                      style={{ background: C.gold, color: C.white }}
                    >
                      {endingQuestionLoading ? "…" : "質問する"}
                    </button>
                  </div>
                </div>
              )}

              {endingAnswer && (
                <div className="text-left space-y-2 rounded-lg p-4 border" style={{ background: C.bgCard, borderColor: C.gold }}>
                  <div className="text-xs mb-1" style={{ color: C.textFaint }}>最後の質問</div>
                  {endingAnswer.question && (
                    <p className="text-sm">
                      <span className="font-bold mr-2" style={{ color: C.userLabel }}>{userName}:</span>
                      <span style={{ color: C.text }}>{endingAnswer.question}</span>
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-bold mr-2" style={{ color: C.gold }}>{endingAnswer.speaker}:</span>
                    <span style={{ color: C.text }}>{endingAnswer.text}</span>
                  </p>
                </div>
              )}

              {HAS_BACKEND && !endingLoading && (
                <div className="rounded-lg p-4 border text-left space-y-2" style={{ background: C.bgCard, borderColor: C.gold }}>
                  <div className="text-xs font-bold" style={{ color: C.gold }}>🎭 分身NPCについて</div>
                  {npcSubmitted ? (
                    <div className="space-y-2">
                      {npcFarewellLine && (
                        <div className="rounded-lg p-3 text-sm italic border-l-4" style={{ background: "#F0EAD9", borderColor: C.gold, color: C.text }}>
                          「{npcFarewellLine}」
                        </div>
                      )}
                      <div className="text-sm" style={{ color: C.text }}>
                        ✅ ありがとうございます!審査の上、承認されたら他の誰かのゲームに「{npcNicknameInput.trim()}」として登場するかもしれません。
                      </div>
                    </div>
                  ) : npcConsentChoice === null ? (
                    <>
                      <div className="text-sm font-bold" style={{ color: C.text }}>今回のゲーム内容を元に、あなたの分身(NPC)を作って良いですか?</div>
                      <div className="text-xs" style={{ color: C.textFaint }}>
                        生成された分身は他のプレイヤーのゲームに参加します。1つの端末につき分身は1体までです(新しく作ると、前のものは上書きされます)。今回の会話のやり取りから、AIが性格の傾向と印象的な発言を1つだけ抽出します。開発者が内容を確認して承認したものだけが、低い確率で他のプレイヤーのゲームにNPCとして登場します。
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setNpcConsentChoice(true)} className="px-4 py-1.5 rounded-lg text-sm font-bold" style={{ background: C.accent, color: C.white }}>作ってもいい</button>
                        <button onClick={() => setNpcConsentChoice(false)} className="px-4 py-1.5 rounded-lg text-sm border" style={{ color: C.textMuted, borderColor: C.borderStrong }}>やめておく</button>
                      </div>
                    </>
                  ) : npcConsentChoice === false ? (
                    <div className="text-sm" style={{ color: C.textFaint }}>承知しました。今回のプレイ内容が分身に使われることはありません。</div>
                  ) : (
                    <>
                      <div className="text-sm font-bold" style={{ color: C.text }}>分身として登場する時のニックネームを決めてください</div>
                      <div className="text-xs" style={{ color: C.textFaint }}>今回のプレイ中に使った名前と、同じでも違う名前でも構いません。</div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={npcNicknameInput}
                          onChange={(e) => setNpcNicknameInput(e.target.value)}
                          placeholder="ニックネーム"
                          maxLength={20}
                          className="flex-1 rounded-lg px-3 py-2 border outline-none"
                          style={{ borderColor: C.borderStrong, color: C.text, background: C.white }}
                        />
                        <button
                          onClick={submitNpcCandidate}
                          disabled={!npcNicknameInput.trim() || npcSubmitting}
                          className="px-4 py-2 rounded-lg font-bold disabled:opacity-40"
                          style={{ background: C.accent, color: C.white }}
                        >
                          {npcSubmitting ? "送信中…" : "この名前で登録"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {!endingLoading && (
                <>
                  <div className="text-sm space-y-1" style={{ color: C.textMuted }}>
                    {players.map((p) => (
                      <div key={p.name}>
                        {p.name}:{p.role}{!p.alive && "(死亡)"}
                        {p.role === "ジョーカー" && ((p.isUser && jokerState.defected) || (!p.isUser && npcJokerState.defected)) && "(人狼側へ寝返っていた)"}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={saveFavorite}
                      disabled={favoriteSaved}
                      className="px-4 py-2 rounded-lg font-bold border disabled:opacity-50"
                      style={{ background: C.white, color: C.gold, borderColor: C.gold }}
                    >
                      {favoriteSaved ? "⭐ 登録済み" : "☆ お気に入りに登録"}
                    </button>
                    <button onClick={startGame} className="px-6 py-2 rounded-lg font-bold" style={{ background: C.accent, color: C.white }}>もう一度遊ぶ</button>
                  </div>
                </>
              )}
            </div>
          )}

          <div ref={logEndRef} />
        </div>

        <div className="border-t p-3 space-y-2" style={{ borderColor: C.border, background: C.bg }}>
          {phase === "discussion" && (!user.alive || giveUp) && (
            <div className="max-w-2xl mx-auto text-center space-y-2 py-2">
              <div className="text-sm" style={{ color: C.textFaint }}>
                {user.alive
                  ? "🏳️ あなたはこのゲームを諦め、以降の発言・投票・行動を全て見送ることにしました。物語は自動的に進んでいきます……"
                  : "💀 あなたは既に処刑され、この世を去りました。以降は結末を見届けるだけです(発言はできません)。物語は自動的に進んでいきます……"}
              </div>
            </div>
          )}
          {phase === "discussion" && user.alive && !giveUp && (
            <div className="max-w-2xl mx-auto w-full space-y-1.5">
              {showNameChips && (
                <div className="flex flex-wrap gap-1.5">
                  {otherAliveNPCs().map((p) => (
                    <button
                      key={p.name}
                      onClick={() => insertNameIntoInput(p.name)}
                      className="px-2.5 py-1 rounded-full text-xs border whitespace-nowrap"
                      style={{ background: C.white, color: C.textMuted, borderColor: C.border }}
                      title="タップで名前を入力欄に挿入(打ち間違い防止)"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowNameChips((v) => !v)}
                className="text-xs px-2 py-1 rounded-lg border"
                style={{ background: C.white, color: C.textMuted, borderColor: C.border }}
              >
                👥 参加者名簿 {showNameChips ? "▲閉じる" : "▼開く(タップで名前入力)"}
              </button>
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  className="flex-1 rounded-lg px-3 py-2 outline-none border resize-none overflow-y-auto"
                  style={{ background: C.white, borderColor: C.borderStrong, color: C.text, minHeight: 40, maxHeight: 160 }}
                  placeholder="発言・行動を入力...(Enterで改行)"
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    autoResizeInput();
                  }}
                  disabled={busy}
                />
              </div>
              <div className="flex gap-1.5">
                <button onClick={sendMessage} disabled={busy || !input.trim()} className="flex-1 py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>
                  💬 発言する
                </button>
                <button onClick={sendAction} disabled={busy || !input.trim()} className="flex-1 py-2 rounded-lg font-bold disabled:opacity-50 border" style={{ background: C.white, color: C.userLabel, borderColor: C.borderStrong }}>
                  🚶 行動する
                </button>
                <button onClick={skipTurn} disabled={busy} className="py-2 px-3 rounded-lg font-bold disabled:opacity-50 border" style={{ background: C.white, color: C.textFaint, borderColor: C.borderStrong }} title="何も発言・行動せず、このターンを見送る">
                  🙅 何もしない
                </button>
              </div>
            </div>
          )}

          {phase === "vote_round1" && (
            <div className="max-w-2xl mx-auto space-y-2">
              {user.alive && !giveUp ? (
                <>
                  <div className="text-sm" style={{ color: C.textMuted }}>1回目投票:誰に投票しますか?</div>
                  <div className="flex flex-wrap gap-2">
                    {alivePlayers().filter((p) => !p.isUser).map((p) => (
                      <PickButton key={p.name} name={p.name} selected={voteTarget === p.name} onClick={() => setVoteTarget(p.name)} />
                    ))}
                  </div>
                  <button onClick={submitVoteRound1} disabled={!voteTarget || busy} className="w-full py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>
                    {busy ? "集計中..." : "投票を確定する"}
                  </button>
                </>
              ) : (
                <div className="text-sm text-center py-2" style={{ color: C.textFaint }}>{giveUp ? "🏳️ 諦めたため、ランダムな相手に自動で投票されます……" : "投票権はありません。結果が自動的に集計されます……"}</div>
              )}
            </div>
          )}

          {phase === "defense" && (
            <div className="max-w-2xl mx-auto space-y-2">
              {defenseLoading && (
                <div className="text-sm text-center" style={{ color: C.textFaint }}>候補者たちの弁明を準備しています...</div>
              )}
              {defenseCandidates.includes(userName) ? (
                <>
                  <div className="text-sm font-bold" style={{ color: C.accent }}>あなたも決選投票の対象です。反論・弁明を書いてください。</div>
                  <div className="flex gap-2 items-end">
                    <textarea
                      ref={inputRef}
                      className="flex-1 rounded-lg px-3 py-2 outline-none border resize-none overflow-y-auto"
                      style={{ background: C.white, borderColor: C.borderStrong, color: C.text, minHeight: 40, maxHeight: 160 }}
                      placeholder="ここで巻き返してください...(Enterで改行、送信はボタン)"
                      rows={1}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        autoResizeInput();
                      }}
                      disabled={busy}
                    />
                    <button onClick={sendDefenseStatement} disabled={busy || !input.trim()} className="px-4 py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>発言</button>
                  </div>
                </>
              ) : user.alive && !giveUp && !defenseReacted ? (
                <>
                  <div className="text-sm font-bold" style={{ color: C.userLabel }}>弁明を聞いて、一度だけ発言・行動でリアクションできます。</div>
                  <div className="flex gap-2 items-end">
                    <textarea
                      ref={inputRef}
                      className="flex-1 rounded-lg px-3 py-2 outline-none border resize-none overflow-y-auto"
                      style={{ background: C.white, borderColor: C.borderStrong, color: C.text, minHeight: 40, maxHeight: 160 }}
                      placeholder="弁明を受けて発言・行動する...(Enterで改行)"
                      rows={1}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        autoResizeInput();
                      }}
                      disabled={busy}
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => sendDefenseReaction(false)} disabled={busy || defenseLoading || !input.trim()} className="flex-1 py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>
                      💬 発言する
                    </button>
                    <button onClick={() => sendDefenseReaction(true)} disabled={busy || defenseLoading || !input.trim()} className="flex-1 py-2 rounded-lg font-bold disabled:opacity-50 border" style={{ background: C.white, color: C.userLabel, borderColor: C.borderStrong }}>
                      🚶 行動する
                    </button>
                  </div>
                </>
              ) : user.alive && !giveUp ? (
                <div className="text-sm" style={{ color: C.textMuted }}>リアクションが済みました。決選投票へ進んでください。</div>
              ) : (
                <div className="text-sm" style={{ color: C.textFaint }}>
                  {giveUp ? "🏳️ 諦めたため、この場面には関われません。" : "💀 あなたは既に処刑されており、この場面には関われません。"}
                </div>
              )}
              <button onClick={() => setPhase("vote_final")} disabled={busy} className="w-full py-2 rounded-lg text-sm" style={{ background: "#EDE0D8", color: C.userLabel }}>決選投票へ進む</button>
            </div>
          )}

          {phase === "vote_final" && (
            <div className="max-w-2xl mx-auto space-y-2">
              {user.alive && !giveUp ? (
                <>
                  <div className="text-sm" style={{ color: C.textMuted }}>決選投票:{defenseCandidates.join(" vs ")}</div>
                  <div className="flex flex-wrap gap-2">
                    {defenseCandidates.map((name) => (
                      <PickButton key={name} name={name} selected={voteTarget === name} onClick={() => setVoteTarget(name)} />
                    ))}
                  </div>
                  <button onClick={submitVoteFinal} disabled={!voteTarget || busy} className="w-full py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>
                    {busy ? "集計中..." : "決選投票を確定する"}
                  </button>
                </>
              ) : (
                <div className="text-sm text-center py-2" style={{ color: C.textFaint }}>{giveUp ? "🏳️ 諦めたため、ランダムな相手に自動で投票されます……" : "投票権はありません。結果が自動的に集計されます……"}</div>
              )}
            </div>
          )}

          {phase === "night" && (
            <div className="max-w-2xl mx-auto space-y-2">
              {(() => {
                const isPairRole = user.role === "人狼" || user.role === "狂人" || user.role === "共有者";
                const allyAlive = isPairRole && !!getAllyPartner();
                if (!isPairRole) return null;
                if (!allyAlive) {
                  return (
                    <div className="text-xs pb-2 border-b" style={{ color: C.textFaint, borderColor: C.borderStrong }}>
                      🌙 相方は既にいないため、密談はできません。
                    </div>
                  );
                }
                return (
                  <div className="space-y-1.5 pb-2 border-b" style={{ borderColor: C.borderStrong }}>
                    <div className="text-xs font-bold" style={{ color: C.gold }}>🌙 仲間との密談(夜のみ)</div>
                    <div className="flex gap-2 items-end">
                      <textarea
                        className="flex-1 rounded-lg px-3 py-2 outline-none border resize-none overflow-y-auto text-sm"
                        style={{ background: C.white, borderColor: C.borderStrong, color: C.text, minHeight: 36, maxHeight: 120, fontSize: "16px" }}
                        placeholder="仲間だけに話しかける...(Enterで改行、送信はボタン)"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={busy}
                      />
                      <button onClick={sendAllyMessage} disabled={busy || !input.trim()} className="px-3 py-2 rounded-lg text-sm font-bold disabled:opacity-50" style={{ background: C.gold, color: C.white }}>送信</button>
                    </div>
                  </div>
                );
              })()}
              {(() => {
                const jokerInherited = user.role === "ジョーカー" && jokerState.abilityBank && !jokerState.abilityUsed ? jokerState.abilityBank : null;
                const effectiveRole = jokerInherited || user.role;
                if (effectiveRole === "人狼" || effectiveRole === "占い師" || effectiveRole === "狩人") {
                  return (
                    <>
                      <div className="text-sm" style={{ color: C.textMuted }}>
                        {jokerInherited && <span className="font-bold" style={{ color: C.gold }}>🃏 継承した{jokerInherited}の力を使います。</span>}
                        {effectiveRole === "人狼" && " 今夜、誰を襲撃しますか?"}
                        {effectiveRole === "占い師" && " 今夜、誰を占いますか?"}
                        {effectiveRole === "狩人" && " 今夜、誰を守りますか?"}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {alivePlayers().filter((p) => {
                          if (p.isUser) return false;
                          // 人狼として襲撃する場合、相方の人狼は対象から外す(寝返ったジョーカーは人狼が知らないため除外しない)
                          if (effectiveRole === "人狼" && p.role === "人狼") return false;
                          return true;
                        }).map((p) => (
                          <PickButton key={p.name} name={p.name} selected={nightTarget === p.name} onClick={() => setNightTarget(p.name)} />
                        ))}
                      </div>
                      <button onClick={resolveNight} disabled={!nightTarget || busy} className="w-full py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>
                        {busy ? "処理中..." : "夜を進める"}
                      </button>
                    </>
                  );
                }
                return (
                  <button onClick={resolveNight} disabled={busy} className="w-full py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>
                    {busy ? "処理中..." : "夜を進める(あなたに夜の行動はありません)"}
                  </button>
                );
              })()}
              {user.role === "ジョーカー" && jokerState.selfAware && !jokerState.abilityUsed && (
                <div className="text-xs text-center" style={{ color: C.gold }}>保持中の能力:{jokerState.abilityBank}(未使用・温存中)</div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
