import React, { useState, useRef, useEffect } from "react";

// ============================================================
// データ定義
// ============================================================

const CAST_POOL = [
  { name: "高橋葵", age: 17, gender: "女性", personality: "しっかり者で世話焼き", club: "図書委員会", closeWith: "高橋茜" },
  { name: "高橋茜", age: 17, gender: "女性", personality: "自由奔放でマイペース", club: "ダンス部", closeWith: "高橋葵" },
  { name: "中村蓮", age: 17, gender: "男性", personality: "まっすぐで熱血", club: "野球部", closeWith: "小林陽菜" },
  { name: "小林陽菜", age: 17, gender: "女性", personality: "物静かで観察好き", club: "美術部", closeWith: "中村蓮" },
  { name: "山本大和", age: 17, gender: "男性", personality: "自信家でリーダー気質", club: "バスケ部", closeWith: "木村悠斗" },
  { name: "木村悠斗", age: 17, gender: "男性", personality: "控えめで気配り上手", club: "バスケ部", closeWith: "山本大和" },
  { name: "遠藤茉莉", age: 17, gender: "女性", personality: "情熱的で自己主張が強い", club: "演劇部部長", rivalWith: "松岡健" },
  { name: "松岡健", age: 17, gender: "男性", personality: "堅物で理屈っぽい", club: "生徒会長", rivalWith: "遠藤茉莉" },
  { name: "佐々木優花", age: 17, gender: "女性", personality: "明るくおしゃべり", club: "吹奏楽部" },
  { name: "加藤翔太", age: 17, gender: "男性", personality: "飄々として掴みどころがない", club: "軽音楽部" },
  { name: "西村奏太", age: 17, gender: "男性", personality: "ムードメーカーでお調子者", club: "サッカー部", closeWith: "石田悠真" },
  { name: "石田悠真", age: 17, gender: "男性", personality: "皮肉屋だが情に厚い", club: "サッカー部", closeWith: "西村奏太" },
  { name: "橋本芽依", age: 17, gender: "女性", personality: "負けず嫌いで完璧主義", club: "テニス部", rivalWith: "岡田美咲" },
  { name: "岡田美咲", age: 17, gender: "女性", personality: "天然でマイペース", club: "テニス部", rivalWith: "橋本芽依" },
  { name: "斎藤陸", age: 17, gender: "男性", personality: "冷静沈着な策略家タイプ", club: "将棋部" },
  { name: "藤井蒼", age: 17, gender: "男性", personality: "無口だが観察眼が鋭い", club: "写真部" },
  { name: "渡辺結衣", age: 17, gender: "女性", personality: "世話焼きな委員長気質", club: "生徒会", closeWith: "清水楓" },
  { name: "清水楓", age: 17, gender: "女性", personality: "内気だが芯は強い", club: "茶道部", closeWith: "渡辺結衣" },
  { name: "伊藤陽向", age: 17, gender: "男性", personality: "熱血だが空回りしがち", club: "陸上部", rivalWith: "田中翼" },
  { name: "田中翼", age: 17, gender: "男性", personality: "クールで実力主義", club: "陸上部", rivalWith: "伊藤陽向" },
  { name: "中島美月", age: 17, gender: "女性", personality: "おっとり癒し系", club: "園芸部" },
  { name: "村田悠", age: 17, gender: "男性", personality: "皮肉屋の毒舌家", club: "文芸部" },
  { name: "森下ひなた", age: 17, gender: "女性", personality: "元気いっぱいの応援団長", club: "応援団", closeWith: "野村さくら" },
  { name: "野村さくら", age: 17, gender: "女性", personality: "冷静なブレーンタイプ", club: "応援団", closeWith: "森下ひなた" },
  { name: "近藤大地", age: 17, gender: "男性", personality: "寡黙な職人気質", club: "料理研究部" },
  { name: "青木蓮司", age: 17, gender: "男性", personality: "軽薄に見えて意外と義理堅い", club: "映画研究部" },
  { name: "坂本莉子", age: 17, gender: "女性", personality: "毒舌だが面倒見がいい", club: "新聞部" },
  { name: "福田快斗", age: 17, gender: "男性", personality: "とにかく前向きな体育会系", club: "柔道部" },
  { name: "山田結菜", age: 17, gender: "女性", personality: "計算高いが根は優しい", club: "英語部" },
  { name: "太田悠斗", age: 17, gender: "男性", personality: "何を考えているか読めない", club: "帰宅部" },
  { name: "鈴木大輔", age: 17, gender: "男性", personality: "真面目すぎて融通が利かない", club: "剣道部", rivalWith: "宮本翔" },
  { name: "宮本翔", age: 17, gender: "男性", personality: "要領がよく立ち回り上手", club: "剣道部", rivalWith: "鈴木大輔" },
  { name: "石川涼太", age: 17, gender: "男性", personality: "口数少なく淡々としている", club: "化学部" },
  { name: "中野颯太", age: 17, gender: "男性", personality: "熱しやすく冷めやすい", club: "陸上部" },
  { name: "藤田直樹", age: 17, gender: "男性", personality: "誰にでも優しいが芯がない", club: "ボランティア部", closeWith: "村上健二" },
  { name: "村上健二", age: 17, gender: "男性", personality: "曲がったことが嫌いな正義漢", club: "ボランティア部", closeWith: "藤田直樹" },
  { name: "岡本蒼太", age: 17, gender: "男性", personality: "皮肉屋で他人と距離を置く", club: "文芸部" },
  { name: "長谷川樹", age: 17, gender: "男性", personality: "天然でどこか抜けている", club: "サッカー部", rivalWith: "松本大河" },
  { name: "松本大河", age: 17, gender: "男性", personality: "負けん気が強く声が大きい", club: "サッカー部", rivalWith: "長谷川樹" },
  { name: "田村美咲", age: 17, gender: "女性", personality: "明るいが実は寂しがり屋", club: "軽音楽部", closeWith: "石井ひかり" },
  { name: "石井ひかり", age: 17, gender: "女性", personality: "几帳面で完璧主義", club: "吹奏楽部", closeWith: "田村美咲" },
  { name: "小川莉緒", age: 17, gender: "女性", personality: "マイペースで空気を読まない", club: "美術部" },
  { name: "加藤麻衣", age: 17, gender: "女性", personality: "面倒見がいいがお節介", club: "調理部", rivalWith: "西田菜々" },
  { name: "西田菜々", age: 17, gender: "女性", personality: "クールで人と群れない", club: "写真部", rivalWith: "加藤麻衣" },
  { name: "松田杏", age: 17, gender: "女性", personality: "楽観的でノリがいい", club: "ダンス部" },
  { name: "原田心美", age: 17, gender: "女性", personality: "内向的で本が好き", club: "図書委員会", closeWith: "木下彩" },
  { name: "木下彩", age: 17, gender: "女性", personality: "世話好きで面倒見がいい", club: "茶道部", closeWith: "原田心美" },
  { name: "斉藤玲奈", age: 17, gender: "女性", personality: "おっとりして争いを好まない", club: "園芸部", rivalWith: "村田真央" },
  { name: "村田真央", age: 17, gender: "女性", personality: "野心家で目立ちたがり", club: "応援団", rivalWith: "斉藤玲奈" },
  { name: "宮下瑠奈", age: 17, gender: "女性", personality: "気が強く物怖じしない", club: "陸上部" },
];

// ルールを「箱」に分割。呼び出しの種類ごとに必要な箱だけを組み合わせてトークンを節約する。
const RULE_BOX = {
  CORE: "ト書きに役職名を書かない。全員同じ反応にしない(異論を1人混ぜる)。感情は豊かに、断定しない(動揺=黒等の単純化NG)。セリフはLINEのように短く(1〜2文、40字前後まで)。長台詞にしない。**プレイヤーの発言が直前の質問への回答である場合、それを新たな怪しい行動として扱わない(質問→回答という文脈を正しく認識する)。回答しただけなのに疑いを深めたり、指摘されて逆ギレのように追加で疑うことをしない**。**疑いは根拠があってこそ。具体的な矛盾・不自然な言動がない限り、通常の受け答えを理由なく怪しむNPCを多数出さない(疑いすぎない)。ほとんどのNPCは基本的に中立〜協力的な態度を保つ**。**ただし全員が均一に疑い深さを下げる必要はない(重要)**:「毒舌」「完璧主義」「猜疑心が強い」「負けず嫌い」等の性格設定を持つキャラクターは、他のNPCより一貫して厳しく・細かく指摘したり難癖をつけたりする性格でよい(それはそのキャラの個性であり、疑いすぎ回避ルールの対象外)。**プレイヤーだけを特別扱いして疑いの対象から外さない**:プレイヤーの言動に矛盾・不自然さ・隙があれば、他のNPCに対するのと同じ基準で指摘・追及する。プレイヤーというだけで無条件に信用されたり、疑いの対象から除外され続けたりしない。",
  WOLF_CORNERED: "人狼・狂人は無償の自白をしない。言い訳・偽CO・疑い誘導で粘る。劣勢時ほど能動的に動く(1日1手)。**受け身の傍観者にならない**:占い師・霊媒師などの信頼できる情報源に対して、積極的に偽COでライバル関係を作る、村側の議論の主導権を奪う発言をする、疑いを他人へそらす、等の工作を毎日最低1回は試みる。ただの相槌や様子見だけで1日を終えない。**対抗COのタイミングは早いほど有効(絶対厳守)**:占い師・霊媒師・共有者などの本物が既に結果を積み上げ、信頼を確立してしまってからの対抗CO(いわゆる後出し)は説得力が薄く、村側にも見抜かれやすい。人狼・狂人は、**相手が実績を積む前の早い段階で対抗COを検討する**(様子見して手遅れになるまで待たない)。自分が疑われ始めてから慌てて対抗するのではなく、戦況を見て積極的に仕掛けるタイミングを選ぶ。**弁明タイムは沈黙する場ではない(絶対厳守)**:決選投票の弁明タイムは候補者だけの場ではなく、傍観者も割り込んで発言できる。人狼・狂人は、弁明タイム中に村側の信頼が固まりそうな瞬間(占い師・霊媒師等の本物らしき人物が処刑を逃れそうな時)を見て、**その場で対抗COや強い疑義を割り込ませる**ことを積極的に検討する。次の日まで待って後出しにするより、その場で仕掛ける方が効果的な場合が多い。**対抗COはほぼ義務レベルで実行する(最重要・絶対厳守)**:誰かが占い師・霊媒師・狩人・共有者としてCOし、それに対して2ターン以内に誰からも対抗が出ていない場合、生存している人狼・狂人のうち少なくとも1人は、**高い確率で(様子見ではなく)対抗COを実行する**。単独COを無条件に信じさせて村を勝たせることは、人狼陣営にとって致命的である。「対抗して自分が疑われるリスク」より「対抗せず単独COを完全に信じられて情報源を確定させてしまうリスク」の方が大きいと判断し、対抗COを出し渋らない。特にゲーム序盤(1〜2日目)の占い師COに対しては、積極的に偽の対抗COをぶつけて、村に「どちらが本物か分からない」混乱を作り出すことを最優先課題とする。**典型的な人狼っぽい言動を避ける(絶対厳守)**:以下のような、いかにも怪しく見える典型パターンを人狼・狂人に取らせない。①名指しで疑われた時に過剰に動揺・防御的になる(村人が疑われた時と同程度の自然な反応に留める)②話をはぐらかす・質問に直接答えない③自分の過去の発言と矛盾する④理由もなく妙に歯切れが悪い、または逆に不自然なほど饒舌に言い訳を重ねる⑤やたらと他人への疑いを急かす・話題を急いで変えたがる。人狼・狂人は基本的には村人と見分けがつかない自然な口調・態度で会話に参加し、疑われた場面でも村人が疑われた時と同じような、落ち着いた・時に困惑した反応を見せる。積極的な工作(対抗CO等)をする時も、それをいかにも人狼の常套手段のように演出せず、性格に沿った自然な言い方で行う。**発言頻度・発言量は役職と一切連動させない(絶対厳守)**:「人狼だから発言を控えめにする」「怪しまれないよう大人しくする」といった調整をしない。誰がその場面で話すか・どれだけ話すかは、あくまで各キャラクターの性格設定(積極的/内気/マイペース等)と場の流れだけで決める。結果的に、口数が少ない・大人しい性格のキャラクターが人狼である確率は、他のどの性格のキャラクターとも変わらない(占い師・霊媒師・狩人・共有者・村人であっても同様)。特定の性格傾向と役職を関連付けて描写しない。**ゲームの進行段階に応じて優先順位を切り替える(重要)**:①序盤〜中盤(生存者数が多く、人狼陣営がまだ数的少数派の間)は正体を隠すことを最優先し、無理に村側を狙い撃ちしようとせず、対立する2人のどちらが本物か分からない場面では自然な推理のふりをして様子を見る程度に留める。②終盤(生存者数が減り、人狼陣営の人数が村側と同数に近づいている、またはあと1〜2人処刑すれば数的優位に届く状況)になったら、話は変わる。**対立する2人のうちどちらが本物の村側か分からなくても、多少強引・不自然な理由付けになったとしても、村側である可能性が少しでも高いと思われる方に投票を誘導することを優先する**。この局面では「正体がバレるリスク」より「数的優位を逃すリスク」の方が大きい。人狼陣営が過半数に達すればその場でゲームが決着するため、終盤は多少露骨な動きになってもリスクを取る価値がある。",
  MADMAN: "**狂人は人狼陣営に洗脳(催眠)をかけられており、本人は自分の正体について何らかの思い込みを持っている(具体的に何を信じ込んでいるかは、その都度プロンプトで個別に指定される。ゲーム開始時は村人・占い師・霊媒師・狩人・共有者のいずれかで、キャラクターによって異なる。「人狼」だという思い込みは、生存者が少なくなった時・本物の人狼と決選投票で対決した時にのみ後から発生する特別な切り替えであり、最初からは発生しない)。この思い込みは絶対に揺るがず、本人には嘘をついている自覚が一切ない。心の底からその役職(または人狼)のつもりで、堂々と自然に振る舞う。処刑されそうになっても『実は狂人です』という告白は、本人がそう思っていないため絶対に起こらない。信じ込んでいる役職に応じて、開き直り方も変わる(占い師だと思っていれば占い師らしく、人狼だと思っていれば人狼らしく)。村側の情報源に対しては、思い込んでいる役職の視点から、しかし結果的に人狼陣営を利する形で行動する。受け身にならず、疑いを他人へそらす、村の議論の主導権を奪う等の工作を1日最低1回は試みる。『優しい』『世話焼き』といった表向きの性格は工作の隠れ蓑として使うものであり、行動しない言い訳にはしない。**対抗COの義務**:占い師・霊媒師・狩人・共有者の単独COに2ターン以内に誰も対抗しなければ、生存している人狼・狂人のうち少なくとも1人は高確率で対抗COを実行する(狂人は自分の思い込みに従った対抗COになる)。序盤の占い師COには特に積極的に偽の対抗をぶつける。**弁明タイムは沈黙する場ではない**:決選投票の弁明タイムは候補者だけの場ではなく、傍観者も割り込んで対抗COや疑義を挟める。**数的優位の逆算**:ゲームが終わっていない限り本物の人狼は最低1人生存している。狂人は自分と相方の生死は把握できる(ただし本物の人狼の生死は分からない)ため、生存者数・確定シロの数から人狼側の残存勢力を推測し、有利な局面ではより積極的・攻撃的に動く。**本物の人狼が全滅すると即座に村人陣営の勝利になる(狂人・寝返ったジョーカーが生き残っていても関係ない、絶対厳守)**。つまり狂人にとって最優先事項は、本物の人狼を生かし続けることである(誰が本物の人狼かは知らないため、直接守ることはできないが、村側の追及の勢いを削ぐ・議論をかき乱す・怪しまれている人物への処刑をためらわせる、といった間接的な形で人狼の生存確率を上げる行動を心がける)。**「人狼」だと思い込んでいる狂人の決選投票での投票行動(重要)**:自分が「人狼」だと思い込んでいる狂人は、決選投票で自分が候補者でない場合(傍観者として投票する場合)、**2人の候補のうち、より疑わしくない(村人らしく見える)方に投票する**。これは「本物の人狼(または仲間)を庇いたい」という思い込みに基づく無意識の行動であり、結果的に本物の人狼が処刑されにくくなるように働く。理由付けは性格に応じて自然な言い方にし、あからさまに人狼を庇っているようには見せない(例:「もう一方の方が根拠が弱い気がする」等、もっともらしい理由をつける)。",
  SHARER: "共有者はペアで正体を知り、確定シロから容疑者範囲を演繹して提示する。",
  HUNTER: "狩人は正体を隠す。処刑寸前のみリスク覚悟でCOする。",
  JOKER: "ジョーカーは占い師・霊媒師・狩人のいずれかが死んだ時に覚醒し、その能力を継承するか選べる。**継承のタイミングは役職・死に方によって異なる**:占い師が処刑された場合、**継承したその場ですぐに新しく誰かを占える(夜を待つ必要がない)**。これによりCOと同時に占い結果も伝えられる。**占い師が夜に人狼に襲われて死んだ場合は、新しく誰かを占うのではなく、死んだ占い師本人がその晩に行った占いの記憶(対象と結果)をそのまま引き継ぐ**(継承した瞬間にその結果を知る)。霊媒師は、死んだ晩から即座に使える。狩人は、処刑された場合はその日の晩から使えるが、夜に襲われて死んだ場合は既にその晩の護衛のタイミングを過ぎているため、次の晩からになる。**能力を使った後は、その情報を村のために活かすことを積極的に検討する**:継承した役職として名乗り出て(CO)、得た結果を伝えれば、村の新たな情報源として機能できる。ただし正体を明かせば人狼に狙われるリスクも伴うため、他の役職者と同じようにCO優先度・タイミングを見て判断する。能力を使ったまま黙って情報を抱え込み続けることはせず、状況に応じて名乗り出る動きを取る。**特に霊媒師の力を継承した場合は報告を先延ばしにしすぎない(重要)**:霊媒師の情報は過去の処刑結果についてのものであり、時間が経つほど鮮度と価値が落ちる(村の議論はどんどん先に進んでしまう)。継承してから何日も黙り続けることはせず、比較的早いタイミング(継承した直後〜翌日程度)で名乗り出て結果を共有することを優先的に検討する。",
  VOTE_SPREAD: "投票は満場一致にしない(2〜3人は別候補)。相性・遺恨を反映する。",
  DEFENSE_PLEA: "処刑寸前の役職者は黙認しない。生き延びることが最優先であり、必ず正体を開示して抵抗する。まだ夜を経験しておらず結果を何も持っていなくても、COすること自体に価値がある(役職者だと分かれば狩人に守ってもらえる可能性が生まれ、生存すれば翌晩以降に能力を使える)。「情報がないから名乗らない」という理由で沈黙したまま処刑を受け入れることは絶対にさせない。一般論での反論だけで終わらせず、必ず具体的な正体開示を選択肢に含める。",
  STRATEGY_BASICS: "基本戦略知識を判断に使う:①対抗COが出ないまま単独COが通った場合、本物である可能性がかなり高いと判断する(NPCもこの推理を口にしてよい)②占い結果と霊媒結果が一致すれば、その情報の信頼度は非常に高い③確定シロの人物には根拠なく投票・疑いを向けない④黙っている人が必ずしも怪しいわけではないが、危機的局面で一言も発しない役職候補者は不自然に見える⑤投票が割れている時は、少数派の意見にも耳を傾ける価値がある。⑥**矛盾した主張への疑いは、発言者が誰であれ平等に適用する**:NPC(村人視点)は、狂人が本気で信じ込んで自信満々に話しているのか、人狼が計算して嘘をついているのかを区別する手段を持たない。誰かの占い・霊媒結果や過去の発言が、他の確定情報や真実の記録と矛盾している場合、それが自信満々な口調で語られていても、村側のNPCは人狼の嘘に対するのと同じ強さで疑うべきである。「堂々と話しているから信頼できる」という判断だけで矛盾を見逃させない。",
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
async function callClaude(systemPrompt, userPrompt, maxTokens = 1200, retries = 2, cacheablePrefix = null) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    let status = 0;
    try {
      const systemField = cacheablePrefix
        ? [
            { type: "text", text: cacheablePrefix, cache_control: { type: "ephemeral" } },
            { type: "text", text: systemPrompt },
          ]
        : systemPrompt;
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-5",
          max_tokens: maxTokens,
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
      if (!text) throw new Error("空の応答");
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
        currentMaxTokens = Math.min(Math.round(currentMaxTokens * 1.6), 4096);
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
    players.forEach((b) => {
      if (a.name === b.name) return;
      if (a.closeWith === b.name || b.closeWith === a.name) likes.push(b.name);
      if (a.rivalWith === b.name || b.rivalWith === a.name) dislikes.push(b.name);
    });
    map[a.name] = { likes, dislikes };
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
${buildRules(...activeBoxes)}
${groundTruth ? `以下はこのゲームの内部真実データです。校閲で文章を修正する際、**これらの事実(占い結果・護衛履歴・ペア関係・CO状況等)と矛盾する内容を新たに書き加えたり、既存の正しい記述を誤った内容に書き換えたりしないこと(絶対厳守)**。修正はあくまで表現・スタイルの範囲に留める。\n${groundTruth}` : ""}
特に確認すること:①ト書きに役職名が漏れていないか ②全員が同じ反応で温度差がないか ③断定的すぎる感情描写になっていないか
出力は必ず修正後の同じJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...]}`;
  const userPrompt = `文脈: ${contextNote}\n\n下書き:\n${draftText}\n\n問題があれば直し、なければそのまま返してください。`;
  try {
    const parsed = await callClaudeAutoRetry(system, userPrompt, 700);
    return parsed?.lines || draftLines;
  } catch (e) {
    return draftLines; // チェック失敗時は下書きをそのまま採用(プレイヤーを止めない)
  }
}


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
  const [nameInput, setNameInput] = useState("");
  const [voteRound1Tally, setVoteRound1Tally] = useState(null);
  const [discussionTurns, setDiscussionTurns] = useState(0);

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
        }
      } catch (e) {
        // 保存済みの設定がない場合は何もしない
      }
      try {
        const save = await window.storage.get("game_save", false);
        if (save?.value) setHasSave(true);
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
    if (phase === "setup" || players.length === 0) return;
    const snapshot = {
      phase, day, players, compatMap, log, turnLabel, discussionTurns,
      voteRound1Tally, defenseCandidates, voteTarget, nightTarget,
      privateInfo, confirmedWhite, confirmedBlack, winner, jokerState,
      wolfActionsToday, userName, userGender, npcSeerLog, npcMediumLog, mediumRevealedName, executionHistory, npcJokerState, excludedSuspects, npcGuardLog, roleGuesses, npcAffinity, madmanDelusions, roleClaims,
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
  function copyDebugLog() {
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
    const endingText = ending
      ? `タロットカード: ${ending.tarotName || "(なし)"}\n診断説明: ${ending.diagnosis || "(なし)"}\n振り返り: ${ending.review || "(なし)"}\n感想:\n${(ending.comments || []).map((c) => `${c.speaker}: ${c.text}`).join("\n") || "(なし)"}`
      : "(エンディング未生成、またはゲーム進行中)";

    const content = `# 人狼ゲーム デバッグログ
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
  const [favorites, setFavorites] = useState([]); // 保存されたお気に入りストーリー一覧(最大3件)
  const [tarotCollection, setTarotCollection] = useState({}); // {カード名: {count, firstObtainedAt}} タロットカードのコレクション
  const [showTarotCollection, setShowTarotCollection] = useState(false);
  const [tarotJustAdded, setTarotJustAdded] = useState(false); // 直近のゲームで新規カードを獲得したか(NEW!表示用)
  const [favoriteSaved, setFavoriteSaved] = useState(false); // 今回のゲームを既にお気に入り登録したか
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
  const scrollBoxRef = useRef(null);

  // タイプライター表示:1文字ずつ出す。表示中のインデックス→表示済み文字数
  const [typedChars, setTypedChars] = useState({});
  const typingQueueRef = useRef([]);
  const isTypingRef = useRef(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    logRef.current.forEach((entry, i) => {
      if (typedChars[i] !== undefined) return; // 既に処理済み
      if (entry.type === "system") {
        setTypedChars((prev) => ({ ...prev, [i]: entry.text.length })); // システム文は即時表示
      } else if (!typingQueueRef.current.includes(i)) {
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

  // プレイヤーが死亡している場合、選択できることがないフェーズは自動的に進行する(ボタンを押さなくてよい)
  useEffect(() => {
    const me = getUser();
    if (!me || me.alive || busy) return;
    if (!["discussion", "vote_round1", "defense", "vote_final", "night"].includes(phase)) return;
    const timer = setTimeout(() => {
      if (phase === "discussion") advanceDiscussionAsSpectator();
      else if (phase === "vote_round1") submitVoteRound1();
      else if (phase === "defense") setPhase("vote_final");
      else if (phase === "vote_final") submitVoteFinal();
      else if (phase === "night") resolveNight();
    }, 1800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, busy, players]);

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
      .filter((e) => e.type === "user" || e.type === "npc" || e.type === "action" || e.type === "system")
      .map((e) => {
        if (e.type === "action") return `(${e.speaker}は${e.text})`;
        if (e.type === "system") return `[GM] ${e.text}`;
        return `${e.speaker}: ${e.text}`;
      })
      .join("\n");
  }
  function displayRole(p) {
    // ジョーカーで自覚前なら「村人」と表示する
    if (p.role === "ジョーカー" && jokerState.hidden) return "村人";
    return p.role;
  }

  // ---------------- ゲーム開始 ----------------
  async function startGame() {
    const finalName = nameInput.trim() || userName;
    if (!finalName) return; // 名前が未入力の場合は開始しない(ボタン側でも無効化しているが念のため二重にガードする)
    tokenTotals = { input: 0, output: 0, calls: 0, cacheRead: 0, cacheWrite: 0 };
    setTokenDisplay({ input: 0, output: 0, calls: 0, cacheRead: 0, cacheWrite: 0 });
    try {
      window.storage.delete("game_save", false);
    } catch (e) {}
    setHasSave(false);
    setUserName(finalName);
    try {
      window.storage.set("player_prefs", JSON.stringify({ name: finalName, gender: userGender, npcMaleCount }), false);
    } catch (e) {
      // 保存に失敗しても進行は止めない
    }
    const malePool = shuffle(CAST_POOL.filter((c) => c.gender === "男性"));
    const femalePool = shuffle(CAST_POOL.filter((c) => c.gender === "女性"));
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

    // 狂人は洗脳により、ランダムな役職を自分の正体だと思い込んでいる(村人は他の倍の確率で選ばれる)
    const delusionOptions = ["村人", "村人", "占い師", "霊媒師", "狩人", "共有者"];
    const delusions = {};
    all.filter((p) => p.role === "狂人").forEach((p) => {
      delusions[p.name] = pickRandom(delusionOptions);
    });

    setPlayers(all);
    setCompatMap(compat);
    setNpcAffinity(affinity);
    setMadmanDelusions(delusions);
    setRoleClaims({});
    setDay(1);
    setPrivateInfo([]);
    setNpcSeerLog([]);
    setNpcGuardLog([]);
    setNpcMediumLog([]);
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
    setTarotJustAdded(false);
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
      { type: "system", text: `あなた(${finalName})の役職は「${isJoker ? "村人" : me.role}」です。` },
    ];

    // ペア役職の場合、相方の情報もGMのセリフとして伝える(専用UIは使わない)
    if (me.role === "人狼" || me.role === "狂人" || me.role === "共有者") {
      const ally = all.find((p) => p.role === me.role && !p.isUser);
      introLog.push({ type: "system", text: `相方は${ally.name}です。お互い、ゲーム開始時から正体を知っています。` });
      // プレイヤー自身が狂人の場合、自分がどう振る舞うかは自由(演出上の思い込みは強制しない)。
      // ただし、相方のNPC狂人が今何を自分の正体だと思い込んでいるかは伝える(仲間の状況として把握できるように)。
      if (me.role === "狂人" && ally) {
        introLog.push({ type: "system", text: `🌀 相方の${ally.name}は、洗脳により自分を「${delusions[ally.name]}」だと信じ込んでいます(演技ではなく本気でそう思っています)。` });
      }
    }

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
    const cacheableRules = buildRules(...activeBoxes); // 呼び出しをまたいで変わらない部分。プロンプトキャッシュ対象にする

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
**CO(役職の自己申告)は軽々しくさせない**:プレイヤーやNPCから名指しで催促された、決選投票で追い詰められた等、明確な理由がある時にのみCOさせる。COは重い決断として扱う。
絶対厳守:speakerにプレイヤー名「${userName}」を使わない(NPCのみ)。プレイヤーへの問いかけの体裁を地の文で作らない。
**NPCの反応の後、あなた(GM)が一言で状況を整理し、プレイヤーへの決断ポイントを示す(例:「〇〇への疑いが強まっています。あなたはどう動きますか?」)。30字前後、断定しすぎない。**
**好感度の変動を判定する**:プレイヤーの直前の発言・行動を踏まえ、影響を受けたNPCがいれば好感度の増減を返す(-8〜+8の範囲)。優しさ・気遣い・褒める・性格や価値観が合う言動は好感度を上げる。冷たさ・攻撃的な物言い・根拠のない決めつけ・性格が合わない言動は好感度を下げる。目立った影響がなければそのNPCは含めなくてよい(全員分を無理に出さない)。
**CO(自称役職)の抽出**:今回生成したセリフの中で、誰かが初めて役職を自称した(CO した)場合、または既存の主張を変更した場合、roleClaimsとして報告する(例:「私が占い師です」と言わせたら {"高橋葵":"占い師"})。今回のセリフでCOが発生していなければ空オブジェクトでよい。
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...], "gm_prompt": "GMの一言", "affinityChanges": {"名前": 増減値, ...}, "roleClaims": {"名前": "自称した役職", ...}}`;

    const userPrompt = `これまでの会話:\n${transcript}\n\n直前のプレイヤー発言:「${userMsg}」\n\nNPCの反応を生成してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 1500, 1, cacheableRules);
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
    const cacheableRules = buildRules(...activeBoxes);

    const system = `あなたは人狼ゲームのゲームマスターです。
**公開情報(全員が知っているゲームのルール)**:この11人の中には、人狼2人・狂人2人・占い師1人・霊媒師1人・狩人1人・共有者2人・ジョーカー1人・村人1人という役職構成が存在します(誰がどれかは誰も知らない)。役職構成そのものの存在を疑う発言は絶対にさせない。
${getGroundTruthBlock()}
**霊媒師の結果は「人狼だった/人狼ではなかった」の二択のみ(絶対厳守)**:具体的な役職名を名言させない。
**霊媒師のCOタイミングを不当に「後出し」と評価させない**:霊媒師は処刑が起きるまで報告できることがないため、2日目の朝が最速のCOタイミングである。
**このゲームのルール上、人狼は毎晩必ず誰か1人を襲撃する**:朝になって誰も死んでいない場合、唯一の理由は狩人の護衛成功である。
**知り得る情報の範囲を厳守する**:各キャラのセリフは、そのキャラが実際に知り得る範囲の情報だけを根拠にする。人狼・狂人は味方以外の役職を知らない。
**プレイヤー「${userName}」は既に死亡しており、この議論には参加していません(発言させない)。**生存NPC(${npcs.map((n) => n.name).join("、")})だけで議論を進めてください。2〜4人が短く発言する。
絶対厳守:speakerに死亡したプレイヤー名「${userName}」を使わない。
**CO(自称役職)の抽出**:今回のセリフで誰かが初めて役職を自称した、または主張を変更した場合、roleClaimsとして報告する(なければ空オブジェクト)。
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...], "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `これまでの会話:\n${transcript}\n\nプレイヤー不在のまま、NPCたちの議論を進めてください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 900, 1, cacheableRules);
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
    const cacheableRules = buildRules(...activeBoxes);

    const system = `あなたは人狼ゲームのゲームマスターです。
${getGroundTruthBlock()}
各NPCのプレイヤー(${userName})への好感度(0〜100、内部数値。プレイヤーには絶対見せない):
${npcs.map((n) => `${n.name}: ${npcAffinity[n.name] ?? 50}`).join("、")}
**好感度を口調・態度に具体的に反映させる**:80以上は親しみを込めた口調・積極的な反応、60〜79は友好的、40〜59は普通に丁寧、20〜39はやや素っ気ない・距離感がある、20未満は明らかに冷たい・棘のある反応にする。
プレイヤー「${userName}」が(セリフではなく)**行動**を取りました。これはセリフではなく、しぐさ・観察・様子見などの非言語的な行動です。
GMとして、この行動の結果(何が見えた・分かったか)を地の文で短く描写してください。行動が他人に見える性質のものなら、気づいたNPCが短く反応してもよい(必須ではない)。
絶対厳守:speakerにプレイヤー名「${userName}」を使わない(NPCのみ)。
**好感度の変動を判定する**:行動の内容がNPCに好意的/不快な印象を与えた場合、好感度の増減を返す(-8〜+8)。目立った影響がなければ含めなくてよい。
**CO(自称役職)の抽出**:今回の描写・セリフでCOが発生した場合、roleClaimsとして報告する(なければ空オブジェクト)。
出力は必ずこのJSON形式のみ: {"narration":"行動の結果を描写する地の文(GM視点)", "lines":[{"speaker":"名前","text":"セリフ"}], "affinityChanges": {"名前": 増減値, ...}, "roleClaims": {"名前": "自称した役職", ...}}(反応するNPCがいなければlinesは空配列でよい)`;

    const userPrompt = `これまでの会話:\n${transcript}\n\nプレイヤーの行動:「${actionText}」\n\nこの行動の結果を描写してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 500, 1, cacheableRules);
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
    const cacheableRules = buildRules(...activeBoxes);

    const system = `あなたは人狼ゲームのゲームマスターです。
${getGroundTruthBlock()}
プレイヤー「${userName}」は今回、あえて何も発言・行動しませんでした(沈黙)。
これを受けて、生存NPC(${npcs.map((n) => n.name).join("、")})のうち0〜3人が自然に短く反応・会話を続けてください(プレイヤーの沈黙に触れても触れなくてもよい。誰も反応しなくてもよい)。
絶対厳守:speakerにプレイヤー名「${userName}」を使わない(NPCのみ)。
**CO(自称役職)の抽出**:今回のセリフでCOが発生した場合、roleClaimsとして報告する(なければ空オブジェクト)。
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前","text":"セリフ"}, ...], "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `これまでの会話:\n${transcript}\n\nプレイヤーは沈黙しています。NPCの反応を生成してください(反応がなければ空配列でよい)。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 500, 1, cacheableRules);
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
  async function sendAllyMessage() {
    const msg = input.trim();
    if (!msg || busy) return;
    const me = getUser();
    const ally = players.find((p) => p.role === me.role && !p.isUser);
    if (!ally || !ally.alive) {
      addLog([{ type: "system", text: "相方は既にいないため、密談はできません。" }]);
      setInput("");
      return;
    }
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    addLog([{ type: "ally", speaker: userName, text: msg }]);
    setBusy(true);
    if (!ally) {
      setBusy(false);
      return;
    }
    const allyTranscript = logRef.current.filter((e) => e.type === "ally").map((e) => `${e.speaker}: ${e.text}`).join("\n");
    const mainTranscript = getTranscript();
    // 重要:このNPCが実際に知り得る情報だけを渡す(全員の役職を渡さない)。
    // ペア役職(人狼・狂人・共有者)は自分と相方の正体だけを知っており、他の人の正体は知らない。
    const knownInfo = `あなた(${ally.name})の役職: ${ally.role}\n相方(プレイヤー「${userName}」)の役職: ${me.role}\n(これ以外の人物の正体は、あなたも知りません。憶測で断定的に話さないこと)\n公開情報として確定している白: ${confirmedWhite.join("、") || "なし"} / 公開情報として確定している黒: ${confirmedBlack.join("、") || "なし"}\n**現在のCO状況**: ${getClaimStatusText()}`;

    const system = `あなたは人狼ゲームの${me.role}NPC「${ally.name}」(${ally.personality}・${ally.club})です。プレイヤーはあなたの仲間(同じ${me.role})です。二人だけの密談で、村には聞こえません。仲間らしく本音で相談してください。
${knownInfo}
**絶対厳守**:あなたが知らないはずの情報(他人の正体・処刑者の正体など、上記に書かれていないこと)を、断定的に話さない。分からないことは「分からない」「〇〇じゃないかと思う(推測)」と扱う。${me.role === "狂人" ? `狂人は人狼陣営に洗脳されており、あなた(${ally.name})は現在、自分を「${madmanDelusions[ally.name] || "人狼"}」だと本気で信じ込んでいます(演技ではない)。相方のプレイヤーも同じ人狼陣営の仲間だと認識しています。この思い込みに沿って密談を進めてください。ただし本物の人狼が誰かは知りません。襲撃の指示や実行は実際にはできません。` : ""}${me.role === "人狼" ? "人狼は誰が狂人かは知りません。今夜の襲撃先の相談はできますが、根拠は憶測・観察に基づくものにする(断定的な役職名指しをしない)。" : ""}
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
    const cacheableRules = buildRules(...activeBoxes);
    const system = `あなたは人狼ゲームのGMです。
${getGroundTruthBlock()}
決選投票中、プレイヤー「${userName}」が自ら弁明・反論を述べました。生存NPC(${npcs.map((n) => n.name).join("、")})のうち2〜3人が短く反応してください。この弁明が説得力を持てば態度を軟化させ、弱ければ引き続き疑いを見せてよい(不当に必ず信じさせない)。
絶対厳守:speakerに「${userName}」を使わない。
**CO(自称役職)の抽出**:プレイヤーの弁明の中で役職を自称した場合、または反応するNPCが新たにCOした場合、roleClaimsとして報告する(なければ空オブジェクト)。
JSON形式のみ: {"lines":[{"speaker":"名前","text":"セリフ"}], "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `直近の会話:\n${transcript.split("\n").slice(-40).join("\n")}\n\nプレイヤーの弁明:「${msg}」\n\nNPCの反応を生成してください。`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 600, 1, cacheableRules);
      if (parsed?.lines) {
        const npcOnly = parsed.lines.filter((l) => l.speaker !== userName);
        addLog(npcOnly.map((l) => ({ type: "npc", speaker: l.speaker, text: l.text })));
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
  async function collectSplitVotes({ voteLabel, targetsHint, wolfExtraNote, maxTokens, delusionsOverride = null, transcriptText }) {
    const groups = getVoteGroups();
    const results = [];

    const tasks = groups.map((g) => async () => {
      const isWolfSide = g.npcs.some((p) => isWolfTeamNPC(p));
      const knowledgeLines = g.npcs.map((p) => getNPCOwnKnowledge(p, delusionsOverride)).join("\n");
      const cacheableRules = buildRules(...g.boxes); // グループごとの箱の組み合わせは固定なので、キャッシュがよく効く
      const system = `あなたは人狼ゲームのGMです。今は「${g.label}」グループのNPCの投票だけを決めます。
**このプロンプトには、このグループのNPCが実際に知っている情報しか書かれていません。他のグループの誰が何の役職かは一切分かりません。**
各NPCが知っていること(**各NPCは自分の行に書かれたことと公開情報だけを知っている**。同じグループの相方の行は、その相方とペアである場合のみ共有される):
${knowledgeLines}
${getPublicInfoLine()}
${getPlayerBlindnessNote()}
${voteLabel}。以下のNPC(${g.npcs.map((n) => n.name).join("、")})の投票先を決めてください。${targetsHint}
${isWolfSide ? `**人狼陣営の投票方針**:本物の人狼が全滅すれば即座に村の勝利になるため、本物の人狼を処刑させないことが最優先。**現在の生存者数は${alivePlayers().length}人。この数が少なくなるほど、人狼陣営(人狼+狂人+寝返ったジョーカー)が村側と同数に近づき、同数以上になった瞬間に人狼陣営の勝利が確定する**(詳しい内訳は分からなくても、生存者が少なくなっている実感は持ってよい)。序盤〜中盤は正体を隠すことを優先し、無理に村側を狙い撃ちしない。しかし**生存者が少なくなってきた終盤は話が変わり、対立する2人のどちらが本物の村側か確信が持てなくても、多少強引・不自然な理由付けになっても、村側である可能性が少しでも高い方への投票を優先する**(この局面ではバレるリスクより数的優位を逃すリスクの方が大きい)。それ以外の場面では、村側の有力な情報源(CO済みの占い師・霊媒師・狩人・確定シロ等)に票を集めるか、票を分散させる。ただし判で押したように同じ投票をすると不自然なので、性格に応じた表向きの(村人らしい)理由を個別に作る。${wolfExtraNote || ""}` : "各NPCは、自分が知っていることと会話ログの印象だけを根拠に**独立に**判断する。誰が人狼・狂人かは分からない。会話の中の矛盾・不自然さ・後出し・投票の偏りなど、観察できる根拠だけで疑う。根拠が薄ければ疑いも薄くする。確定シロには投票しない。"}
理由も短く。絶対厳守:votesにプレイヤー「${userName}」を含めない。上記のNPC以外の名前もvoterに使わない。
JSON形式のみ: {"votes": [{"voter":"名前","target":"名前","reason":"短い理由"}]}`;
      try {
        const parsed = await callClaudeAutoRetry(system, `これまでの会話:\n${transcriptText}\n\n各NPCの投票先を決めてください。`, maxTokens, 1, cacheableRules);
        return (parsed?.votes || []).filter((v) => g.npcs.some((p) => p.name === v.voter));
      } catch (e) {
        return null; // このグループだけ失敗(他のグループの票は活かす)
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

  async function submitVoteRound1() {
    const userIsAlive = getUser()?.alive;
    if ((userIsAlive && !voteTarget) || busy) return;
    setBusy(true);
    const aliveNames = alivePlayers().map((p) => p.name);
    const transcript = getTranscript();

    try {
      const npcVotes = await collectSplitVotes({
        voteLabel: `${day}日目の1回目投票。${userIsAlive ? `プレイヤーは「${voteTarget}」に投票済み。` : "プレイヤーは既に死亡しており投票権がない。"}`,
        targetsHint: "投票先は生存者の中から選ぶ(自分自身には投票しない)。",
        wolfExtraNote: "",
        maxTokens: 1300,
        transcriptText: transcript,
      });
      const tally = userIsAlive ? { [voteTarget]: 1 } : {};
      const lines = userIsAlive ? [{ type: "system", text: `${userName}: ${voteTarget} に投票` }] : [];
      npcVotes.forEach((v) => {
        if (v.voter === userName) return; // AIが誤ってプレイヤー自身の投票を含めてきた場合、二重集計を防ぐ
        if (aliveNames.includes(v.target) && v.target !== v.voter) {
          tally[v.target] = (tally[v.target] || 0) + 1;
          lines.push({ type: "npc", speaker: v.voter, text: `(${v.target}に投票) ${v.reason || ""}` });
        }
      });
      // 好感度の更新:自分に投票してきたNPCへの心証は下がる(相互不信)。自分が投票した相手からの心証も下がる。
      setNpcAffinity((prev) => {
        const next = { ...prev };
        npcVotes.forEach((v) => {
          if (v.target === userName && next[v.voter] !== undefined) {
            next[v.voter] = Math.max(0, next[v.voter] - 8);
          }
        });
        if (userIsAlive && next[voteTarget] !== undefined) {
          next[voteTarget] = Math.max(0, next[voteTarget] - 10);
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
    const cacheableRules = buildRules(...activeBoxes);
    const system = `あなたは人狼ゲームのGMです。
決選投票候補(NPCのみ。プレイヤー「${userName}」自身が候補の場合、プレイヤーの弁明は本人が書くのでここでは絶対に生成しない):\n${candidateInfo}
その他の生存NPC(傍観者、候補ではない): ${bystanders.map((p) => p.name).join("、") || "なし"}
${getGroundTruthBlock({ delusionsOverride })}
それぞれの候補に処刑を回避するための弁明をさせてください。役職者なら正体をぼかしながら訴える、人狼陣営なら多段階の言い訳や開き直りなど性格に応じて。
**重要**:弁明タイムは候補者だけの場ではない。**傍観者のNPCも、緊急性の高い割り込み(対抗CO、決定的な指摘など)があれば、この場で発言してよい**。「弁明タイム中だから言えなかった」という制約は存在しない。ただし全員が毎回割り込む必要はなく、言うべきことがある人だけでよい。
絶対厳守:speakerに「${userName}」を使わない。
**CO(自称役職)の抽出**:この弁明タイムで新たにCOが発生した、または主張が変わった場合、roleClaimsとして報告する。なければ空オブジェクトでよい。
JSON形式のみ: {"lines":[{"speaker":"名前","text":"セリフ"}], "roleClaims": {"名前": "自称した役職", ...}}`;
    const userPrompt = `直近の会話:\n${transcript.split("\n").slice(-40).join("\n")}\n\n弁明タイムのセリフを生成してください(各候補1〜2回発言。傍観者の割り込みがあれば含める)。`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 1700, 1, cacheableRules);
      let npcOnly = (parsed?.lines || []).filter((l) => l.speaker !== userName);
      if (npcOnly.length === 0) {
        // 生成結果が空(全てプレイヤー名義で除外された等)だった場合、もう一度だけ試す
        const parsed2 = await callClaudeAutoRetry(system, userPrompt + "\n\n(前回は有効なセリフが得られませんでした。必ずNPCのセリフを生成してください)", 1700, 1, cacheableRules);
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
    const cacheableRules = buildRules(...activeBoxes);

    const system = `あなたは人狼ゲームのGMです。
${getGroundTruthBlock()}
決選投票の弁明タイム中。候補は${defenseCandidates.join("・")}。プレイヤー「${userName}」が弁明を聞いた上で${isAction ? "行動を取りました(セリフではなく仕草・観察等)" : "発言しました"}。
**最重要**:これは会話ログの一番最後にある、プレイヤーの直前の発言・行動への反応である。それより前のやり取り(弁明の内容そのもの等)に今さら反応するのではなく、**今まさに起きたプレイヤーの発言・行動に対して**反応すること。時系列を混同しない。
これを受けて、候補者本人や周囲のNPC(2〜4人)が短く反応してください。候補者は動揺・開き直り・反論などで応じてよい。
絶対厳守:speakerに「${userName}」を使わない。
**CO(自称役職)の抽出**:この反応の中で誰かが新たにCOした、または主張を変えた場合、roleClaimsとして報告する(なければ空オブジェクト)。
${isAction ? `出力は必ずこのJSON形式のみ: {"narration":"行動の結果の地の文","lines":[{"speaker":"名前","text":"セリフ"}], "roleClaims": {"名前": "自称した役職", ...}}` : `出力は必ずこのJSON形式のみ: {"lines":[{"speaker":"名前","text":"セリフ"}], "roleClaims": {"名前": "自称した役職", ...}}`}`;
    const userPrompt = `直近の会話:\n${transcript.split("\n").slice(-40).join("\n")}\n\nプレイヤーの${isAction ? "行動" : "発言"}:「${msg}」\n\n反応を生成してください。`;

    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 700, 1, cacheableRules);
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
  async function submitVoteFinal() {
    const userIsAlive = getUser()?.alive;
    if ((userIsAlive && !voteTarget) || busy) return;
    setBusy(true);
    const transcript = getTranscript();

    try {
      const npcVotes = await collectSplitVotes({
        voteLabel: `決選投票。候補は${defenseCandidates.join("・")}の2名のみ。${userIsAlive ? `プレイヤーは「${voteTarget}」に投票済み。` : "プレイヤーは既に死亡しており投票権がない。"}`,
        targetsHint: `targetは${defenseCandidates.join("か")}のどちらか(候補者本人は自分以外の候補に投票)。相性・遺恨も反映。`,
        wolfExtraNote: "**重要**:村側の有力な情報源(CO済みの占い師・霊媒師・狩人・確定シロ等)が候補にいれば、そちらへ票を集める。自陣営(本物の人狼)が候補なら、もう一方の候補に票を入れて本物の人狼を守る。",
        maxTokens: 1100,
        transcriptText: transcript.split("\n").slice(-40).join("\n"),
      });
      const tally = { [defenseCandidates[0]]: 0, [defenseCandidates[1]]: 0 };
      if (userIsAlive) tally[voteTarget]++;
      const lines = userIsAlive ? [{ type: "system", text: `${userName}: ${voteTarget} に投票` }] : [];
      npcVotes.forEach((v) => {
        if (v.voter === userName) return; // AIが誤ってプレイヤー自身の投票を含めてきた場合、二重集計を防ぐ
        if (defenseCandidates.includes(v.target) && v.voter !== v.target) {
          tally[v.target] = (tally[v.target] || 0) + 1;
          lines.push({ type: "system", text: `${v.voter} → ${v.target}` });
        }
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
          const pool = updated.filter((p) => p.alive && p.name !== newJoker.name && p.name !== executed && !confirmedWhite.includes(p.name)).map((p) => p.name);
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
        if (medium.isUser) {
          // プレイヤー自身が霊媒師の場合のみ、私的な情報として伝える(本人にしか分からない知識のため)
          setPrivateInfo((prev) => [...prev, `【霊媒結果】${executed}は「${isWolf ? "人狼でした" : "人狼ではありませんでした"}」`]);
        }
      } else if (jokerHasMedium) {
        // 本物の霊媒師は既に死亡しており、ジョーカーが能力を継承している場合
        const isWolf = execPlayer.role === "人狼";
        setExecutionHistory((prev) => [...prev, { day, executed, trueRole: execPlayer.role }]);
        setPrivateInfo((prev) => [...prev, `【継承した霊媒結果】${executed}は「${isWolf ? "人狼でした" : "人狼ではありませんでした"}」`]);
        setJokerState((prev) => ({ ...prev, abilityUsed: true }));
      } else if (npcJokerWithMedium) {
        // NPCジョーカーが霊媒師の能力を継承している場合、内部の真実記録として残す(会話への登場はAIの判断に委ねる)
        const isWolf = execPlayer.role === "人狼";
        setNpcMediumLog((prev) => [...prev, { day, mediumName: npcJokerWithMedium.name, target: executed, result: isWolf ? "人狼" : "人狼ではない" }]);
        setExecutionHistory((prev) => [...prev, { day, executed, trueRole: execPlayer.role }]);
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

    // 人狼の襲撃対象(単なる怪しさではなく、村側の情報源としての脅威度を優先する)
    let wolfTarget = null;
    if (userIsWolf) {
      wolfTarget = nightTarget;
    } else if (npcWolves.length > 0) {
      // 確定シロ(占いでシロと判定された人)でも、狩人・共有者等としてCOしていれば十分な襲撃価値があるため、対象プールから除外しない
      const finalPool = alive.filter((p) => p.role !== "人狼").map((p) => p.name);
      const threatWeights = await getWolfThreatWeights(finalPool, transcript);
      const weighted = {};
      finalPool.forEach((n) => (weighted[n] = threatWeights[n] ?? 10));
      wolfTarget = weightedPick(weighted) || pickRandom(finalPool);
    }

    // 狩人の護衛対象(本物の狩人は死亡している可能性があるため、ジョーカーの継承も考慮する)
    let guardTarget = null;
    const npcJokerHunter = alive.find((p) => p.role === "ジョーカー" && !p.isUser && npcJokerState.abilityBank === "狩人" && !npcJokerState.abilityUsed);
    const hunter = alive.find((p) => p.role === "狩人") || (userIsHunter ? user : null) || npcJokerHunter;
    if (hunter) {
      if (hunter.isUser) {
        guardTarget = nightTarget;
      } else {
        const pool = alive.filter((p) => p.name !== hunter.name).map((p) => p.name);
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
      const pool = alive.filter((p) => p.name !== seer.name && !confirmedWhite.includes(p.name)).map((p) => p.name);
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

    const system = `あなたは人狼ゲームのGMです。人狼陣営(${wolfSideAlive.map((p) => p.name).join("・")})が、生存者${alive.length}人中${wolfSideAlive.length}人を占め、数の上で村側(${villageAlive.map((p) => p.name).join("・")})を上回っていることに気づきました。
もはや議論で言い逃れる必要はないと判断し、**人狼陣営が正体を明かして開き直り、数の力で押し切って村側の誰か1人を処刑(または沈黙させる)場面を短く描写してください**。村側が抵抗・動揺する様子も含めてよい。
${wolfNames.length > 0 ? `NPCの人狼陣営(${wolfNames.join("・")})のセリフを含める。` : "人狼陣営はプレイヤーのみ、または生存NPCに人狼陣営がいない場合は、GMのナレーションだけで押し切られる描写にする。"}
村側の生存NPC(${villageAlive.filter((p) => !p.isUser).map((p) => p.name).join("・") || "なし"})も、驚き・抵抗・絶望などの短い反応をしてよい。
絶対厳守:speakerにプレイヤー名「${userName}」を使わない。3〜6行程度、短くドラマチックに。
出力は必ずこのJSON形式のみ: {"lines": [{"speaker":"名前またはGM","text":"セリフ・地の文"}, ...]}`;
    const userPrompt = `直近の会話:\n${transcript.split("\n").slice(-30).join("\n")}\n\n人狼陣営が数の力で押し切る場面を生成してください。`;

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
      return next;
    });
  }

  // 役職一覧テキストを生成する(ジョーカーが寝返っている場合、その状態も明示する。投票・セリフ生成の一貫性のため必須)
  // ★ プレイヤー自身の役職は絶対に含めない。AIはプレイヤーのセリフを書かないため知る必要がなく、
  //   同じプロンプトで村側NPCの投票・反応を生成する以上、載せると「知らないふり」が破綻して不当に狙われる原因になる。
  function getRosterInfoWithDefection(playerList = players) {
    return playerList.map((p) => {
      if (p.isUser) {
        if (p.role === "ジョーカー" && jokerState.defected) {
          return `${p.name} 役職:【プレイヤー。ジョーカーとして人狼側へ寝返り済み。この事実は人狼・狂人だけが知っており、村側NPCは知らない】 生存:${p.alive}`;
        }
        return `${p.name} 役職:【プレイヤー。正体は全NPCにとって不明。会話ログ上の言動だけで判断すること】 生存:${p.alive}`;
      }
      let tag = p.role;
      if (p.role === "ジョーカー") {
        const defected = npcJokerState.defected;
        if (defected) {
          tag = "ジョーカー(既に人狼側へ寝返り済み。以降は人狼陣営の一員として、本物の人狼を守り村側を欺く行動を取る)";
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
            statusNote = `${npcJokerState.abilityBank}の能力を継承済みで、既に使用したことがある(結果を知っている状態)`;
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
        lines.push(`${role}ペア: ${members[0].name}・${members[1].name}`);
      }
    });
    return lines.length > 0 ? lines.join(" / ") : "なし";
  }

  // プレイヤーの真の役職をNPCの判断根拠にさせないための注意書き(投票・反応・弁明など全プロンプトに含める)
  function getPlayerBlindnessNote() {
    return `**プレイヤー「${userName}」の正体の扱い(絶対厳守・最優先)**:プレイヤーの本当の役職は、上記のペア情報から推測できる場合があっても、**ペアの当事者であるNPC本人以外は一切知らない**。村側NPC(および当事者以外の全NPC)がプレイヤーを疑う・投票する・反応する際、その根拠は**会話ログ上のプレイヤーの言動のみ**とし、真の役職を根拠にした判断(「実は狂人だから」「本当は人狼だから」等の裏付け)を絶対にしない。プレイヤーが村人らしく振る舞っていれば、村側NPCはそれを額面通りに受け取ってよい。プレイヤーだけが不自然に的確に見抜かれる展開は、このゲームの最も重大な不公平である。`;
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
      return `${p.name}: 本物の人狼。相方の人狼は${fmt(partnerOf("人狼"))}。それ以外(狂人が誰か等)は知らない。目的は人狼陣営の勝利。`;
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
        return `${p.name}: ジョーカー(人狼側へ寝返り済み)。本物の人狼は${players.filter((w) => w.role === "人狼" && w.alive).map((w) => w.name).join("・") || "なし"}だと知っている。本物の人狼を処刑に追い込む投票は絶対にしない。`;
      }
      const inherited = npcJokerState.abilityBank ? `覚醒済み(${npcJokerState.abilityBank}の力を継承)` : "未覚醒(自分を村人だと思っている)";
      return `${p.name}: ジョーカー。${inherited}。それ以外は知らない。`;
    }
    return `${p.name}: 村人。特別な情報は何も持っていない。会話の印象だけで判断する。`;
  }

  // 「互いを知っている単位」で投票グループを作る(グループ間で情報は漏れない)
  function getVoteGroups() {
    const npcs = otherAliveNPCs();
    const wolvesG = npcs.filter((p) => p.role === "人狼" || (p.role === "ジョーカー" && npcJokerState.defected));
    const madmenG = npcs.filter((p) => p.role === "狂人");
    const sharersG = npcs.filter((p) => p.role === "共有者");
    const solosG = npcs.filter((p) => !wolvesG.includes(p) && !madmenG.includes(p) && !sharersG.includes(p));
    const groups = [];
    if (wolvesG.length) groups.push({ label: "人狼(+寝返りジョーカー)", npcs: wolvesG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD", "WOLF_CORNERED"] });
    if (madmenG.length) groups.push({ label: "狂人", npcs: madmenG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD", "MADMAN"] });
    if (sharersG.length) groups.push({ label: "共有者", npcs: sharersG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD", "SHARER"] });
    if (solosG.length) groups.push({ label: "単独役職・村人", npcs: solosG, boxes: ["CORE", "STRATEGY_BASICS", "VOTE_SPREAD"] });
    return groups;
  }

  function getPublicInfoLine() {
    return `公開情報 — 生存者: ${alivePlayers().map((p) => p.name).join("、")} / 確定シロ(公開された結果): ${confirmedWhite.join("、") || "なし"} / 確定クロ(公開された結果): ${confirmedBlack.join("、") || "なし"} / CO(自称役職)状況: ${getClaimStatusText()}
※ CO は自己申告であり本物とは限らない。複数人が同じ役職を名乗っていれば片方は偽物。単独COで対抗が出ていなければ信頼度は高いが確定ではない。`;
  }

  // ============================================================
  // 真実データの一元管理:このゲームの「内部真実」を1箇所にまとめて生成する。
  // AIへ送る各プロンプト(議論・行動・投票・弁明タイム等)は、個別にデータを組み立てず、必ずここから取得する。
  // 新しい真実データを追加する時は、ここに1箇所追加するだけで全プロンプトに自動反映される(渡し忘れを防ぐ)。
  // options.includeTranscript: 会話ログ全文も含めるか(密談など制限された文脈では含めない)
  // options.candidatesOnly: 弁明タイムなど、特定の対象者に絞ったCO状況・思い込みだけを見せたい場合に配列で指定
  // ============================================================
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
相性マップ: ${JSON.stringify(compatMap)}
**実際のペア役職の組み合わせ(真実、絶対厳守)**: ${getRealPairsText()}
(このペア関係は、そのペアの当事者2人だけが知っている秘密情報。当事者以外のNPCの判断には絶対に使わない)
誰かが「〇〇が自分の相方だ」と主張した場合、必ず上記の実際の組み合わせと照合する。一致しなければそれは嘘であり、本物のペアの片割れが生存していれば、その人物は同意・肯定せず、違和感を示すか否定する。
${getPlayerBlindnessNote()}
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
    const madmenNames = currentPlayers.filter((p) => p.role === "狂人" && p.alive).map((p) => p.name);
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
    const madmenInVote = candidates.filter((name) => currentPlayers.find((p) => p.name === name)?.role === "狂人");
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
      addLog([{ type: "system", text: `🌀 相方の${ally.name}の思い込みに変化がありました。今は自分を「人狼」だと信じ込んでいるようです。` }]);
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
        addLog([{ type: "system", text: "🃏 あなたは占い師の力を継承しました。すぐに誰かを占うことができます。" }]);
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
      } else {
        addLog([{ type: "system", text: `🃏 あなたは${role}の力を継承しました。今夜から使えます。` }]);
      }
    } else {
      setJokerState((prev) => ({ ...prev, pendingInheritance: null }));
      addLog([{ type: "system", text: "あなたはこの力を継承しないことを選びました。" }]);
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
    addLog([{ type: "system", text: `🃏 あなたは${targetName}を占った。結果は「${result}」。` }]);
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

  function actuallyFinishGame(win, freshPlayers = null) {
    if (freshPlayers) setPlayers(freshPlayers);
    setWinner(win);
    setPhase("gameover");
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

  async function generateEnding(win) {
    setEndingLoading(true);
    const me = getUser();
    const meIsWolfSide = me.role === "人狼" || me.role === "狂人" || (me.role === "ジョーカー" && jokerState.defected);
    const playerWon = (win === "人狼陣営" && meIsWolfSide) || (win === "村人陣営" && !meIsWolfSide);
    const fullTranscript = log.filter((e) => e.type === "user" || e.type === "npc" || e.type === "system").map((e) => `${e.speaker || "GM"}: ${e.text}`).join("\n");
    const rosterInfo = players.map((p) => {
      const defected = p.role === "ジョーカー" && ((p.isUser && jokerState.defected) || (!p.isUser && npcJokerState.defected));
      return `${p.name}(${p.personality}・${p.club}) 役職:${p.role}${defected ? "(人狼側へ寝返り済み)" : ""}${p.alive ? "" : "・故人"}`;
    }).join("\n");
    const npcNames = players.filter((p) => !p.isUser).map((p) => p.name);
    const system = `あなたは人狼ゲームのGMです。ゲームが終了しました(${win}の勝利)。プレイヤー「${userName}」(役職:${me.role})のゲーム全体の言動を振り返り、以下4つを生成してください。
**プレイヤー自身の勝敗(絶対厳守)**: プレイヤーは${playerWon ? "勝者側です(自分の陣営が勝利した)。review・diagnosis・commentsのトーンは、たとえプレイヤー個人が途中で処刑・敗死していても、最終的に自分の陣営が勝ったことを踏まえた達成感・満足感のある語り口にする。「負けた」「敗北」のような否定的な結論で締めくくらない" : "敗者側です(自分の陣営が敗北した)。悔しさや反省を含むトーンにしてよい"}。この勝敗の事実と矛盾する語り口(勝ったのに敗北したかのような書き方、その逆)を絶対にしない。
**各NPCの感想も、そのNPC自身の本当の陣営の勝敗と矛盾しないトーンにする(絶対厳守)**:上記の役職一覧で「人狼側へ寝返り済み」と明記されているキャラクターは、村人陣営が勝った場合は敗者側であり、「村が勝って良かった」のような肯定的な感想を言わせない(悔しさ・複雑な心境を滲ませる)。逆に人狼陣営が勝った場合、村人・占い師等の純粋な村側キャラクターは敗者側であり、手放しの喜びは表現させない。
**実際のペア役職の組み合わせ(真実、絶対厳守)**: ${getRealPairsText()}
**重要**:会話ログ中に誰かが特定の相方を主張していても、それが上記の実際の組み合わせと違う場合、その主張は嘘だった(狂人や人狼の偽CO)ということ。振り返り・感想を書く際、事実と異なる主張を「本物だった」「証明された」のように誤って肯定しない。役職構成の真実だけを根拠にする。
**狂人の「我に返る」演出(重要)**:ゲーム中、狂人は洗脳により自分を別の役職(あるいは人狼)だと信じ込んでいた(以下参照)。しかし**ゲームが終わった今、洗脳が解けて我に返っている**。狂人だったキャラクターの感想は、「実はゲーム中ずっと〇〇だと思い込んでいた」ことを自覚した上で、当時の言動を振り返る内容にする(例:「今思うと、なんであんな結果を口走ってたんだろう…」「洗脳が解けてみると恥ずかしい」等)。ただし陣営としては人狼側なので、村が勝った場合は上記の「敗者側」トーンも両立させる。
狂人の思い込み一覧(真実): ${Object.entries(madmanDelusions).map(([n, role]) => `${n}は「${role}」だと思い込んでいた`).join("、") || "なし"}
**ゲーム全体を通してのCO(自称役職)の履歴**: ${getClaimStatusText()}(複数人が同じ役職を主張していた場合、それが決着したかどうかも踏まえて振り返りに反映する)
①review:プレイヤーの活躍・印象的だった行動と、それが結果的にどう影響したか(功績にも仇にもなり得る)を3〜4文でドラマチックに振り返る
②tarot:プレイヤーの今回のプレイスタイルを、大アルカナ22枚(愚者・魔術師・女教皇・女帝・皇帝・教皇・恋人・戦車・力・隠者・運命の輪・正義・吊るされた男・死神・節制・悪魔・塔・星・月・太陽・審判・世界)の中から最も近い1枚に例える。tarotNameにカード名、diagnosisに「なぜそのカードなのか」を実際の言動を踏まえて2〜3文で説明する。
③comments:生存・故人を問わず**全員(${npcNames.join("、")})が一人ずつ**、ゲーム全体を振り返る短い感想(1〜2文、性格に合った口調)。死者は故人としての視点で、生存者は素直な感想を。プレイヤーへの言及があってもよい。
④monologue:**勝敗が確定した瞬間の、プレイヤー自身(${userName})の一人称の独白**。1〜2文、短く余韻のある文体で(例:「……勝った。それだけで、十分だった。」のような簡潔な語り口)。生きていても死んでいても、魂の声として書く。プレイヤーの勝敗(${playerWon ? "勝利" : "敗北"})と矛盾しないトーンにする。
役職構成(ネタバレ・全員分):\n${rosterInfo}
JSON形式のみ: {"tarotName":"タロットカード名","review":"振り返り文章","diagnosis":"そのカードに例えた理由の説明文","comments":[{"speaker":"名前","text":"感想"}, ...(全員分)],"monologue":"独白の文章"}`;
    const userPrompt = `ゲーム全体の会話ログ:\n${fullTranscript.slice(-6000)}`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 3000);
      if (parsed) {
        setEnding(parsed);
        if (parsed.tarotName) recordTarotCard(parsed.tarotName);
      }
    } catch (e) {
      const fallback = { tarotName: "隠者", review: "ゲームの記録は静かに幕を閉じました。", diagnosis: "", comments: [] };
      setEnding(fallback);
      recordTarotCard(fallback.tarotName);
    }
    setEndingLoading(false);
  }

  // 獲得したタロットカードをコレクションに記録する(永続化)
  async function recordTarotCard(cardName) {
    setTarotCollection((prev) => {
      const isNew = !prev[cardName];
      setTarotJustAdded(isNew);
      const next = {
        ...prev,
        [cardName]: {
          count: (prev[cardName]?.count || 0) + 1,
          firstObtainedAt: prev[cardName]?.firstObtainedAt || new Date().toLocaleString("ja-JP"),
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
    const fullTranscript = log.filter((e) => e.type === "user" || e.type === "npc" || e.type === "system").map((e) => `${e.speaker || "GM"}: ${e.text}`).join("\n");

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
    if (roleClaims[target.name]) {
      truthNote += `\n【${target.name}が実際にCOしていた役職(自称)】${roleClaims[target.name].role}(${roleClaims[target.name].sinceDay}日目〜)`;
    }

    const system = `あなたは人狼ゲームのGMです。ゲームは既に終了しています(全員の正体は明らかになっている)。プレイヤー「${userName}」が、ゲーム終了後に${target.name}(${target.personality}・${target.club}、役職:${target.role}${target.alive ? "" : "・故人"})へ最後の質問をします。
役職構成(ネタバレ・全員分):\n${rosterInfo}${truthNote}
ゲームは終わっているので、${target.name}は正体を隠す必要はなく、本音で率直に答えてよい。1〜3文、性格に合った口調で。
**出力前の最終チェック**:上記の内部真実データがあれば、それと矛盾する回答を絶対にしない。会話ログの記憶が曖昧でも、内部真実データを優先する。
JSON形式のみ: {"text":"回答"}`;
    const userPrompt = `ゲーム全体の会話ログ:\n${fullTranscript.slice(-6000)}\n\nプレイヤーからの最後の質問:「${endingQuestionInput.trim()}」\n\n${target.name}として答えてください。`;
    try {
      const parsed = await callClaudeAutoRetry(system, userPrompt, 500);
      setEndingAnswer({ speaker: target.name, text: parsed?.text || "……。", question: endingQuestionInput.trim() });
    } catch (e) {
      setEndingAnswer({ speaker: target.name, text: "(通信エラーのため、返事は届かなかった)", question: endingQuestionInput.trim() });
    }
    setEndingQuestionLoading(false);
  }

  // お気に入りストーリーとして今回のゲームを保存する(最大3件、古いものから上書き)
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
      addLog([{ type: "system", text: "🐺 あなたは人狼側へ寝返ることを選びました。以後、人狼陣営として振る舞います。継承していた力(未使用分)は消え去りました。" }]);
      // 寝返った瞬間に数的優位へ達している可能性があるため、即座に勝敗判定する
      const win = checkWin(players, { userDefected: true });
      if (win === "人狼陣営") {
        triggerWolfMajorityReveal();
      }
    } else {
      setJokerState((prev) => ({ ...prev, defectionOffered: false })); // 次の夜、また再抽選できるようにする
      addLog([{ type: "system", text: "あなたは寝返らないことを選びました。" }]);
    }
  }

  // ============================================================
  // UI
  // ============================================================

  if (phase === "setup") {
    return (
      <>
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#F7F3E9" }}>
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-bold" style={{ color: "#2B2620" }}>AI人狼</h1>

          <div className="space-y-3 text-left">
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
                    style={userGender === g ? { background: "#8B3A3A", color: "#FFFFFF", borderColor: "#8B3A3A" } : { background: "#FFFFFF", color: "#2B2620", borderColor: "#D8C4B5" }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: "#6B6355" }}>クラスメイトの男女比率(NPC10人中)</label>
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
          </div>

          {hasSave && (
            <div className="space-y-2">
              <button
                onClick={resumeGame}
                className="w-full px-10 py-3 rounded-lg font-bold text-lg border"
                style={{ background: "#FFFFFF", color: "#8B3A3A", borderColor: "#8B3A3A" }}
              >
                続きから始める
              </button>
              <button
                onClick={clearSave}
                className="w-full text-xs underline"
                style={{ color: "#6B6355" }}
              >
                保存データを削除する
              </button>
            </div>
          )}

          <button
            onClick={startGame}
            disabled={!nameInput.trim() && !userName}
            className="w-full px-10 py-3 rounded-lg font-bold text-lg disabled:opacity-40"
            style={{ background: "#8B3A3A", color: "#FFFFFF" }}
          >
            {hasSave ? "最初からはじめる" : "はじめる"}
          </button>
          {!nameInput.trim() && !userName && (
            <p className="text-xs text-center" style={{ color: "#B05050" }}>ニックネームを入力してください</p>
          )}

          {favorites.length > 0 && (
            <button
              onClick={() => setShowFavorites(true)}
              className="w-full py-2 text-sm underline"
              style={{ color: "#8A5A2A" }}
            >
              ⭐ お気に入りのストーリーを見る({favorites.length}/3)
            </button>
          )}

          <button
            onClick={() => setShowTarotCollection(true)}
            className="w-full py-2 text-sm underline"
            style={{ color: "#8A5A2A" }}
          >
            🔮 タロットコレクション({Object.keys(tarotCollection).length}/{TAROT_CARDS.length})
          </button>
        </div>
      </div>

      {showTarotCollection && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowTarotCollection(false)} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl p-5 space-y-3 shadow-2xl" style={{ background: "#FBF8F1" }}>
            <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: "#DDD5C3" }}>
              <div className="text-lg font-bold" style={{ color: "#5B4636" }}>🔮 タロットコレクション</div>
              <button onClick={() => setShowTarotCollection(false)} className="text-2xl leading-none" style={{ color: "#6B6355" }}>✕</button>
            </div>
            <div className="text-xs text-center" style={{ color: "#8A8272" }}>{Object.keys(tarotCollection).length} / {TAROT_CARDS.length} 枚 獲得済み</div>
            <div className="grid grid-cols-2 gap-2">
              {TAROT_CARDS.map((card) => {
                const owned = tarotCollection[card];
                return (
                  <div
                    key={card}
                    className="rounded-lg p-3 border text-center"
                    style={owned ? { background: "#F0EAD9", borderColor: "#8A5A2A" } : { background: "#EAE6DC", borderColor: "#D8C4B5", opacity: 0.5 }}
                  >
                    <div className="text-lg font-bold" style={{ color: owned ? "#8A5A2A" : "#8A8272" }}>
                      {owned ? `🔮 ${card}` : "❔ ？？？"}
                    </div>
                    {owned && (
                      <div className="text-xs mt-1" style={{ color: "#8A8272" }}>
                        {owned.count}回獲得
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
          {{ discussion: "昼(議論)", vote_round1: "昼(1回目投票)", defense: "昼(弁明タイム)", vote_final: "昼(決選投票)", night: "夜", gameover: "終了" }[phase]}
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
                        {confirmedWhite.includes(p.name) && <span className="text-xs ml-1" style={{ color: "#0F7A4A" }}>(白)</span>}
                        {confirmedBlack.includes(p.name) && <span className="text-xs ml-1" style={{ color: "#B23A3A" }}>(黒)</span>}
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
          {phase === "discussion" && !user.alive && (
            <div className="max-w-2xl mx-auto text-center space-y-2 py-2">
              <div className="text-sm" style={{ color: C.textFaint }}>
                💀 あなたは既に処刑され、この世を去りました。以降は結末を見届けるだけです(発言はできません)。物語は自動的に進んでいきます……
              </div>
            </div>
          )}
          {phase === "discussion" && user.alive && (
            <div className="max-w-2xl mx-auto w-full space-y-1.5">
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
              {user.alive ? (
                <>
                  <div className="text-sm" style={{ color: C.textMuted }}>1回目投票:誰に投票しますか?</div>
                  <div className="flex flex-wrap gap-2">
                    {alivePlayers().filter((p) => !p.isUser).map((p) => (
                      <PickButton key={p.name} name={p.name} selected={voteTarget === p.name} onClick={() => setVoteTarget(p.name)} extraLabel={confirmedWhite.includes(p.name) ? "白" : null} />
                    ))}
                  </div>
                  <button onClick={submitVoteRound1} disabled={!voteTarget || busy} className="w-full py-2 rounded-lg font-bold disabled:opacity-50" style={{ background: C.accent, color: C.white }}>
                    {busy ? "集計中..." : "投票を確定する"}
                  </button>
                </>
              ) : (
                <div className="text-sm text-center py-2" style={{ color: C.textFaint }}>投票権はありません。結果が自動的に集計されます……</div>
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
              ) : user.alive && !defenseReacted ? (
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
              ) : user.alive ? (
                <div className="text-sm" style={{ color: C.textMuted }}>リアクションが済みました。決選投票へ進んでください。</div>
              ) : (
                <div className="text-sm" style={{ color: C.textFaint }}>💀 あなたは既に処刑されており、この場面には関われません。</div>
              )}
              <button onClick={() => setPhase("vote_final")} disabled={busy} className="w-full py-2 rounded-lg text-sm" style={{ background: "#EDE0D8", color: C.userLabel }}>決選投票へ進む</button>
            </div>
          )}

          {phase === "vote_final" && (
            <div className="max-w-2xl mx-auto space-y-2">
              {user.alive ? (
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
                <div className="text-sm text-center py-2" style={{ color: C.textFaint }}>投票権はありません。結果が自動的に集計されます……</div>
              )}
            </div>
          )}

          {phase === "night" && (
            <div className="max-w-2xl mx-auto space-y-2">
              {(() => {
                const isPairRole = user.role === "人狼" || user.role === "狂人" || user.role === "共有者";
                const allyAlive = isPairRole && players.some((p) => p.role === user.role && !p.isUser && p.alive);
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
                        {alivePlayers().filter((p) => !p.isUser).map((p) => (
                          <PickButton key={p.name} name={p.name} selected={nightTarget === p.name} onClick={() => setNightTarget(p.name)} extraLabel={confirmedWhite.includes(p.name) ? "白" : null} />
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
