// Detailed exhibits, posters, and questions database for the 3D Anti-Drug Exhibition
// Công An Phường Tân Hưng - Công An Thành Phố Hồ Chí Minh
// 36 Tiêu bản mẫu vật nghiệp vụ phân bổ chính xác theo 3 tủ (Mỗi tủ 12 mẫu: 6 hàng trên & 6 hàng dưới)

export const exhibitsData = [
  // =========================================================================
  // TỦ 1 (Phía Trái - cabinet_left): 12 MẪU VẬT
  // Nhóm 1: Ma túy kích thích tổng hợp, bán tổng hợp & dược chất gây nghiện
  // =========================================================================

  // --- HÀNG TRÊN (Tủ 1 - 6 Mẫu: Bậc cao Y = 1.14m, lùi sát vách X = -5.35m) ---
  {
    id: "meth_crystal",
    name: "Methamphetamine tinh thể",
    subtitle: "D-Methamphetamine tinh thể nguyên chất",
    category: "Chất kích thích tổng hợp ATS",
    description: "Methamphetamine dạng tinh thể trong suốt không màu hoặc màu trắng đục. Đây là dạng muối hydroclorid tinh khiết nhất của methamphetamine, có độc lực kích thích thần kinh trung ương cực kỳ dữ dội.",
    effects: [
      "Hệ thần kinh: Phá hủy thụ thể dopamine, gây teo não thùy trán, thoái hóa tế bào thần kinh vĩnh viễn.",
      "Tâm thần học: Gây loạn thần cấp, hoang tưởng bị truy hại, ảo thị và ảo thanh kinh dị.",
      "Hệ tim mạch: Gây co thắt mạch vành, nhồi máu cơ tim, vỡ phình mạch não dẫn đến đột tử."
    ],
    warning: "Độc tính phá hủy tế bào não cực nhanh, gây nghiện tâm thần nặng nề không thể đảo ngược!",
    position: { x: -5.35, y: 1.14, z: -3.75 },
    cabinetId: "cabinet_left",
    row: "upper",
    audioText: "Bạn đang quan sát tiêu bản Methamphetamine dạng tinh thể nguyên chất. Dưới kính hiển vi quang học, các tinh thể hình kim hoặc lăng trụ trong suốt này bám chặt vào tế bào thần kinh, ép não bộ phóng thích lượng dopamine gấp nhiều chục lần mức tự nhiên. Sau cảm giác hưng phấn giả tạo ban đầu, người dùng sẽ rơi vào trạng thái suy kiệt thần kinh, mất ngủ kéo dài, phát sinh chứng hoang tưởng ngáo đá hoại tử nhân cách.",
    waveform: [25, 60, 85, 45, 90, 70, 40, 85, 95, 60, 30, 75, 90, 50, 80, 65, 90, 40, 20, 50],
    inspectInfo: "Tinh thể lăng trụ trong suốt, sáng lấp lánh như mảnh băng vụn, đựng trong túi zip tang vật niêm phong chuyên dụng của Công an."
  },
  {
    id: "ice_meth",
    name: "Ma túy đá",
    subtitle: "Methamphetamine dạng đá vụn lóng lánh",
    category: "Chất kích thích tổng hợp ATS",
    description: "Thường được gọi lóng là 'đá', 'pha lê' hoặc 'ice'. Đây là methamphetamine thương phẩm đường phố, thường bị pha tạp hóa chất độc hại để tăng trọng lượng và tạo hiệu ứng kích thích bạo lực.",
    effects: [
      "Hành vi: Gây hội chứng ngáo đá mất kiểm soát, tự hủy hoại bản thân hoặc gây án bạo lực nghiêm trọng.",
      "Ngoại hình: Hội chứng miệng ma túy đá (meth mouth) làm rụng mục toàn bộ hàm răng, lở loét da.",
      "Thể trạng: Sụt cân cực độ, teo cơ, suy kiệt đa tạng và mất ngủ triền miên nhiều tuần."
    ],
    warning: "Nguyên nhân hàng đầu của các vụ án giết người, chém người thân trong cơn ngáo đá điên loạn!",
    position: { x: -5.35, y: 1.14, z: -2.75 },
    cabinetId: "cabinet_left",
    row: "upper",
    audioText: "Tiêu bản ma túy đá thương phẩm thu giữ từ các tụ điểm mua bán trái phép. Kẻ thủ ác thường sử dụng nỏ thủy tinh để đốt bốc khói hít trực tiếp. Ma túy đá đẩy nhịp tim người dùng lên tới 160 nhịp một phút, tăng thân nhiệt cực đoan và dẫn truyền xung đột dữ dội trong não bộ, gây ra hiện tượng ảo giác sâu bọ bò dưới da khiến người nghiện tự cào xé nát cơ thể.",
    waveform: [35, 75, 90, 60, 85, 40, 70, 95, 80, 50, 40, 85, 70, 60, 90, 75, 85, 30, 25, 60],
    inspectInfo: "Khối tinh thể vỡ vụn màu trắng đục lẫn vẩn mờ tạp chất phốt-pho đỏ, đựng trong túi ni-lông niêm phong hình chữ nhật."
  },
  {
    id: "cocaine_pill",
    name: "Cocaine dạng viên",
    subtitle: "Viên nén alkaloid kích thích cực mạnh",
    category: "Chất kích thích tự nhiên alkaloid",
    description: "Cocaine được dập ép thành dạng viên nén để dễ cất giấu và vận chuyển qua đường tiêu hóa hoặc đường bưu chính. Có nguồn gốc từ lá cây Erythroxylum coca, cocaine là chất ức chế tái hấp thu dopamine và norepinephrine cực mạnh.",
    effects: [
      "Tim mạch: Co thắt mạch vành đột ngột, loạn nhịp thất chết người ngay khi sử dụng liều nhỏ.",
      "Thần kinh: Gây hoang tưởng cực độ, kích động hưng cảm, mất cảm giác đau đớn.",
      "Đột quỵ: Gây xuất huyết não dưới nhện do tăng huyết áp kịch phát."
    ],
    warning: "Độc lực tim mạch cực cao, dễ gây đột tử tức khắc chỉ sau vài phút!",
    position: { x: -5.35, y: 1.14, z: -1.75 },
    cabinetId: "cabinet_left",
    row: "upper",
    audioText: "Đây là mẫu cocaine dập viên nén do các đường dây ma túy quốc tế ngụy trang. Khác với dạng bột hít truyền thống, viên nén cocaine dễ dàng bị nuốt trôi để vận chuyển lậu. Khi một viên nén bị vỡ trong ruột, cơ thể sẽ hấp thụ một lượng cực độc khiến huyết áp tăng vọt, tim đập loạn nhịp và tử vong gần như ngay tức khắc.",
    waveform: [40, 65, 80, 50, 70, 85, 90, 60, 45, 80, 75, 60, 85, 90, 70, 55, 40, 60, 30, 20],
    inspectInfo: "Viên nén hình tròn dập chìm ký hiệu số, bề mặt nhẵn mịn màu trắng ngà, bảo quản trong lọ nghiệm thu y tế."
  },
  {
    id: "morphine",
    name: "Morphine",
    subtitle: "Dược chất giảm đau y tế bị lạm dụng nghiêm trọng",
    category: "Chất tự nhiên opioid",
    description: "Alkaloid tự nhiên chính chiết xuất từ nhựa cây thuốc phiện. Trong y khoa là thuốc giảm đau nhóm opioid bậc 3 kiểm soát nghiêm ngặt, nhưng khi bị tuồn ra ngoài trở thành độc chất gây nghiện tàn khốc.",
    effects: [
      "Lệ thuộc cơ thể: Gây hội chứng cai nghiện đau đớn tột cùng xé thịt, toát mồ hôi lạnh, tiêu chảy dữ dội.",
      "Hô hấp: Ức chế phản xạ hô hấp tại hành não, gây ngạt thở và hôn mê sâu.",
      "Tiêu hóa: Liệt nhu động ruột, táo bón ác tính, co thắt cơ vòng túi mật."
    ],
    warning: "Thuộc danh mục Dược phẩm Gây nghiện đặc biệt nguy hiểm, cấm lưu hành tự do!",
    position: { x: -5.35, y: 1.14, z: -0.75 },
    cabinetId: "cabinet_left",
    row: "upper",
    audioText: "Morphine là chuẩn mực đo lường độc lực của các opioid. Được phát hiện từ đầu thế kỷ 19, morphine cứu rỗi những cơn đau ung thư giai đoạn cuối nhưng lại là xiềng xích gông cùm người nghiện. Khi lạm dụng, cơ thể nhanh chóng dung nạp thuốc, buộc con nghiện phải tăng liều liên tục cho đến khi chạm ngưỡng tử vong vì ngừng thở.",
    waveform: [20, 35, 50, 40, 60, 45, 30, 55, 70, 50, 30, 45, 60, 55, 40, 35, 50, 25, 20, 15],
    inspectInfo: "Ống tiêm thủy tinh y tế dung tích 10mg/ml trong suốt dán nhãn đỏ kiểm soát đặc biệt, kèm kim tiêm vô trùng."
  },
  {
    id: "ecstasy",
    name: "Ecstasy / MDMA / Thuốc lắc",
    subtitle: "Viên nén kích thích & gây ảo cảm giác tiệc tùng",
    category: "Chất kích thích & ảo giác nhân tạo",
    description: "3,4-Methylenedioxymethamphetamine (MDMA), thường gọi là thuốc lắc, 'kẹo', 'vương miện'. Thường được dập logo bắt mắt như khiên, sao, siêu nhân, ngụy trang thành kẹo ngậm để lôi kéo giới trẻ trong vũ trường, quán bar.",
    effects: [
      "Tăng thân nhiệt ác tính: Làm thân nhiệt vọt lên 42-43°C gây tan rã cơ vân và đông máu nội mạch.",
      "Tâm lý: Phá hủy hệ thống dẫn truyền serotonin, để lại chứng trầm cảm tự sát kéo dài sau tiệc.",
      "Nhiễm độc nước: Hội chứng bài tiết ADH không thích hợp gây phù não cấp tử vong do uống quá nhiều nước."
    ],
    warning: "Cạm bẫy cực kỳ phổ biến trong các cuộc tụ tập 'bay lắc', phá hủy toàn diện não bộ thanh thiếu niên!",
    position: { x: -5.35, y: 1.14, z: 0.25 },
    cabinetId: "cabinet_left",
    row: "upper",
    audioText: "Thuốc lắc hay MDMA là loại ma túy tổng hợp đánh lừa người dùng bằng cảm giác hòa đồng, hưng phấn và thăng hoa âm thanh. Tuy nhiên, thuốc làm tê liệt trung tâm điều nhiệt của vùng dưới đồi não. Kết hợp với việc nhảy múa cường độ cao trong không gian kín, thân nhiệt người dùng tăng vọt dẫn tới suy gan thận cấp, xuất huyết não và đột tử ngay tại sàn nhảy.",
    waveform: [50, 80, 95, 70, 90, 85, 60, 90, 100, 75, 55, 85, 95, 70, 85, 90, 65, 45, 30, 50],
    inspectInfo: "Các viên nén màu hồng neon, xanh dương và cam dập nổi logo hình khiên và khiên vương miện sắc sảo."
  },
  {
    id: "heroin",
    name: "Heroin",
    subtitle: "Diacetylmorphine - Đệ nhất độc chất tàn phá xã hội",
    category: "Chất bán tổng hợp opioid cực độc",
    description: "Heroin được tổng hợp bằng cách acetyl hóa morphine tự nhiên. Tồn tại dưới dạng bột mịn màu trắng ngà hoặc nâu xám (Heroin số 4), tan nhanh trong máu và vượt qua hàng rào máu não chỉ trong 7 giây.",
    effects: [
      "Nghiện tức thì: Khả năng gây nghiện tâm lý và thể xác chỉ sau 1 đến 2 lần thử đầu tiên.",
      "Lây nhiễm HIV/Viêm gan: Con đường tiêm chích chung kim truyền nhiễm đại dịch HIV, viêm gan B, C.",
      "Sốc thuốc tử vong: Ngừng tim ngừng thở đột ngột khi nồng độ thuốc vượt ngưỡng dung nạp."
    ],
    warning: "Kẻ hủy diệt tàn khốc nhất đối với giống nòi, đạo đức và cuộc sống gia đình người nghiện!",
    position: { x: -5.35, y: 1.14, z: 1.25 },
    cabinetId: "cabinet_left",
    row: "upper",
    audioText: "Heroin là bóng ma kinh hoàng nhất trong lịch sử các chất ma túy. Khi vào cơ thể, nó biến đổi thành morphine bám chặt vào các thụ thể mu-opioid ở cuống não. Người dùng đánh mất toàn bộ lương tri, công ăn việc làm, danh dự nhân phẩm chỉ để kiếm tiền phục vụ cho các cữ thuốc ngày càng dày đặc. Tỷ lệ tái nghiện của heroin lên tới trên 90 phần trăm nếu không có sự can thiệp y tế và pháp luật nghiêm ngặt.",
    waveform: [30, 50, 70, 40, 85, 60, 75, 40, 95, 50, 30, 60, 80, 45, 70, 55, 85, 35, 20, 45],
    inspectInfo: "Bột mịn màu trắng ngà ép thành khối vuông vức bọc nhiều lớp nylon chống ẩm, kèm mẫu thử phản ứng Marquis."
  },

  // --- HÀNG DƯỚI (Tủ 1 - 6 Mẫu: Bậc thấp Y = 0.92m, hướng ra lối đi X = -4.55m) ---
  {
    id: "ketamine",
    name: "Ketamine",
    subtitle: "Dung dịch gây mê phân ly & dạng bột 'Ke/Khay'",
    category: "Chất phân ly & gây mê điều chế",
    description: "Ketamine hydrochloride vốn là thuốc gây mê trong phẫu thuật. Khi bị lạm dụng, đối tượng hít dạng bột ('xào ke') để rơi vào trạng thái 'K-hole' - tách rời tâm trí khỏi thể xác.",
    effects: [
      "Hệ tiết niệu: Hoại tử và co teo bàng quang nghiêm trọng (bàng quang ketamine), tiểu ra máu đau đớn, phải đeo túi nước tiểu nhân tạo suốt đời.",
      "Trí nhớ: Mất trí nhớ phân ly trầm trọng, suy thoái nhận thức tương đương bệnh nhân Alzheimer.",
      "Hô hấp: Co thắt thanh quản cấp tính, trào ngược dịch dạ dày gây sặc tử vong."
    ],
    warning: "Tàn phá bàng quang vĩnh viễn, biến người trẻ tuổi thành phế nhân tiểu tiện không tự chủ!",
    position: { x: -4.55, y: 0.92, z: -3.75 },
    cabinetId: "cabinet_left",
    row: "lower",
    audioText: "Bạn đang nhìn vào mẫu vật Ketamine, thường được dân chơi gọi là Khay hoặc Ke. Tác hại đặc trưng kinh hoàng nhất của Ketamine là hội chứng viêm bàng quang xuất huyết mạn tính. Độc chất ăn mòn niêm mạc bàng quang khiến dung tích chứa từ 500ml co rút chỉ còn chưa đầy 50ml, người bệnh phải đi tiểu từng giọt máu buốt rát sau mỗi 10 phút và không thể chữa lành.",
    waveform: [35, 40, 65, 30, 75, 50, 60, 40, 80, 65, 35, 50, 70, 60, 75, 45, 80, 30, 20, 40],
    inspectInfo: "Lọ thủy tinh chứa dung dịch tiêm trong suốt 500mg/10ml, bên cạnh là đĩa thủy tinh phủ một lớp bột trắng mịn."
  },
  {
    id: "milk_tea_drug",
    name: "Ma túy trà sữa",
    subtitle: "Bột ma túy tổng hợp pha chế ngụy trang đồ uống",
    category: "Ma túy trá hình thế hệ mới",
    description: "Hỗn hợp bột nghiền màu xám hoặc vàng kem có mùi hương trà sữa béo ngọt nhân tạo. Thực chất là sự pha trộn tinh vi giữa Methamphetamine, Ketamine và Diazepam nhằm dụ dỗ học sinh, sinh viên.",
    effects: [
      "Ngộ độc cấp: Tác động hiệp đồng giữa chất kích thích và chất ức chế làm tim loạn nhịp, ngừng tim đột ngột.",
      "Mất kiểm soát: Làm nạn nhân mất khả năng kháng cự, dễ bị lợi dụng xâm hại tình dục.",
      "Nghiện thầm lặng: Nạn nhân bị nghiện mà không hề hay biết mình đang uống ma túy."
    ],
    warning: "Ngụy trang tinh vi thành thức uống yêu thích của giới trẻ, cực kỳ nguy hiểm trong trường học!",
    position: { x: -4.55, y: 0.92, z: -2.75 },
    cabinetId: "cabinet_left",
    row: "lower",
    audioText: "Ma túy trà sữa là thủ đoạn ngụy trang ma quái của tội phạm ma túy nhắm vào giới trẻ. Bột ma túy được tẩm hương liệu sữa bột, ca cao và hương trà, đóng gói trong các gói thiếc nhỏ in hình hoạt hình bắt mắt. Khi hòa vào nước ngọt hay trà sữa, ma túy tan biến không màu không vị khác lạ, biến nạn nhân thành con nghiện chỉ sau vài lần tụ tập bè bạn.",
    waveform: [20, 55, 70, 40, 65, 80, 60, 45, 75, 85, 50, 40, 65, 80, 55, 45, 60, 30, 25, 40],
    inspectInfo: "Gói thiếc bạc in họa tiết hoạt hình ngộ nghĩnh, bên trong chứa bột màu be có mùi thơm ngậy nồng nặc."
  },
  {
    id: "ghb",
    name: "GHB (Nước biển)",
    subtitle: "Gamma-Hydroxybutyrate - Ma túy cưỡng bức tình dục",
    category: "Chất ức chế thần kinh trung ương",
    description: "Chất lỏng trong suốt không màu, không mùi, vị hơi mặn nhẹ. Thường được gọi là 'nước biển', 'nước thần'. Đây là chất ức chế thụ thể GABA mạnh, thường bị kẻ xấu lén nhỏ vào ly đồ uống của nạn nhân trong các bữa tiệc.",
    effects: [
      "Mất trí nhớ tức thì: Xóa sạch toàn bộ ký ức trong khoảng thời gian bị đánh thuốc mê.",
      "Liệt vận động: Nạn nhân hoàn toàn bất lực không thể cử động chân tay hay kêu cứu dù ý thức mơ màng.",
      "Ức chế hô hấp: Hôn mê sâu và tử vong nhanh chóng nếu uống kèm với rượu bia."
    ],
    warning: "Vũ khí cưỡng bức tình dục nguy hiểm hàng đầu trong các vũ trường, quán bar!",
    position: { x: -4.55, y: 0.92, z: -1.75 },
    cabinetId: "cabinet_left",
    row: "lower",
    audioText: "GHB hay còn gọi là Nước Biển là chất độc nguy hiểm chuyên được tội phạm dùng để vô hiệu hóa nạn nhân. Khi nhỏ vài giọt vào ly rượu, mùi vị mặn của GHB bị cồn át hoàn toàn. Chỉ sau 15 phút, nạn nhân rơi vào trạng thái mềm nhũn cơ bắp, mất hoàn toàn khả năng phản kháng và quên sạch toàn bộ sự việc sau khi tỉnh lại, gây khó khăn lớn cho công tác điều tra.",
    waveform: [25, 40, 60, 35, 50, 70, 45, 30, 65, 55, 40, 35, 60, 50, 40, 45, 30, 25, 15, 30],
    inspectInfo: "Lọ thủy tinh màu xanh biển đậm dung tích 15ml, chứa chất lỏng sánh trong suốt không màu."
  },
  {
    id: "happy_water_liquid",
    name: "Dung dịch nước vui",
    subtitle: "Cocktail ma túy dạng lỏng đa hoạt chất",
    category: "Hỗn hợp ma túy tổng hợp thế hệ mới",
    description: "Dung dịch màu sắc rực rỡ (hồng, cam, xanh dương) được pha chế từ Ketamine, Ecstasy, Methamphetamine và Cafein. Có tác dụng kích thích cực mạnh kèm theo hưng phấn ảo giác hỗn loạn.",
    effects: [
      "Tương tác độc hại: Sự kết hợp nhiều chất kích thích gây suy tim cấp, đột tử do rung thất.",
      "Hành vi cuồng loạn: Người dùng mất nhận thức không gian thời gian, nhảy lầu hoặc bơi trên cạn.",
      "Phá hủy não: Gây thiếu máu não cục bộ, co giật toàn thân dạng động kinh liên tục."
    ],
    warning: "Tỷ lệ sốc thuốc và tử vong tức thì cực kỳ cao do độc tính đa thành phần!",
    position: { x: -4.55, y: 0.92, z: -0.75 },
    cabinetId: "cabinet_left",
    row: "lower",
    audioText: "Dung dịch nước vui là sản phẩm cocktail ma túy cực kỳ độc hại. Các băng nhóm tội phạm trộn lẫn nhiều loại tiền chất và chất ma túy khác nhau vào dung dịch cồn ngọt để bán với giá cắt cổ. Vì không thể biết chính xác nồng độ các chất trong một chai nước vui, người dùng rất dễ bị quá liều, co giật sùi bọt mép và ngừng tim trước khi kịp đưa tới bệnh viện cấp cứu.",
    waveform: [45, 70, 85, 60, 95, 75, 65, 80, 90, 70, 50, 80, 85, 65, 75, 85, 60, 40, 30, 55],
    inspectInfo: "Ống nghiệm thủy tinh chứa dung dịch màu hồng phát quang dưới ánh đèn UV, dán nhãn niêm phong tang vật."
  },
  {
    id: "bath_salts",
    name: "Ma túy muối tắm",
    subtitle: "Dẫn xuất Cathinone tổng hợp gây cuồng loạn ăn thịt người",
    category: "Chất kích thích Cathinone tổng hợp",
    description: "Synthetic Cathinones (Mephedrone, MDPV, Alpha-PVP). Có hình dạng bên ngoài giống như muối khoáng tắm bồn nên được đặt tên lóng là muối tắm. Tác động lên hệ thần kinh tương tự cocaine kết hợp methamphetamine nhưng mạnh gấp 10 lần.",
    effects: [
      "Hội chứng mê sảng kích động: Thân nhiệt tăng trên 41°C, lột trần truồng gào thét, sức mạnh cơ bắp phi thường do mất cảm giác đau.",
      "Hành vi ăn thịt người (Zombie): Ảo giác hoang tưởng khiến người dùng cắn xé mặt mũi và cơ thể người khác.",
      "Tiêu cơ vân cấp: Cơ bắp bị phân hủy, myoglobin làm tắc nghẽn ống thận dẫn đến suy thận cấp tử vong."
    ],
    warning: "Loại ma túy tạo nên các 'xác sống ăn thịt người' gây rúng động xã hội toàn cầu!",
    position: { x: -4.55, y: 0.92, z: 0.25 },
    cabinetId: "cabinet_left",
    row: "lower",
    audioText: "Muối tắm là tên gọi ngụy trang của nhóm Cathinone tổng hợp cực độc. Khi sử dụng loại ma túy này, người nghiện rơi vào cơn mê sảng kích động tột độ, cảm thấy da thịt nóng như bị thiêu đốt nên thường xé bỏ quần áo, tấn công điên cuồng cắn xé bất cứ ai xung quanh. Cảnh sát nhiều nước đã phải nổ súng trấn áp vì đối tượng hoàn toàn mất cảm giác đau đớn.",
    waveform: [40, 85, 100, 75, 90, 95, 80, 70, 95, 90, 60, 85, 100, 75, 90, 85, 70, 45, 30, 65],
    inspectInfo: "Hũ nhựa trong suốt chứa các hạt tinh thể màu trắng đục thô ráp, nắp vặn dán nhãn cảnh báo độc chất sinh học."
  },
  {
    id: "methadone",
    name: "Methadone",
    subtitle: "Chất đồng vận Opioid tổng hợp điều trị thay thế",
    category: "Opioid tổng hợp kiểm soát y tế",
    description: "Methadone hydrochloride là chất đồng vận toàn phần với thụ thể opioid nhưng có thời gian bán thải kéo dài (24-36 giờ). Được ngành y tế sử dụng trong chương trình điều trị nghiện các chất dạng thuốc phiện thay thế có kiểm soát.",
    effects: [
      "Kiểm soát cơn thèm: Cắt đứt hội chứng cai heroin mà không tạo cảm giác phê pha đột ngột.",
      "Nguy cơ quá liều: Uống quá liều chỉ định hoặc kết hợp với rượu/heroin sẽ gây suy hô hấp chết người.",
      "Quản lý ngặt nghèo: Phải uống trực tiếp dưới sự giám sát của nhân viên y tế tại cơ sở cai nghiện."
    ],
    warning: "Dược phẩm điều trị nghiện có kiểm soát đặc biệt, nghiêm cấm mua bán tàng trữ trái phép!",
    position: { x: -4.55, y: 0.92, z: 1.25 },
    cabinetId: "cabinet_left",
    row: "lower",
    audioText: "Methadone là giải pháp y tế cộng đồng giúp người nghiện heroin từng bước từ bỏ hành vi tiêm chích ma túy bất hợp pháp, giảm thiểu lây nhiễm HIV và tái hòa nhập gia đình. Tuy nhiên, methadone vẫn là một chất gây nghiện mạnh. Nếu mang ra ngoài mua bán trái phép hoặc sử dụng sai phác đồ, nó sẽ trở thành nguyên nhân gây ngộ độc và tử vong do ngừng thở.",
    waveform: [20, 30, 45, 35, 50, 40, 30, 45, 55, 40, 25, 35, 50, 45, 35, 30, 40, 25, 15, 20],
    inspectInfo: "Chai nhựa màu nâu sẫm chứa siro Methadone 10mg/ml, kèm cốc đong chia vạch mi-li-lít tiêu chuẩn y tế."
  },

  // =========================================================================
  // TỦ 2 (Phía Phải - cabinet_right): 12 MẪU VẬT
  // Nhóm 2: Thực vật tự nhiên, nấm thức thần & các chế phẩm cần sa biến tướng
  // =========================================================================

  // --- HÀNG TRÊN (Tủ 2 - 6 Mẫu: Bậc cao Y = 1.14m, lùi sát vách X = 5.35m) ---
  {
    id: "poppy_flower",
    name: "Hoa anh túc",
    subtitle: "Hoa cây thuốc phiện (Papaver somniferum)",
    category: "Thực vật tự nhiên chứa chất ma túy",
    description: "Cây anh túc nở hoa màu sắc sặc sỡ từ đỏ thắm, hồng, tím đến trắng. Dù mang vẻ đẹp quyến rũ, toàn bộ thân cây và đài hoa đều chứa các alkaloid gây nghiện chết người, là nguồn gốc của thuốc phiện và heroin.",
    effects: [
      "Pháp luật nghiêm cấm: Hành vi trồng cây thuốc phiện dù chỉ 1 cây đều vi phạm pháp luật hình sự Việt Nam.",
      "Độc tính: Phấn hoa và dịch tiết chứa morphine và codeine gây say xẩm, lơ mơ và buồn ngủ.",
      "Tác hại xã hội: Nguồn gốc của các cuộc chiến tranh thuốc phiện và thảm họa ma túy toàn cầu."
    ],
    warning: "Nghiêm cấm gieo trồng dưới mọi hình thức, bị truy cứu trách nhiệm hình sự phạt tù nghiêm khắc!",
    position: { x: 5.35, y: 1.14, z: -3.75 },
    cabinetId: "cabinet_right",
    row: "upper",
    audioText: "Trước mắt bạn là hoa cây thuốc phiện hay hoa anh túc. Cây thuốc phiện có tên khoa học là Papaver somniferum. Vẻ đẹp kiều diễm của cánh hoa đỏ rực này đã từng gieo rắc bao nỗi kinh hoàng cho nhân loại. Pháp luật Việt Nam nghiêm cấm triệt để việc gieo trồng cây thuốc phiện ở bất kỳ đâu, kể cả làm cảnh hay ngâm rượu.",
    waveform: [20, 35, 50, 60, 40, 55, 70, 50, 35, 60, 50, 40, 65, 55, 45, 35, 50, 30, 20, 25],
    inspectInfo: "Tiêu bản hoa anh túc ép khô ngâm formol trong lọ thủy tinh quang học trong suốt, nhìn rõ 4 cánh đỏ nhụy thẫm."
  },
  {
    id: "poppy_pod",
    name: "Quả anh túc",
    subtitle: "Quả nang chứa mủ thuốc phiện nguyên khai",
    category: "Thực vật tự nhiên chứa chất ma túy",
    description: "Quả cây thuốc phiện hình trứng hoặc quả lê, trên đỉnh có núm hình sao tỏa rạng. Khi quả chín bánh tẻ, đối tượng dùng dao rạch nhẹ vỏ quả để mủ trắng ứa ra, đông lại thành mủ thuốc phiện sống.",
    effects: [
      "Hàm lượng morphine cao: Mủ quả non chứa từ 10% đến 15% morphine nguyên chất.",
      "Ngộ độc ngâm rượu: Rượu ngâm quả anh túc (rượu 138) gây tổn thương gan thận cấp, nghiện ngầm.",
      "Chiết xuất ma túy: Nguyên liệu ban đầu để tinh chế morphine và bán tổng hợp heroin."
    ],
    warning: "Ngâm rượu uống là hành vi tàng trữ sử dụng chất ma túy trái phép, có thể bị xử lý hình sự!",
    position: { x: 5.35, y: 1.14, z: -2.75 },
    cabinetId: "cabinet_right",
    row: "upper",
    audioText: "Quả anh túc là bộ phận tập trung nồng độ chất gây nghiện cao nhất của cây. Nhiều người dân lầm tưởng ngâm quả thuốc phiện vào rượu sẽ bổ dương tăng lực, nhưng thực chất là đang tự đầu độc cơ thể bằng morphine và các alkaloid thô, dẫn tới suy gan, xơ gan và nghiện ngập không lối thoát.",
    waveform: [25, 45, 60, 50, 65, 75, 55, 40, 70, 60, 45, 55, 65, 50, 40, 45, 50, 30, 20, 30],
    inspectInfo: "Tiêu bản quả thuốc phiện sấy khô màu xanh xám, trên vỏ quả còn in hằn các vết khía rạch lấy mủ song song."
  },
  {
    id: "opium_resin",
    name: "Nhựa cây thuốc phiện",
    subtitle: "Thuốc phiện sống / Thuốc phiện chín (Opium)",
    category: "Chất ma túy tự nhiên",
    description: "Mủ khô thu hoạch từ quả anh túc. Thuốc phiện sống có màu nâu sẫm, mềm dẻo, mùi ngái hắc đặc trưng. Khi đun sôi lọc cặn thành thuốc phiện chín màu đen nhánh, mùi thơm khen khét khi đốt trên tẩu.",
    effects: [
      "Tàn tạ cơ thể: Gây hội chứng phù thủng thuốc phiện, da vàng bủng, mắt lờ đờ trũng sâu.",
      "Hủy hoại ý chí: Người nghiện mất hết động lực sống, chỉ nằm ôm bàn đèn hút thuốc phiện.",
      "Lão hóa sớm: Rụng răng, suy giảm sinh dục, teo cơ và tuổi thọ suy giảm nghiêm trọng."
    ],
    warning: "Gông cùm đầu độc lịch sử dân tộc suốt hàng thế kỷ, bị cấm tuyệt đối theo luật pháp!",
    position: { x: 5.35, y: 1.14, z: -1.75 },
    cabinetId: "cabinet_right",
    row: "upper",
    audioText: "Nhựa thuốc phiện là chất ma túy có lịch sử tàn phá cổ xưa nhất. Người hút thuốc phiện phải dùng bàn đèn, tiêm đèn đốt nóng viên nhựa để hút khói qua tẩu dài. Thuốc phiện bào mòn sinh lực nhanh chóng, biến người khỏe mạnh thành những bóng ma tiều tụy nằm chờ cữ hút, mở đường cho nạn buôn bán ma túy toàn cầu.",
    waveform: [30, 40, 55, 45, 60, 50, 35, 65, 75, 50, 35, 45, 60, 55, 40, 35, 45, 25, 20, 25],
    inspectInfo: "Khối nhựa dẻo quánh màu nâu đen đóng bánh tròn, bọc ngoài bằng giấy bóng kính phong ấn dấu tang vật."
  },
  {
    id: "coca_leaf",
    name: "Lá coca",
    subtitle: "Lá cây Erythroxylum coca vùng Andes",
    category: "Thực vật tự nhiên chứa chất ma túy",
    description: "Lá cây bụi có nguồn gốc Nam Mỹ, màu xanh lục bóng, có hai đường gân phụ song song với gân chính. Lá chứa alkaloid cocaine được chiết xuất và tinh chế thành chất ma túy kích thích nguy hiểm bậc nhất thế giới.",
    effects: [
      "Tăng huyết áp kịch phát: Kích thích tim đập dữ dội, dễ đứt mạch máu não.",
      "Nguồn gốc ma túy xuyên quốc gia: Nguyên liệu cơ bản nuôi sống các băng đảng ma túy khét tiếng.",
      "Gây lệ thuộc: Gây kích thích tâm thần vận động và suy sụp khi hết tác dụng."
    ],
    warning: "Cây trồng ngoại lai cấm nhập khẩu, gieo trồng và lưu hành tại Việt Nam!",
    position: { x: 5.35, y: 1.14, z: -0.75 },
    cabinetId: "cabinet_right",
    row: "upper",
    audioText: "Lá coca là nguồn gốc duy nhất sản sinh ra chất ma túy Cocaine. Để chiết xuất được một kilôgam cocaine nguyên chất, các nghiệp đoàn tội phạm phải tiêu tốn hàng trăm kilôgam lá coca tươi kết hợp với xăng, axit sunfuric và hóa chất tẩy rửa công nghiệp cực độc. Việc du nhập lá coca vào Việt Nam bị nghiêm cấm hoàn toàn.",
    waveform: [20, 35, 45, 55, 65, 50, 40, 60, 70, 55, 40, 50, 65, 60, 45, 40, 50, 30, 20, 20],
    inspectInfo: "Tiêu bản lá sấy khô màu xanh ô-liu hình bầu dục thon dài, nổi rõ hai đường gân phụ cong dọc thân lá."
  },
  {
    id: "cannabis_fresh",
    name: "Lá cần sa tươi",
    subtitle: "Lá cây Cannabis sativa xẻ 7-9 thùy răng cưa",
    category: "Thực vật tự nhiên chứa chất ma túy",
    description: "Cây cần sa (Gai dầu / Bồ đà) có lá kép chân vịt gồm 5 đến 9 lá chét hẹp thuôn dài, mép có răng cưa rất nhọn và đều đặn. Lá tiết ra chất nhựa chứa Tetrahydrocannabinol (THC) gây ảo giác và biến đổi nhận thức.",
    effects: [
      "Biến đổi nhận thức: Gây ảo thị, bóp méo cảm giác về không gian và thời gian.",
      "Khai mở nghiện ngập (Gateway drug): Cầu nối dẫn dắt người dùng tiến tới sử dụng ma túy đá và heroin.",
      "Hội chứng vô cảm: Mất hứng thú học tập, mất trí nhớ ngắn hạn và sa sút trí tuệ ở thanh thiếu niên."
    ],
    warning: "Mầm mống lôi kéo giới trẻ sa đà vào con đường nghiện ngập, vi phạm pháp luật!",
    position: { x: 5.35, y: 1.14, z: 0.25 },
    cabinetId: "cabinet_right",
    row: "upper",
    audioText: "Hình ảnh chiếc lá cần sa 7 ngón thường bị các đối tượng xấu lãng mạn hóa trên mạng xã hội như một loại thảo dược vô hại. Tuy nhiên, y học đã chứng minh chất THC trong cần sa phá hủy các liên kết thần kinh ở não bộ đang phát triển của người trẻ, làm giảm chỉ số IQ vĩnh viễn và là cánh cửa mở đường dẫn tới các chất ma túy nguy hiểm hơn.",
    waveform: [30, 45, 60, 50, 70, 80, 65, 50, 75, 70, 55, 60, 75, 65, 50, 45, 55, 35, 25, 35],
    inspectInfo: "Tiêu bản lá tươi ép phẳng giữa hai lớp kính mica trong suốt, giữ nguyên màu xanh diệp lục và mép răng cưa sắc nét."
  },
  {
    id: "cannabis_dry",
    name: "Cần sa khô",
    subtitle: "Búp và ngọn hoa cần sa sấy khô ép bánh ('Tài mà')",
    category: "Thực vật tự nhiên chế biến ma túy",
    description: "Phần búp hoa cái và lá ngọn chứa nồng độ THC cao nhất được sấy khô, ép thành từng bánh hoặc vụn nhỏ màu xanh nâu xám, mùi khét nồng đặc trưng giống cỏ cháy khi đốt.",
    effects: [
      "Tổn thương phổi: Khói cần sa chứa lượng chất gây ung thư và hắc ín cao gấp 4 lần khói thuốc lá điếu.",
      "Khởi phát tâm thần phân liệt: Tăng gấp 5 lần nguy cơ phát bệnh tâm thần phân liệt ở người có tiền sử gen.",
      "Suy giảm khả năng lái xe: Phản xạ chậm chạp gây tai nạn giao thông thảm khốc."
    ],
    warning: "Nhiều đối tượng trẻ tuổi bị lôi kéo sử dụng 'cỏ', 'bồ đà' dẫn tới hoang tưởng tâm thần!",
    position: { x: 5.35, y: 1.14, z: 1.25 },
    cabinetId: "cabinet_right",
    row: "upper",
    audioText: "Cần sa khô hay còn gọi là Tài Mà, Bồ Đà thường được quấn thành điếu thuốc hoặc nhồi vào boong tẩu để hút. Khói cần sa bay xa có mùi khét nồng rất dễ nhận biết. Hút cần sa thường xuyên gây nghiện tâm lý dai dẳng, làm teo thùy hồi hải mã trong não gây mất trí nhớ nghiêm trọng.",
    waveform: [25, 40, 55, 45, 65, 75, 60, 45, 70, 65, 50, 55, 70, 60, 45, 40, 50, 30, 20, 30],
    inspectInfo: "Búp cần sa khô màu nâu xanh kết dính nhiều sợi tơ nhựa óng ánh, đóng gói trong túi zip chống ẩm."
  },

  // --- HÀNG DƯỚI (Tủ 2 - 6 Mẫu: Bậc thấp Y = 0.92m, hướng ra lối đi X = 4.55m) ---
  {
    id: "cannabis_seed",
    name: "Hạt cần sa",
    subtitle: "Hạt giống cây cần sa dùng để ươm trồng bất hợp pháp",
    category: "Hạt giống cây chứa chất ma túy",
    description: "Hạt nhỏ hình bầu dục, vỏ cứng nhẵn bóng có hoa văn vân đá cẩm thạch màu nâu xám hoặc đốm đen. Thường bị các đối tượng lén lút đặt mua qua mạng Internet để trồng trọt trái phép thủy canh tại nhà.",
    effects: [
      "Hành vi phạm tội: Tàng trữ hạt giống để ươm trồng cây ma túy bị xử phạt hành chính và truy cứu hình sự.",
      "Phát tán mầm độc: Mỗi hạt giống có thể phát triển thành cây cao 2-3 mét, thu hoạch hàng kilôgam cần sa búp.",
      "Công nghệ lai tạo: Nhiều hạt giống bị biến đổi gen tạo hàm lượng THC cực cao độc tính gấp bội."
    ],
    warning: "Nghiêm cấm mua bán, vận chuyển, gieo ươm hạt cần sa qua biên giới dưới mọi hình thức!",
    position: { x: 4.55, y: 0.92, z: -3.75 },
    cabinetId: "cabinet_right",
    row: "lower",
    audioText: "Hạt cần sa thường được ngụy trang trong các gói hạt giống hoa hoặc thức ăn chim cảnh gửi qua đường bưu phẩm quốc tế. Công an phường Tân Hưng khuyến cáo người dân cảnh giác với các hội nhóm trên mạng dụ dỗ trồng cần sa tại nhà kiếm thêm thu nhập, đây là hành vi tiếp tay gieo rắc ma túy bị pháp luật trừng trị nghiêm khắc.",
    waveform: [15, 25, 35, 30, 45, 40, 30, 35, 50, 40, 25, 30, 45, 40, 30, 25, 35, 20, 15, 20],
    inspectInfo: "Đĩa petri chứa khoảng 50 hạt cần sa hình giọt nước nhỏ li ti, vỏ màu nâu nhạt điểm vân đốm đậm."
  },
  {
    id: "magic_mushroom",
    name: "Nấm thức thần",
    subtitle: "Nấm Psilocybe chứa Psilocybin & Psilocin gây ảo giác kinh hoàng",
    category: "Chất ảo giác tự nhiên nấm học",
    description: "Các loài nấm thuộc chi Psilocybe (nấm ma thuật, nấm thần kỳ). Thân nấm nhỏ dài màu trắng ngà, mũ nấm hình dù màu nâu vàng chuyển sang màu xanh lam khi bị bầm dập. Chứa hoạt chất gây ảo giác cực mạnh Psilocybin.",
    effects: [
      "Cơn ảo giác kinh hoàng (Bad trip): Tạo ra cảm giác hoảng loạn tột độ, thấy quái vật xé xác, nhảy lầu tự sát.",
      "Ngộ độc nấm cấp: Nôn mửa dữ dội, co giật, suy gan thận cấp nếu ăn nhầm nấm độc hoang dã.",
      "Rối loạn tâm thần kéo dài (HPPD): Tái hiện ảo giác kéo dài nhiều tháng sau khi ngừng sử dụng."
    ],
    warning: "Chất ma túy Bảng I có độc tính ảo giác cực mạnh, dễ gây hoang tưởng nhảy lầu tử vong!",
    position: { x: 4.55, y: 0.92, z: -2.75 },
    cabinetId: "cabinet_right",
    row: "lower",
    audioText: "Nấm thức thần đang len lỏi vào giới trẻ dưới cái mác trải nghiệm tâm linh hay mở rộng tâm trí. Thực tế, chất Psilocybin trong nấm phá vỡ hoàn toàn khả năng định hướng thực tại của não bộ. Người ăn nấm thức thần thường rơi vào những cơn ác mộng sống động, hoảng loạn tột độ nghĩ mình có thể bay lượn và bước ra ngoài cửa sổ nhà cao tầng tử vong.",
    waveform: [35, 55, 75, 50, 80, 85, 70, 60, 90, 80, 55, 65, 80, 75, 60, 50, 65, 40, 25, 45],
    inspectInfo: "Cụm nấm sấy khô gồm 3 cây nấm cuống dài mảnh khảnh màu kem, mũ nấm màu nâu vàng có ánh xanh lam đặc trưng."
  },
  {
    id: "cannabis_candy_bag",
    name: "Vỏ túi kẹo cần sa",
    subtitle: "Bao bì bắt mắt in hình lá cần sa / THC ngụy trang bánh kẹo",
    category: "Tang vật ngụy trang thực phẩm",
    description: "Bao bì túi zip nhiều màu sắc in hình kẹo dẻo hoa quả, nhân vật hoạt hình ngộ nghĩnh kèm dòng chữ nhỏ 'Contains THC' hoặc biểu tượng lá cần sa nhằm lừa dối cơ quan chức năng và thu hút trẻ em.",
    effects: [
      "Lừa mị học sinh: Thiết kế đánh lừa thị giác khiến trẻ em lầm tưởng là kẹo nhập khẩu cao cấp.",
      "Tiếp cận học đường: Phương thức thủ đoạn tinh vi đưa ma túy xâm nhập cổng trường học.",
      "Khó phát hiện: Rất khó phân biệt với bánh kẹo thông thường nếu không kiểm tra kỹ bao bì."
    ],
    warning: "Thủ đoạn nhắm trực tiếp vào trẻ em và học sinh sinh viên, phụ huynh cần hết sức cảnh giác!",
    position: { x: 4.55, y: 0.92, z: -1.75 },
    cabinetId: "cabinet_right",
    row: "lower",
    audioText: "Đây là vỏ túi kẹo cần sa tang vật thu giữ tại các vụ án buôn bán ma túy trá hình. Các đối tượng in bao bì bóng bẩy, ghi nhãn hiệu nhái theo các thương hiệu kẹo nổi tiếng thế giới. Nhiều em học sinh tò mò mua ăn chung đã bị ngộ độc tập thể phải nhập viện cấp cứu trong tình trạng khó thở, tụt huyết áp và lơ mơ.",
    waveform: [25, 40, 60, 45, 65, 55, 40, 55, 70, 65, 45, 50, 65, 60, 45, 40, 50, 30, 20, 35],
    inspectInfo: "Túi nhôm dập đáy đứng màu sắc sặc sỡ, in logo chiếc kẹo gấu hoạt hình bên cạnh biểu tượng cảnh báo THC màu đỏ."
  },
  {
    id: "cannabis_candy",
    name: "Kẹo cần sa",
    subtitle: "Kẹo dẻo Gummy chứa Tetrahydrocannabinol (THC)",
    category: "Chế phẩm thực phẩm tẩm ma túy",
    description: "Kẹo dẻo hình con gấu, con sâu hoặc hình trái cây có mùi thơm hoa quả nhân tạo, nhưng được nấu trộn tinh chất dầu cần sa THC liều lượng cao.",
    effects: [
      "Ngấm chậm gây quá liều: Tác dụng xuất hiện sau 1-2 giờ khiến nạn nhân tưởng kẹo nhẹ nên ăn nhiều viên liên tiếp.",
      "Ngộ độc cấp tính ở trẻ nhỏ: Gây co giật, suy hô hấp, hôn mê đe dọa tính mạng ở trẻ em ăn nhầm.",
      "Ảo giác hoảng loạn: Tim đập nhanh như trống ngực, khô miệng, sợ hãi tột cùng."
    ],
    warning: "Độc tố tích tụ chậm qua đường tiêu hóa, gây ngộ độc nặng nề khó kiểm soát!",
    position: { x: 4.55, y: 0.92, z: -0.75 },
    cabinetId: "cabinet_right",
    row: "lower",
    audioText: "Kẹo dẻo cần sa là một cạm bẫy cực kỳ nguy hiểm vì cơ chế hấp thụ qua đường tiêu hóa rất chậm. Người ăn thường không cảm thấy gì trong một giờ đầu nên tiếp tục ăn thêm nhiều viên. Khi toàn bộ lượng THC ngấm vào máu qua gan, nó chuyển hóa thành dạng độc tính mạnh gấp 4 lần so với hút, làm nạn nhân gục ngã vì ngộ độc cấp tính.",
    waveform: [30, 50, 70, 55, 75, 80, 60, 50, 80, 75, 50, 60, 75, 70, 55, 45, 60, 35, 25, 40],
    inspectInfo: "Các viên kẹo dẻo trong mờ hình chú gấu nhỏ màu đỏ, xanh lá và vàng xếp trên đĩa mẫu vật kiểm nghiệm."
  },
  {
    id: "cannabis_cake",
    name: "Bánh cần sa",
    subtitle: "Bánh ngọt nướng tẩm cần sa ('Space Cake' / 'Brownie')",
    category: "Chế phẩm thực phẩm tẩm ma túy",
    description: "Bánh sô-cô-la, bánh quy hoặc brownie nướng được bơ cần sa (Cannabutter) làm chất béo. Mùi thơm của sô-cô-la và bơ hoàn toàn lấn át mùi hăng của cần sa, tạo vỏ bọc hoàn hảo.",
    effects: [
      "Nồng độ THC không đồng đều: Lượng ma túy trong mỗi góc bánh khác nhau, một mẩu bánh nhỏ có thể chứa liều độc hại.",
      "Tê liệt thần kinh vận động: Cơ thể mềm nhũn, buồn nôn, chóng mặt mất thăng bằng.",
      "Nguy hiểm khi lái xe: Gây tai nạn giao thông nghiêm trọng do ảo giác chậm phản xạ."
    ],
    warning: "Loại bánh ngọt tử thần ngụy trang bán công khai tại các bữa tiệc thác loạn của giới trẻ!",
    position: { x: 4.55, y: 0.92, z: 0.25 },
    cabinetId: "cabinet_right",
    row: "lower",
    audioText: "Bánh cần sa hay Space Cake thường được tự làm hoặc đặt mua qua các hội nhóm kín trên mạng xã hội. Đối tượng chiết xuất búp cần sa vào bơ thực vật rồi dùng bơ đó nướng bánh. Một mẩu bánh nhỏ có thể đưa người dùng vào trạng thái nửa tỉnh nửa mê kéo dài suốt 12 đến 24 giờ đồng hồ, phá hủy hệ thần kinh tự chủ.",
    waveform: [25, 45, 65, 50, 70, 75, 55, 45, 75, 70, 50, 55, 70, 65, 50, 40, 55, 30, 20, 35],
    inspectInfo: "Mẩu bánh vuông màu nâu sô-cô-la đậm bề mặt nứt rạn rải vụn hạt, đặt trên giấy thấm dầu xét nghiệm độc học."
  },
  {
    id: "cannabis_oil",
    name: "Tinh dầu cần sa",
    subtitle: "Dầu lỏng cô đặc chứa THC/CBD nồng độ cực cao dùng cho Vape",
    category: "Chế phẩm tinh chế ma túy",
    description: "Dung dịch dầu sánh màu vàng hổ phách chiết xuất bằng dung môi hữu cơ. Nồng độ THC có thể lên tới 70-90%, dùng để bơm vào buồng đốt thuốc lá điện tử (Pod) hoặc nhỏ giọt trực tiếp.",
    effects: [
      "Tổn thương phổi cấp (EVALI): Dầu aerosol hóa bám chặt vào phế nang phổi gây xơ hóa và suy hô hấp cấp.",
      "Sốc thuốc nhanh: Độc tính cực mạnh đưa trực tiếp vào máu qua đường hô hấp chỉ sau vài giây.",
      "Hôn mê và co giật: Người dùng ngã quỵ, sùi bọt mép ngay sau khi rít hơi thuốc lá điện tử tẩm tinh dầu."
    ],
    warning: "Nồng độ hoạt chất gây nghiện cực đậm đặc, nguyên nhân gây nhiều ca đột tử ở học sinh!",
    position: { x: 4.55, y: 0.92, z: 1.25 },
    cabinetId: "cabinet_right",
    row: "lower",
    audioText: "Tinh dầu cần sa cô đặc là biến tướng nguy hiểm hàng đầu hiện nay. Bằng công nghệ chiết xuất dung môi, nồng độ THC được cô đặc cao gấp 50 lần so với hút búp cần sa truyền thống. Khi đối tượng pha loại tinh dầu này vào thuốc lá điện tử, khói bốc ra không hề có mùi cần sa khét đặc trưng nên rất khó phát hiện trong môi trường học đường và công sở.",
    waveform: [35, 60, 80, 60, 85, 90, 70, 55, 85, 80, 60, 65, 85, 80, 65, 50, 65, 40, 30, 45],
    inspectInfo: "Lọ thủy tinh màu hổ phách dung tích 10ml kèm ống nhỏ giọt cao su, chứa chất dầu lỏng sánh màu vàng óng."
  },

  // =========================================================================
  // TỦ 3 (Phía Sau - cabinet_back): 12 MẪU VẬT
  // Nhóm 3: Ma túy ngụy trang tinh vi, bao bì trá hình & dụng cụ sử dụng trái phép
  // =========================================================================

  // --- HÀNG TRÊN (Tủ 3 - 6 Mẫu: Bậc cao Y = 1.14m, lùi sát vách Z = 6.85m) ---
  {
    id: "lsd_blotter",
    name: "Tem lưỡi LSD",
    subtitle: "Bùa lưỡi - Giấy thấm tẩm Axit Lysergic Diethylamide",
    category: "Chất gây ảo giác bán tổng hợp siêu độc lực",
    description: "LSD là chất ảo giác mạnh nhất được biết đến. Chỉ một liều siêu nhỏ bằng microgram đã đủ tẩm vào miếng giấy thấm in hình hoạt hình ngộ nghĩnh, chia thành các ô nhỏ 5x5mm để ngậm dưới lưỡi.",
    effects: [
      "Ảo giác bão táp (Trips): Biến dạng âm thanh, màu sắc, nhìn thấy không gian nhảy múa, hoang tưởng kinh dị.",
      "Hiện tượng Flashback: Tái hiện ảo giác bất ngờ nhiều năm sau khi đã cai nghiện hoàn toàn.",
      "Rối loạn tâm thần vĩnh viễn: Mất hoàn toàn ranh giới giữa bản thân và thế giới thực tại."
    ],
    warning: "Độc lực ảo giác đo bằng microgam, chỉ một con tem nhỏ đã đủ phá hủy cả một cuộc đời!",
    position: { x: -3.75, y: 1.14, z: 6.85 },
    cabinetId: "cabinet_back",
    row: "upper",
    audioText: "Tem lưỡi hay Bùa lưỡi là hình thức ngụy trang kinh điển của chất LSD. Hoạt chất này tác động lên thụ thể serotonin 5-HT2A trong não bộ, tạo ra những ảo giác đa chiều phức tạp kéo dài suốt 12 tiếng. Đáng sợ nhất là hội chứng Flashback, khi người dùng đã dừng thuốc nhiều năm nhưng bất ngờ ảo giác kinh dị tái xuất hiện khi đang lái xe hoặc làm việc, gây ra những tai nạn thảm khốc.",
    waveform: [30, 65, 90, 70, 95, 85, 60, 85, 100, 75, 50, 80, 90, 70, 85, 90, 60, 40, 25, 50],
    inspectInfo: "Tờ giấy thấm đục lỗ kích thước 5x5 ô vuông in hình tranh nghệ thuật vạn hoa rực rỡ, mỗi ô là một liều tem lưỡi."
  },
  {
    id: "happy_water_pouch",
    name: "Túi nylon nước vui",
    subtitle: "Gói ma túy hòa tan ngụy trang gói nước tăng lực / trà giải khát",
    category: "Ma túy trá hình bao bì thương phẩm",
    description: "Bao bì túi nilon tráng nhôm nhỏ in chữ nước ngoài như 'Crispy Fruit', 'Mango', 'Ferrari', 'Gucci' đóng gói từ 2-5 gram bột ma túy hòa tan. Dễ dàng cất giấu trong ví tiền và mang vào các tụ điểm ăn chơi.",
    effects: [
      "Hòa tan cực nhanh: Dễ lén đổ vào ly đồ uống của người khác trong quán bar mà không để lại cặn.",
      "Gây sốc thuốc tập thể: Nhiều đối tượng cùng pha chung một bình nước dẫn tới nhiều người cùng sốc thuốc một lúc.",
      "Tử vong do ngộ độc: Chứa hỗn hợp chất kích thích liều cao gây trụy tim mạch cấp."
    ],
    warning: "Chiêu bài ngụy trang nguy hiểm lừa dối thanh niên trong các cuộc vui chơi thâu đêm!",
    position: { x: -2.25, y: 1.14, z: 6.85 },
    cabinetId: "cabinet_back",
    row: "upper",
    audioText: "Gói nước vui ngụy trang là tang vật phổ biến trong các vụ triệt phá tụ điểm bay lắc của lực lượng Công an. Với vẻ ngoài không khác gì gói trà hòa tan hay gói sâm bổ dưỡng, các đối tượng mang theo người để bán với giá tiền triệu mỗi gói. Khi pha vào rượu hay nước ngọt, dung dịch đổi màu và tạo cảm giác kích thích cực độ khiến người dùng nhảy múa kiệt sức.",
    waveform: [35, 70, 85, 60, 90, 80, 55, 75, 85, 70, 50, 75, 90, 65, 80, 85, 60, 35, 25, 45],
    inspectInfo: "Túi thiếc hàn nhiệt miệng túi in nhãn hiệu Crispy Fruit màu vàng cam kèm hình quả xoài hoạt hình tươi mát."
  },
  {
    id: "heroin_lion_box",
    name: "Hộp giấy sư tử bánh heroin",
    subtitle: "Bao bì nhãn hiệu 'Song Sư Hí Cầu' (Double U-Globe Brand)",
    category: "Bao bì ma túy buôn lậu quốc tế",
    description: "Nhãn hiệu buôn lậu ma túy khét tiếng thế giới xuất phát từ vùng Tam Giác Vàng. Mỗi bánh heroin tiêu chuẩn có trọng lượng khoảng 350-375 gram, được ép chân không bọc giấy chống ẩm in hình hai con sư tử ngậm quả cầu.",
    effects: [
      "Độ tinh khiết cực cao: Heroin số 4 tinh khiết lên tới 85-90%, gây chết người chỉ với một phần nghìn liều bánh.",
      "Quy mô tội phạm có tổ chức: Tang vật của các đường dây tội phạm xuyên quốc gia buôn bán hàng ngàn bánh.",
      "Phá hủy trật tự xã hội: Mỗi bánh heroin khi xé lẻ có thể đầu độc hàng ngàn lượt con nghiện."
    ],
    warning: "Tội phạm vận chuyển từ 1 bánh heroin trở lên đối diện mức án cao nhất là TỬ HÌNH!",
    position: { x: -0.75, y: 1.14, z: 6.85 },
    cabinetId: "cabinet_back",
    row: "upper",
    audioText: "Bao bì Song Sư Hí Cầu với hình tượng hai con sư tử vờn quả địa cầu là biểu tượng chết chóc của các trùm ma túy vùng Tam Giác Vàng. Khối bánh hình chữ nhật này chứa lượng heroin có thể chia thành hàng ngàn tép nhỏ. Luật Phòng chống ma túy và Bộ luật Hình sự Việt Nam quy định mức án tử hình đối với các đối tượng vận chuyển, mua bán bánh heroin ở quy mô thương mại.",
    waveform: [20, 45, 65, 40, 80, 60, 70, 45, 90, 55, 30, 60, 75, 50, 70, 60, 80, 35, 20, 40],
    inspectInfo: "Khối chữ nhật ép chặt kích thước 15x10x3 cm bọc giấy sáp trắng, chính giữa in dấu mộc đỏ hình hai con sư tử đạp địa cầu."
  },
  {
    id: "disguised_tea_drug",
    name: "Ma túy gói trà trá hình",
    subtitle: "Ngụy trang trong túi trà hút chân không xuất xứ nước ngoài",
    category: "Thủ đoạn ngụy trang cất giấu tinh vi",
    description: "Hàng chục kilôgam ma túy đá và ketamine được các đường dây quốc tế đóng gói trong các túi trà Ô Long hút chân không màu xanh lá hoặc vàng đồng có chữ 'Guanyinwang' (Thiết Quan Âm) để qua mặt máy soi hải quan.",
    effects: [
      "Trữ lượng khủng khiếp: Mỗi gói trà ngụy trang chứa từ 1 đến 2 kilôgam ma túy tinh khiết.",
      "Đánh lừa kiểm tra: Vỏ túi dày có tráng bạc và hút chân không ngăn chặn chó nghiệp vụ đánh hơi mùi hóa chất.",
      "Phương thức vận chuyển đường bộ: Thường giấu trong thùng xe tải chở hàng nông sản xuyên biên giới."
    ],
    warning: "Thủ đoạn của các tập đoàn ma túy quốc tế bị lực lượng Cảnh sát điều tra triệt phá quyết liệt!",
    position: { x: 0.75, y: 1.14, z: 6.85 },
    cabinetId: "cabinet_back",
    row: "upper",
    audioText: "Ma túy ngụy trang trong gói trà hút chân không là thủ đoạn kinh điển của các đường dây buôn bán ma túy quy mô tấn. Bên ngoài là bao bì trà thượng hạng nhưng bên trong là tinh thể ma túy đá hoặc ketamine tinh khiết. Lực lượng Cảnh sát Điều tra tội phạm về ma túy Công an TP. Hồ Chí Minh đã nhiều lần lập chiến công xuất sắc, bóc gỡ hàng loạt chuyên án thu giữ hàng trăm gói trà tử thần này.",
    waveform: [30, 50, 75, 60, 85, 75, 55, 70, 80, 65, 45, 70, 85, 60, 75, 80, 55, 35, 25, 40],
    inspectInfo: "Gói trà hút chân không màu xanh lục ánh kim dập nổi chữ vàng, rạch một đường nhỏ để lộ tinh thể trắng sáng bên trong."
  },
  {
    id: "disguised_toothpaste",
    name: "Ma túy kem đánh răng trá hình",
    subtitle: "Tuýp kem đánh răng khoét đáy giấu ma túy vận chuyển hàng không",
    category: "Thủ đoạn cất giấu hàng không tinh vi",
    description: "Các đối tượng rạch đáy tuýp kem đánh răng thương hiệu phổ biến, rút bớt kem và nhồi vào các gói nilon chứa ma túy tổng hợp, sau đó hàn nhiệt lại đáy tuýp tinh vi hòng qua mặt lực lượng hải quan sân bay.",
    effects: [
      "Lợi dụng tiếp viên và người xách tay: Thuê mướn hoặc lừa đảo người vận chuyển hàng xách tay mang ma túy.",
      "Ngụy trang hóa học: Kem đánh răng có tính kiềm át đi một phần mùi đặc trưng của chất ma túy.",
      "Hành vi phạm tội nghiêm trọng: Vận chuyển ma túy qua đường hàng không quốc tế bị xử lý kịch khung hình phạt."
    ],
    warning: "Cảnh báo người dân tuyệt đối không nhận xách tay hàng hóa, mỹ phẩm lạ tại sân bay!",
    position: { x: 2.25, y: 1.14, z: 6.85 },
    cabinetId: "cabinet_back",
    row: "upper",
    audioText: "Vụ việc ngụy trang ma túy trong hàng trăm tuýp kem đánh răng xách tay qua đường hàng không từng gây chấn động dư luận. Tội phạm sử dụng công nghệ hàn siêu âm để niêm phong lại vỏ tuýp như hàng mới xuất xưởng. Bài học đắt giá cho mọi công dân là tuyệt đối không mang hộ đồ đạc của người lạ qua cửa khẩu sân bay để tránh vướng vào vòng lao lý.",
    waveform: [25, 40, 60, 45, 70, 60, 45, 60, 75, 65, 40, 55, 70, 60, 50, 45, 55, 30, 20, 30],
    inspectInfo: "Tuýp kem đánh răng cắt dọc thân cho thấy khoang chứa các viên thuốc lắc màu tím được bọc kỹ trong màng bọc thực phẩm."
  },
  {
    id: "drug_small_packet",
    name: "Tép nhỏ ma túy lẻ",
    subtitle: "Gói giấy bạc / vé số phân liều nhỏ lẻ cho con nghiện",
    category: "Tang vật bán lẻ ma túy đường phố",
    description: "Phương thức phân liều cổ điển tại các điểm nóng ma túy. Đối tượng dùng giấy bạc bao thuốc lá hoặc giấy vé số cắt nhỏ gấp thành từng tép hình tam giác hoặc hình chữ nhật chứa từ 0.05 đến 0.1 gram heroin hoặc ma túy đá.",
    effects: [
      "Dễ nuốt tiêu hủy tang vật: Khi bị công an kiểm tra, đối tượng nhanh chóng nuốt tép ma túy vào bụng để tẩu tán.",
      "Tạp chất độc hại: Bị trộn thêm bột thạch cao, xi măng trắng, thuốc ngủ khiến con nghiện lở loét hoại tử mạch máu.",
      "Mầm mống tội phạm đường phố: Con nghiện đi cướp giật, trộm cắp tài sản để có vài chục ngàn mua tép hút."
    ],
    warning: "Mỗi tép nhỏ ma túy là khởi đầu cho hàng loạt vụ trộm cắp, cướp giật gây mất an ninh trật tự!",
    position: { x: 3.75, y: 1.14, z: 6.85 },
    cabinetId: "cabinet_back",
    row: "upper",
    audioText: "Tép ma túy lẻ là hình ảnh quen thuộc gắn liền với tệ nạn ma túy đường phố. Để kiếm tiền mua một vài tép ma túy mỗi ngày, người nghiện sẵn sàng gây ra các vụ cướp giật tài sản, trộm cắp của người dân và gia đình. Công an phường Tân Hưng kiên quyết đấu tranh triệt xóa toàn bộ các điểm và tụ điểm bán lẻ ma túy, giữ vững bình yên cho từng con hẻm khu phố.",
    waveform: [20, 35, 50, 35, 55, 45, 30, 45, 60, 50, 35, 40, 55, 50, 40, 35, 45, 25, 15, 20],
    inspectInfo: "Khay inox chứa 10 tép ma túy nhỏ xíu gấp bằng giấy bạc thuốc lá và giấy vé số nhiều màu, kèm lưỡi lam chia thuốc."
  },

  // --- HÀNG DƯỚI (Tủ 3 - 6 Mẫu: Bậc thấp Y = 0.92m, hướng ra lối đi Z = 6.05m) ---
  {
    id: "injection_kit",
    name: "Bộ dụng cụ tiêm chích",
    subtitle: "Bơm kim tiêm, muỗng đun ma túy & dây ga-rô cao su",
    category: "Dụng cụ sử dụng ma túy trái phép",
    description: "Bộ đồ nghề tiêm chích heroin truyền thống gồm bơm tiêm nhựa dung tích 1ml, kim tiêm sắt, muỗng sắt đen nhẻm tàn thuốc dùng để hòa tan đun sôi bột ma túy với nước cất, và dây cao su thắt mạch.",
    effects: [
      "Lây nhiễm chéo đại dịch: Dùng chung kim tiêm là nguyên nhân lây lan HIV/AIDS và viêm gan C hủy hoại giống nòi.",
      "Áp-xe hoại tử mạch máu: Kim tiêm bẩn làm tắc nghẽn, xơ cứng tĩnh mạch, lở loét thối rữa tứ chi.",
      "Nguy hiểm kim tiêm bừa bãi: Con nghiện vứt kim tiêm đã qua sử dụng nơi công cộng đe dọa người dân vô tội."
    ],
    warning: "Cái chết rình rập từ những mũi kim tiêm truyền nhiễm mầm bệnh thế kỷ HIV/AIDS!",
    position: { x: -3.75, y: 0.92, z: 6.05 },
    cabinetId: "cabinet_back",
    row: "lower",
    audioText: "Bộ dụng cụ tiêm chích ma túy là bằng chứng đau xót về sự tha hóa của con nghiện. Chiếc muỗng sắt bị ngọn lửa quẹt gas hun đen dùng để đun bột heroin, chiếc bơm tiêm cùn rỉ được dùng đi dùng lại nhiều lần. Không ít người đã phải trả giá bằng cả tính mạng khi vô tình dẫm phải kim tiêm bị vứt bỏ bừa bãi tại các bãi đất trống, công viên.",
    waveform: [25, 40, 55, 40, 65, 50, 35, 55, 70, 50, 30, 45, 60, 55, 40, 35, 50, 25, 20, 30],
    inspectInfo: "Bơm kim tiêm y tế loại 1cc nắp cam, muỗng kim loại ám muội đen và đoạn dây ga-rô cao su y tế màu vàng."
  },
  {
    id: "meth_pipe_handmade",
    name: "Nỏ tự chế chơi ma túy đá",
    subtitle: "Bình hút ma túy đá tự chế từ chai nước ngọt & cóng thủy tinh",
    category: "Dụng cụ sử dụng ma túy trái phép",
    description: "Dụng cụ dùng để đốt hút methamphetamine ('chơi đá'). Gồm một bình nước bằng chai nhựa có cắm 2 ống hút nhựa và một 'cóng' hay 'nỏ' thủy tinh có bầu tròn chứa tinh thể đá để đốt bằng quẹt khò gas.",
    effects: [
      "Bỏng đường hô hấp: Khói methamphetamine nóng làm bỏng niêm mạc họng, thanh quản và phế nang phổi.",
      "Hội chứng ngáo đá tức thì: Đốt hút trực tiếp đưa chất kích thích lên não trong 5 giây, kích hoạt cơn cuồng loạn.",
      "Dễ chế tạo: Con nghiện tận dụng mọi chai lọ phế thải để tự chế đồ chơi ma túy tại các nhà trọ, khách sạn."
    ],
    warning: "Dụng cụ trực tiếp tiếp tay tạo ra những đối tượng 'ngáo đá' nguy hiểm cho xã hội!",
    position: { x: -2.25, y: 0.92, z: 6.05 },
    cabinetId: "cabinet_back",
    row: "lower",
    audioText: "Đây là bình nỏ tự chế chơi ma túy đá thường bị phát hiện tại các tụ điểm bay lắc. Khói tinh thể ma túy đá được dẫn qua bình nước lọc để làm mát trước khi rít sâu vào phổi. Người sử dụng loại bình này thường tụ tập thâu đêm suốt sáng, sau đó rơi vào trạng thái ngáo đá mất kiểm soát, cầm dao truy sát người thân trong ảo giác cuồng loạn.",
    waveform: [35, 65, 80, 55, 85, 75, 50, 75, 90, 70, 45, 70, 85, 65, 75, 80, 55, 35, 25, 45],
    inspectInfo: "Bình nhựa có chứa nước màu đục gắn ống hút nhựa màu đỏ và ống thủy tinh uốn cong có bầu tròn ám khói đen."
  },
  {
    id: "cannabis_glass_pipe",
    name: "Cóng thủy tinh chơi cần sa",
    subtitle: "Tẩu thủy tinh chuyên dụng đốt hút cần sa ('Boong / Tẩu')",
    category: "Dụng cụ sử dụng ma túy trái phép",
    description: "Tẩu hút làm bằng thủy tinh chịu nhiệt nhiều màu sắc hoa văn nghệ thuật (Glass bong / Spoon pipe). Có phễu nạp búp cần sa và lỗ thông khí để người hút điều chỉnh luồng khói.",
    effects: [
      "Lôi cuốn thẩm mỹ độc hại: Tẩu được thiết kế bắt mắt như đồ lưu niệm nghệ thuật để dụ dỗ thanh thiếu niên sưu tầm.",
      "Độc tố khói đặc: Tẩu thủy tinh gom khói đậm đặc làm tổn thương khí quản và phổi nghiêm trọng hơn hút thông thường.",
      "Tàng trữ trái phép: Bị coi là công cụ phạm tội liên quan đến hành vi tổ chức sử dụng ma túy."
    ],
    warning: "Vỏ bọc đồ chơi nghệ thuật nguy hiểm lôi kéo giới trẻ bước vào con đường nghiện ngập!",
    position: { x: -0.75, y: 0.92, z: 6.05 },
    cabinetId: "cabinet_back",
    row: "lower",
    audioText: "Cóng và tẩu thủy tinh chơi cần sa được các đối tượng quảng cáo rầm rộ trên mạng dưới danh nghĩa phụ kiện thời trang sành điệu. Với màu sắc bắt mắt và kiểu dáng cách điệu, chúng tạo cho giới trẻ ảo tưởng rằng việc hút cần sa là một lối sống sành điệu, trong khi thực chất đang trực tiếp đầu độc hệ hô hấp và thần kinh của chính mình.",
    waveform: [25, 45, 60, 45, 65, 55, 40, 55, 70, 60, 40, 50, 65, 60, 45, 40, 50, 30, 20, 30],
    inspectInfo: "Tẩu thủy tinh xoắn màu xanh ngọc bích dài 12cm có miệng hút vát chéo và bầu đốt ám vết nhựa cháy sẫm."
  },
  {
    id: "powder_drug_kit",
    name: "Bộ dụng cụ chơi ma túy dạng bột",
    subtitle: "Gương soi, thẻ nhựa quẹt ke & ống hút hít Ketamine / Cocaine",
    category: "Dụng cụ sử dụng ma túy trái phép",
    description: "Bộ công cụ 'xào ke' đặc trưng trong các phòng karaoke, quán bar. Bao gồm một tấm gương hoặc đĩa sứ phẳng, thẻ ngân hàng/thẻ căn cước dùng để nghiền và chia thành các đường kẻ ma túy ('line'), và ống hút cuộn từ tờ tiền.",
    effects: [
      "Thủng vách ngăn mũi: Hít bột ma túy làm co mạch và hoại tử mô sụn, thủng vách ngăn mũi vĩnh viễn.",
      "Viêm xoang hoại tử: Hạt bột ma túy ăn mòn hốc xoang, gây viêm xoang xuất huyết mủ mạn tính.",
      "Tổ chức sử dụng trái phép: Tang vật quan trọng cấu thành tội Tổ chức sử dụng trái phép chất ma túy."
    ],
    warning: "Biểu tượng thác loạn của các 'dân chơi', để lại biến chứng thủng vách ngăn mũi tàn phế!",
    position: { x: 0.75, y: 0.92, z: 6.05 },
    cabinetId: "cabinet_back",
    row: "lower",
    audioText: "Đây là bộ dụng cụ 'xào ke' thu giữ tại các phòng bay lắc cách âm. Đối tượng dùng lửa hơ nóng đĩa sứ để làm khô ketamine, sau đó dùng thẻ nhựa miết nát thành bột mịn rồi chia thành các đường kẻ thẳng để hít qua mũi. Bột hóa chất ăn mòn mạch máu niêm mạc mũi, sau một thời gian vách ngăn giữa hai lỗ mũi sẽ bị thủng toang hoác không thể phục hồi.",
    waveform: [30, 50, 70, 50, 80, 70, 50, 65, 80, 65, 45, 60, 75, 65, 50, 45, 55, 30, 20, 35],
    inspectInfo: "Tấm gương soi nhỏ hình chữ nhật kèm chiếc thẻ nhựa cứng màu đen và tờ tiền cuộn tròn thành ống hút."
  },
  {
    id: "vape_pod",
    name: "Thuốc lá điện tử (Pod/Vape)",
    subtitle: "Thiết bị nung dung dịch điện tử bị biến tướng tẩm ma túy học đường",
    category: "Thiết bị biến tướng thế hệ mới",
    description: "Thiết bị điện tử cầm tay sử dụng pin sạc để nung nóng cuộn coil biến tinh dầu hóa lỏng thành hơi khí dung (aerosol). Bị các đối tượng xấu tẩm ướp ma túy tổng hợp mới, cần sa tổng hợp (cỏ Mỹ) để bán cho học sinh sinh viên.",
    effects: [
      "Ngộ độc ma túy học đường: Học sinh sau khi rít thuốc lá điện tử ngất xỉu, co giật, khó thở hàng loạt.",
      "Tổn thương phổi cấp tính (EVALI): Hơi kim loại nặng từ dây đốt làm xơ hóa phổi không thể cứu chữa.",
      "Gây nghiện nicotine cực nặng: Nồng độ nicotine muối cao gấp nhiều lần thuốc lá truyền thống tàn phá não bộ trẻ."
    ],
    warning: "Hiểm họa hàng đầu đe dọa học đường hiện nay, cấm học sinh sử dụng dưới mọi hình thức!",
    position: { x: 2.25, y: 0.92, z: 6.05 },
    cabinetId: "cabinet_back",
    row: "lower",
    audioText: "Thuốc lá điện tử đang là mối hiểm họa nhức nhối nhất trong các trường học hiện nay. Núp bóng các mùi hương hoa quả ngọt ngào, thuốc lá điện tử thường xuyên bị tội phạm tẩm ướp các chất ma túy tổng hợp thế hệ mới cực độc. Nhiều em học sinh sau khi thử một hơi đã bị ngất xỉu, co giật sùi bọt mép và phải thở máy điều trị tích cực tại bệnh viện.",
    waveform: [40, 75, 90, 65, 90, 85, 60, 80, 95, 75, 55, 80, 90, 70, 80, 85, 65, 40, 25, 50],
    inspectInfo: "Thanh thiết bị Pod nhỏ gọn màu xám không gian, cổng sạc Type-C ở đuôi và đầu ngậm dẹt trong suốt nhìn rõ tinh dầu."
  },
  {
    id: "etomidate_pod",
    name: "Etomidate (Pod Chill)",
    subtitle: "Thuốc gây mê tẩm trong thuốc lá điện tử gây ảo giác & co giật",
    category: "Hóa chất ma túy thế hệ mới tẩm Pod",
    description: "Etomidate là thuốc gây mê tiêm tĩnh mạch tác dụng ngắn. Các đối tượng pha lậu chất này vào tinh dầu thuốc lá điện tử với tên gọi 'Pod Chill', 'Pod ma túy' để tạo cảm giác 'phê đơ', mất tri giác tạm thời và cười ngặt nghẽo.",
    effects: [
      "Ức chế vỏ thượng thận: Phá hủy khả năng sản xuất hormone cortisol của cơ thể, gây suy tuyến thượng thận cấp tử vong.",
      "Co giật cơ kiểu động kinh: Người dùng bị giật cơ toàn thân, mắt trợn ngược, run rẩy bần bật mất kiểm soát.",
      "Hôn mê sâu đột ngột: Tim đập chậm, ngừng thở chỉ sau vài giây rít hơi khói thuốc lá điện tử."
    ],
    warning: "Thuốc mê cực độc giết người thầm lặng dưới vỏ bọc 'Pod Chill' thư giãn của giới trẻ!",
    position: { x: 3.75, y: 0.92, z: 6.05 },
    cabinetId: "cabinet_back",
    row: "lower",
    audioText: "Pod Chill thực chất là cạm bẫy chứa hoạt chất thuốc mê Etomidate hoặc cần sa tổng hợp. Người bán quảng cáo dối trá rằng đây là tinh dầu thảo dược giúp giảm căng thẳng, nhưng khi học sinh sử dụng, chất thuốc mê đánh gục não bộ gây ra những cơn co giật kinh giật, ức chế tuyến thượng thận đe dọa trực tiếp đến tính mạng. Đừng bao giờ chạm tay vào những điếu thuốc lá điện tử tử thần này.",
    waveform: [45, 80, 95, 70, 95, 90, 65, 85, 100, 80, 60, 85, 95, 75, 85, 90, 65, 45, 30, 55],
    inspectInfo: "Đầu cartridge Pod trong suốt dán tem dạ quang chữ Chill Pod, chứa dung dịch màu vàng chanh đậm đặc bốc mùi nồng."
  }
];

// 4 Áp phích tuyên truyền phòng chống ma túy chính thức của Công an
export const postersData = [
  {
    id: "poster1",
    title: "Hiểm họa ma túy",
    subtitle: "MA TÚY - HIỂM HỌA HỦY DIỆT CUỘC ĐỜI",
    description: "Áp phích tuyên truyền của lực lượng Công An nhân dân cảnh báo hiểm họa hủy diệt cuộc đời, tương lai của ma túy.",
    imageUrl: "/posters/poster1.jpg",
    position: { x: -11.86, y: 2.2, z: -3 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    impactText: "Ma túy là cái bẫy tử thần phá hủy sức khỏe, nhân cách và tương lai, chỉ một lần thử cũng có thể phải trả giá cả cuộc đời."
  },
  {
    id: "poster2",
    title: "Hãy nói không với ma túy",
    subtitle: "VÌ MỘT TƯƠNG LAI TƯƠI SÁNG",
    description: "Áp phích cổ động thế hệ trẻ kiên quyết nói không với ma túy, lựa chọn con đường sống lành mạnh vì tương lai.",
    imageUrl: "/posters/poster2.jpg",
    position: { x: -11.86, y: 2.2, z: 2.5 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    impactText: "Hãy chọn cuộc sống lành mạnh, gia đình hạnh phúc, học tập tốt, hướng tới tương lai rực rỡ và tuân thủ pháp luật."
  },
  {
    id: "poster3",
    title: "Pháp luật phòng chống ma túy",
    subtitle: "PHÒNG, CHỐNG MA TÚY VÀ TỆ NẠN XÃ HỘI",
    description: "Tuyên truyền thực thi Luật Phòng, chống ma túy, quyết tâm xây dựng địa bàn dân cư, học đường trong sạch.",
    imageUrl: "/posters/poster3.jpg",
    position: { x: 11.86, y: 2.2, z: -3 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    impactText: "Căn cứ Luật Phòng, chống ma túy. Kiên quyết đấu tranh, bài trừ tội phạm ma túy và giữ vững bình yên khu phố."
  },
  {
    id: "poster4",
    title: "Lựa chọn tương lai",
    subtitle: "CUỘC SỐNG HẠNH PHÚC HOẶC HIỂM HỌA HIV/AIDS",
    description: "Thông điệp tương phản sâu sắc giữa cuộc sống tươi đẹp hạnh phúc và thảm kịch tăm tối do ma túy gây ra.",
    imageUrl: "/posters/poster4.jpg",
    position: { x: 11.86, y: 2.2, z: 2.5 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    impactText: "Chọn cuộc sống hạnh phúc, lao động và học tập giúp ích cho xã hội - Kiên quyết tránh xa ma túy và hiểm họa bệnh tật."
  }
];

// Bộ câu hỏi trắc nghiệm kiểm tra kiến thức phòng chống ma túy
export const questionsData = [
  {
    question: "Mỗi tủ trưng bày mẫu vật nghiệp vụ phòng chống ma túy được sắp xếp theo quy cách nào?",
    options: [
      "12 mẫu vật xếp thành 1 hàng ngang duy nhất",
      "12 mẫu vật sắp xếp theo 2 tầng: 6 mẫu hàng trên và 6 mẫu hàng dưới để không bị che khuất tầm nhìn",
      "Tùy ý không theo quy chuẩn",
      "Chỉ gồm 6 mẫu vật mỗi tủ"
    ],
    answer: 1,
    explain: "Quy chuẩn tủ trưng bày nghiệp vụ được thiết kế 2 bậc bục thang: 6 mẫu hàng trên nâng cao lùi sâu, 6 mẫu hàng dưới thấp hơn hướng ra lối đi, giúp người tham quan quan sát trọn vẹn toàn bộ 12 hiện vật."
  },
  {
    question: "Chất nào bị kẻ xấu ngụy trang dưới tên gọi 'Nước biển' chuyên dùng để cưỡng bức và gây mê xóa ký ức nạn nhân?",
    options: ["Heroin", "GHB (Gamma-Hydroxybutyrate)", "Ketamine", "Cocaine"],
    answer: 1,
    explain: "GHB là chất ức chế thần kinh trung ương mạnh, không màu không mùi vị hơi mặn, thường bị kẻ xấu lén nhỏ vào đồ uống để xóa sạch ký ức và làm nạn nhân liệt vận động."
  },
  {
    question: "Ma túy đá (Methamphetamine) tàn phá hệ thần kinh và gây ảo giác 'ngáo đá' nguy hại bằng cơ chế sinh học nào?",
    options: [
      "Gây buồn ngủ sâu ức chế hô hấp",
      "Kích hoạt giải phóng ồ ạt Dopamine vượt ngưỡng tự nhiên hàng chục lần, hoại tử tế bào não thùy trán",
      "Tăng lượng tuần hoàn hồng cầu",
      "Ức chế tuyến thượng thận bài tiết hormon adrenaline"
    ],
    answer: 1,
    explain: "Methamphetamine kích hoạt giải phóng dopamine vượt ngưỡng tự nhiên hàng chục lần, tạo ảo giác quyền lực giả tạo và chứng hoang tưởng ngáo đá điên cuồng, trực tiếp làm teo hoại tế bào não thùy trán."
  },
  {
    question: "Loại thuốc gây mê nào đang bị tội phạm ma túy pha lậu vào thuốc lá điện tử dưới tên gọi 'Pod Chill' gây co giật và suy tuyến thượng thận?",
    options: ["Etomidate", "Paracetamol", "Aspirin", "Vitamin C"],
    answer: 0,
    explain: "Etomidate là thuốc gây mê tác dụng ngắn, bị tẩm lậu vào thuốc lá điện tử với cái tên Pod Chill để gây phê đơ, ảo giác và co giật nguy hiểm đến tính mạng học sinh."
  },
  {
    question: "Lạm dụng Ketamine (Ke/Khay) gây ra tổn thương thực thể tàn khốc vĩnh viễn không thể đảo ngược đối với cơ quan nào?",
    options: ["Hệ tiêu hóa", "Hệ tiết niệu (Bàng quang co teo hoại tử, tiểu ra máu)", "Hệ cơ xương khớp", "Hệ hô hấp cấp"],
    answer: 1,
    explain: "Ketamine phá hủy nghiêm trọng tế bào niêm mạc bàng quang, gây viêm bàng quang xuất huyết, xơ hóa và teo bàng quang cực độ khiến bệnh nhân đau đớn dữ dội và phải mang túi nước tiểu nhân tạo suốt đời."
  }
];
