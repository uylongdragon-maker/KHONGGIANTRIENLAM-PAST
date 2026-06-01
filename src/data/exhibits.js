// Detailed exhibits and posters database for the 3D Anti-Drug Exhibition
// 30 specimens distributed across 3 large display tables:
// Table 1 (Left): Opioids & Depressants (10 specimens)
// Table 2 (Right): Stimulants (10 specimens)
// Table 3 (Back): Hallucinogens & Dissociatives (10 specimens)

export const exhibitsData = [
  // --- TABLE 1: OPIOIDS & DEPRESSANTS (Left Table: X = -3.0, Z runs from -4.5 to 1.8) ---
  {
    id: "heroin",
    name: "Heroin",
    subtitle: "Chất bán tổng hợp cực độc từ thuốc phiện",
    category: "Chất bán tổng hợp opioid",
    description: "Heroin là chất bột màu trắng hoặc xám nâu. Nó bám chặt vào các thụ thể opioid trong não bộ, gây nghiện cực nhanh và tàn phá cơ thể nghiêm trọng.",
    effects: [
      "Hệ thần kinh: Gây hoại tử tế bào thần kinh, suy giảm trí nhớ kéo dài.",
      "Hệ hô hấp: Ức chế trung tâm hô hấp ở hành tủy gây ngừng thở tử vong.",
      "Hệ thống miễn dịch: Suy kiệt miễn dịch, tăng tối đa nguy cơ nhiễm trùng."
    ],
    warning: "Gây nghiện cực mạnh ngay từ lần sử dụng đầu tiên!",
    position: { x: -3.0, y: 0.9, z: -4.5 },
    cabinetId: "cabinet_left",
    audioText: "Bạn đang đứng trước tiêu bản Heroin. Đây là chất ma túy bán tổng hợp cực kỳ nguy hiểm, được điều chế từ morphine chiết xuất từ nhựa cây thuốc phiện. Heroin tác động trực tiếp lên hệ thần kinh trung ương, tạo ra trạng thái phê pha giả tạo nhưng nhanh chóng chuyển thành sự lệ thuộc thể chất và tinh thần sâu sắc. Chỉ sau một vài lần sử dụng, cơ thể sẽ bị tàn phá toàn diện, phá hủy hệ miễn dịch và gây suy hô hấp cấp dẫn đến tử vong.",
    waveform: [20, 40, 60, 20, 80, 40, 60, 30, 90, 40, 20, 50, 70, 30, 60, 40, 80, 20, 10, 40],
    inspectInfo: "Bột mịn màu trắng ngà, đóng gói trong túi zip nylon niêm phong tang vật của cảnh sát."
  },
  {
    id: "morphine",
    name: "Morphine",
    subtitle: "Dược chất giảm đau y tế bị lạm dụng",
    category: "Chất tự nhiên opioid",
    description: "Morphine là chất chiết xuất trực tiếp từ nhựa quả thuốc phiện. Trong y tế dùng để giảm đau cấp tính cực mạnh, nhưng lạm dụng gây nghiện sâu sắc.",
    effects: [
      "Phụ thuộc thể chất: Hội chứng cai nghiện đau đớn, vật vã kinh hoàng.",
      "Hệ tim mạch: Gây hạ huyết áp cấp, loạn nhịp tim đe dọa tính mạng.",
      "Hệ tiêu hóa: Táo bón mãn tính nặng, co thắt cơ vòng túi mật."
    ],
    warning: "Chỉ được phép sử dụng dưới sự kiểm soát nghiêm ngặt của bác sĩ y khoa!",
    position: { x: -3.0, y: 0.9, z: -3.8 },
    cabinetId: "cabinet_left",
    audioText: "Morphine là một alkaloid tự nhiên của cây thuốc phiện. Dù có đóng góp to lớn trong y tế như một chất giảm đau tầng cuối, morphine lại là kẻ thù nguy hiểm khi bị lạm dụng. Sử dụng morphine ngoài mục đích điều trị sẽ dẫn tới chứng nghiện ngập nhanh chóng với cơ chế dung nạp thuốc tăng dần, đòi hỏi liều lượng ngày một cao hơn.",
    waveform: [30, 25, 40, 50, 20, 60, 45, 50, 30, 70, 20, 30, 50, 40, 60, 20, 30, 40, 20, 10],
    inspectInfo: "Ống dung dịch tiêm y tế trong suốt, dán nhãn kiểm soát đặc biệt của Bộ Y Tế."
  },
  {
    id: "codeine",
    name: "Codeine",
    subtitle: "Dược chất ho/giảm đau dễ bị sa ngã lạm dụng",
    category: "Chất tự nhiên opioid",
    description: "Codeine là hoạt chất có trong thuốc ho hoặc thuốc giảm đau nhẹ. Lạm dụng liều cao liên tục sẽ chuyển hóa thành morphine trong gan gây nghiện.",
    effects: [
      "Hệ thần kinh: Gây lờ đờ, buồn ngủ cấp tính, mất khả năng tập trung.",
      "Ức chế hô hấp: Gây khó thở, thở nông, tích tụ CO2 trong máu.",
      "Hệ tiêu hóa: Gây buồn nôn, đau dạ dày dữ dội do lạm dụng thuốc."
    ],
    warning: "Nhiều người trẻ bị nghiện Codeine từ thói quen tự ý uống siro ho liều cao!",
    position: { x: -3.0, y: 0.9, z: -3.1 },
    cabinetId: "cabinet_left",
    audioText: "Codeine thường xuất hiện trong các chai siro ho và thuốc giảm đau thông thường. Do tính phổ biến, nhiều thanh thiếu niên đã lạm dụng Codeine để pha chế các loại đồ uống kích thích có hại. Ít ai biết rằng, gan sẽ chuyển hóa Codeine thành morphine thầm lặng, trói buộc người dùng vào cơn nghiện ngập kinh hoàng.",
    waveform: [10, 20, 15, 30, 40, 25, 20, 35, 50, 30, 20, 15, 30, 40, 25, 10, 20, 30, 15, 5],
    inspectInfo: "Các viên nén thuốc Tây màu trắng dập chìm mã vạch dược phẩm, kèm vỏ hộp siro ho."
  },
  {
    id: "fentanyl",
    name: "Fentanyl",
    subtitle: "Tử thần hóa học thế hệ mới",
    category: "Chất tổng hợp opioid cực độc",
    description: "Fentanyl là chất ma túy tổng hợp mạnh gấp 50 lần heroin và 100 lần morphine. Chỉ cần 2 miligam (bằng hạt muối) đã đủ cướp đi một sinh mạng.",
    effects: [
      "Ngừng thở lập tức: Dập tắt trung tâm hô hấp chỉ sau vài giây hấp thụ.",
      "Hội chứng ngộ độc: Gây hôn mê sâu, co đồng tử tối đa (đồng tử đinh ghim).",
      "Hủy hoại ý thức: Gây ngủ li bì, mất hoàn toàn nhận thức xung quanh."
    ],
    warning: "Tử thần thế hệ mới! Một liều lượng nhỏ li ti bằng hạt bụi cũng đủ gây tử vong chớp nhoáng.",
    position: { x: -3.0, y: 0.9, z: -2.4 },
    cabinetId: "cabinet_left",
    audioText: "Chào mừng bạn đến với tiêu bản Fentanyl. Đây được coi là thảm họa ma túy tổng hợp nguy hiểm nhất hiện nay. Mạnh gấp hàng trăm lần morphine, Fentanyl lấn át các thụ thể hô hấp cực nhanh, khiến nạn nhân ngừng thở hoàn toàn trước khi kịp nhận ra điều gì xảy ra. Hàng chục ngàn ca tử vong đột ngột mỗi năm trên thế giới là lời cảnh tỉnh đanh thép nhất chống lại độc chất này.",
    waveform: [50, 70, 90, 80, 100, 90, 80, 95, 100, 70, 60, 80, 90, 70, 80, 50, 30, 60, 40, 20],
    inspectInfo: "Bột tinh thể màu trắng đục cực nhỏ đựng trong lọ thủy tinh kín niêm phong cảnh báo độc chất cao."
  },
  {
    id: "oxycodone",
    name: "Oxycodone",
    subtitle: "Thuốc giảm đau kê đơn gây bão nghiện ngập",
    category: "Chất bán tổng hợp opioid",
    description: "Oxycodone là thuốc giảm đau kê đơn bán tổng hợp dòng opioid mạnh. Nó hoạt động tương tự như heroin trong não và gây ra cơn bão nghiện ngập y tế toàn cầu.",
    effects: [
      "Hệ thần kinh: Gây hưng phấn giả tạo mạnh mẽ kèm theo chứng trầm cảm cấp.",
      "Tổn thương gan thận: Hủy hoại các tế bào nhu mô gan nếu dùng kéo dài.",
      "Suy hô hấp: Giảm thể tích thở phút, dẫn đến thiếu oxy não mãn tính."
    ],
    warning: "Lạm dụng thuốc giảm đau kê đơn là con đường ngắn nhất dẫn tới nghiện Heroin!",
    position: { x: -3.0, y: 0.9, z: -1.7 },
    cabinetId: "cabinet_left",
    audioText: "Oxycodone phản ánh mặt tối của ngành công nghiệp dược phẩm thương mại. Được tiếp thị là thuốc giảm đau an toàn, chất này đã châm ngòi cho cuộc khủng hoảng opioid tồi tệ. Khi các đơn thuốc y tế bị siết chặt, những người lệ thuộc Oxycodone buộc phải tìm đến Heroin và Fentanyl ngoài chợ đen để thay thế.",
    waveform: [25, 30, 45, 35, 50, 40, 30, 55, 60, 45, 35, 40, 50, 30, 45, 20, 25, 30, 20, 15],
    inspectInfo: "Các viên thuốc nang màu xanh ngọc đựng trong vỉ nhựa dược phẩm ghi rõ cảnh báo gây nghiện."
  },
  {
    id: "opium",
    name: "Thuốc phiện (Opium)",
    subtitle: "Nguồn gốc cổ xưa của mọi Opioid",
    category: "Chất tự nhiên tự sinh",
    description: "Thuốc phiện là nhựa khô thu hoạch từ quả cây anh túc (Papaver somniferum). Nhựa này chứa morphine, codeine và nhiều alkaloid độc hại khác.",
    effects: [
      "Hủy hoại tạng phủ: Gây suy kiệt cơ thể thần tốc, lão hóa tạng nội.",
      "Hệ tiêu hóa: Táo bón kinh niên, làm hỏng hoàn toàn nhu động ruột.",
      "Hệ sinh sản: Triệt tiêu nội tiết tố sinh dục, suy giảm nòi giống."
    ],
    warning: "Thuốc phiện chôn vùi tương lai và sinh mạng của hàng triệu người từ nhiều thế kỷ qua.",
    position: { x: -3.0, y: 0.9, z: -1.0 },
    cabinetId: "cabinet_left",
    audioText: "Thuốc phiện, hay nàng tiên nâu, là chất ma túy có lịch sử tàn phá cổ xưa nhất. Nhựa cây anh túc phơi khô chứa hỗn hợp các alkaloid cực độc. Sử dụng thuốc phiện làm suy kiệt cơ thể nhanh chóng, tước đoạt toàn bộ ý chí tự chủ, đẩy người dùng vào cuộc sống nô lệ tinh thần tối tăm.",
    waveform: [15, 25, 35, 30, 45, 40, 25, 35, 50, 40, 30, 20, 35, 30, 40, 25, 20, 30, 15, 10],
    inspectInfo: "Bánh nhựa màu đen dẻo quánh, xù xì, bốc mùi hăng đặc trưng, đặt trên đĩa nung cổ."
  },
  {
    id: "methadone",
    name: "Methadone",
    subtitle: "Chất thay thế điều trị nghiện Opioid",
    category: "Chất tổng hợp opioid",
    description: "Methadone là chất opioid tổng hợp tác dụng kéo dài. Dùng trong y tế như liệu pháp thay thế cai nghiện Heroin, giúp người nghiện cắt cơn vật vã.",
    effects: [
      "Tác dụng phụ: Gây tăng tiết mồ hôi dữ dội, táo bón, khô miệng.",
      "Tích lũy cơ thể: Gây đau nhức xương khớp sâu sắc nếu ngừng đột ngột.",
      "Nguy cơ lạm dụng: Vẫn có khả năng gây nghiện nếu tự ý tăng liều ngoài chỉ định."
    ],
    warning: "Chỉ được uống dưới sự giám sát trực tiếp tại cơ sở y tế xã hội!",
    position: { x: -3.0, y: 0.9, z: -0.3 },
    cabinetId: "cabinet_left",
    audioText: "Methadone là một công cụ y tế xã hội quan trọng. Với cơ chế tác dụng kéo dài, Methadone giúp người nghiện Heroin không rơi vào trạng thái đói thuốc vật vã, giảm động cơ phạm tội và hành vi tiêm chích chung kim tiêm nguy hiểm. Tuy nhiên, nó vẫn là một chất opioid và đòi hỏi sự giám sát chuyên môn chặt chẽ.",
    waveform: [20, 22, 28, 32, 24, 30, 35, 28, 40, 32, 26, 24, 30, 28, 32, 20, 22, 26, 18, 12],
    inspectInfo: "Chai nhựa chứa dung dịch Methadone màu hồng cánh sen đặc trưng dùng cho chương trình cai nghiện."
  },
  {
    id: "tramadol",
    name: "Tramadol",
    subtitle: "Thuốc giảm đau tổng hợp bị lạm dụng rộng rãi",
    category: "Chất tổng hợp opioid",
    description: "Tramadol là thuốc giảm đau tổng hợp tác dụng trung ương dòng opioid nhẹ hơn. Thường bị lạm dụng trái phép rộng rãi ở giới trẻ do dễ mua ngoài hiệu thuốc.",
    effects: [
      "Hệ thần kinh: Gây chóng mặt dữ dội, co giật động kinh nếu uống quá liều.",
      "Hội chứng Serotonin: Gây kích ứng, tăng thân nhiệt cơ thể nguy hiểm.",
      "Phụ thuộc tâm lý: Tạo cảm giác lệ thuộc tinh thần sâu sắc kéo dài."
    ],
    warning: "Tự ý sử dụng Tramadol liều cao để tạo ảo giác có thể châm ngòi co giật ngạt thở!",
    position: { x: -3.0, y: 0.9, z: 0.4 },
    cabinetId: "cabinet_left",
    audioText: "Tramadol là chất ma túy âm thầm ẩn náu trong tủ thuốc gia đình. Giới trẻ thường lạm dụng Tramadol liều cao để đạt trạng thái hưng phấn nhẹ. Thế nhưng quá liều Tramadol cực kỳ nguy hiểm, châm ngòi cho các cơn co giật toàn thân giống như động kinh và hội chứng độc tính Serotonin nguy kịch.",
    waveform: [12, 18, 22, 20, 30, 25, 20, 28, 35, 30, 24, 20, 25, 22, 28, 16, 18, 22, 14, 8],
    inspectInfo: "Hộp thuốc giấy chứa các viên nang cứng màu xanh-vàng dán nhãn biệt dược y tế."
  },
  {
    id: "buprenorphine",
    name: "Buprenorphine",
    subtitle: "Liệu pháp cắt cơn nghiện opioid thế hệ mới",
    category: "Chất bán tổng hợp opioid",
    description: "Buprenorphine là chất chủ vận opioid bán phần. Dùng trong điều trị cai nghiện nhờ tác dụng khóa thụ thể opioid, triệt tiêu cảm giác thèm muốn thuốc phiện.",
    effects: [
      "Hệ tim mạch: Gây chóng mặt tư thế đứng, hạ huyết áp nhẹ.",
      "Hệ thần kinh: Gây đau đầu mãn tính, rối loạn giấc ngủ tạm thời.",
      "Hội chứng cai: Gây khó chịu thể chất nhẹ khi ngắt liều điều trị."
    ],
    warning: "Hỗ trợ cắt cơn thèm ma túy vô cùng hiệu quả nếu tuân thủ lộ trình y khoa.",
    position: { x: -3.0, y: 0.9, z: 1.1 },
    cabinetId: "cabinet_left",
    audioText: "Buprenorphine là một tiến bộ y học hiện đại trong điều trị nghiện chất. Bằng cách chiếm giữ các thụ thể opioid nhưng chỉ kích hoạt một phần, nó loại bỏ cảm giác thèm nhớ Heroin mà không gây phê pha quá độ, giúp bệnh nhân tái hòa nhập cộng đồng thuận lợi.",
    waveform: [15, 17, 24, 22, 20, 28, 30, 26, 32, 28, 24, 22, 26, 24, 28, 18, 16, 20, 14, 10],
    inspectInfo: "Dạng phim mỏng ngậm dưới lưỡi đóng trong gói giấy bạc kín chuyên dụng y tế."
  },
  {
    id: "kratom",
    name: "Lá Kratom (Ketum)",
    subtitle: "Chất thảo mộc hướng thần nguy hại",
    category: "Chất tự nhiên tự sinh",
    description: "Kratom là loại lá cây nhiệt đới chứa hoạt chất mitragynine. Liều nhỏ gây kích thích, liều cao gây ức chế thần kinh tương tự thuốc phiện.",
    effects: [
      "Hệ thần kinh: Gây ảo giác hoang tưởng bị hại, kích động hung hãn.",
      "Tổn thương gan thận: Gây nhiễm độc tế bào gan mãn tính nặng.",
      "Hệ bài tiết: Bí tiểu cấp, táo bón dữ dội do ngộ độc alkaloids."
    ],
    warning: "Bị cấm tại Việt Nam và nhiều quốc gia vì nguy cơ gây nghiện tàn phá tâm thần!",
    position: { x: -3.0, y: 0.9, z: 1.8 },
    cabinetId: "cabinet_left",
    audioText: "Kratom là chất thảo mộc hướng thần tự nhiên bị lạm dụng tại Đông Nam Á. Hoạt chất mitragynine tác động kép lên cả hệ dopamine và thụ thể opioid, tạo ra sự pha trộn nguy hiểm giữa kích thích thần kinh và an thần, dẫn tới ảo giác hung hãn và suy hoại tế bào gan.",
    waveform: [18, 24, 28, 26, 35, 30, 24, 32, 40, 35, 28, 26, 30, 28, 32, 22, 20, 24, 16, 12],
    inspectInfo: "Bột lá Kratom sấy khô màu xanh rêu nghiền mịn, kèm theo lá cây tươi có gân đỏ."
  },

  // --- TABLE 2: STIMULANTS (Right Table: X = 3.0, Z runs from -4.5 to 1.8) ---
  {
    id: "meth",
    name: "Ma túy đá (Methamphetamine)",
    subtitle: "Chất kích thích hệ thần kinh cực mạnh",
    category: "Chất tổng hợp hoàn toàn",
    description: "Ma túy đá tồn tại dưới dạng tinh thể như phèn chua. Nó kích thích giải phóng ồ ạt chất dẫn truyền dopamine trong não, gây hưng phấn tột độ tạm thời nhưng tàn phá hệ thần kinh vĩnh viễn.",
    effects: [
      "Trạng thái ngáo đá: Gây ảo giác nặng, hoang tưởng bị hại dẫn đến bạo lực.",
      "Tàn phá ngoại hình: Lão hóa da, hoại tử răng miệng dữ dội (meth mouth).",
      "Tổn thương cơ quan: Gây suy thận cấp, co thắt mạch gây đột quỵ não."
    ],
    warning: "Ảo giác ngáo đá cực kỳ nguy hiểm, biến người dùng thành quái thú mất kiểm soát!",
    position: { x: 3.0, y: 0.9, z: -4.5 },
    cabinetId: "cabinet_right",
    audioText: "Bạn đang đứng trước tiêu bản Methamphetamine, thường được gọi là ma túy đá. Khác với heroin có nguồn gốc tự nhiên, ma túy đá là chất hóa học tổng hợp hoàn toàn. Nó kích hoạt não bộ giải phóng dopamine vượt ngưỡng tự nhiên hàng chục lần, tạo ra sự tỉnh táo giả tạo và hoang tưởng quyền lực. Khi hết thuốc, người dùng rơi vào trầm cảm cực độ và ảo giác 'ngáo đá', biến họ thành những mối đe dọa cực kỳ nguy hiểm cho xã hội.",
    waveform: [30, 20, 70, 50, 40, 90, 80, 30, 60, 70, 40, 50, 80, 60, 20, 40, 70, 50, 90, 10],
    inspectInfo: "Tinh thể đá trong suốt óng ánh, tiêu bản mô phỏng độ tinh khiết cao của ma túy đá."
  },
  {
    id: "amphetamine",
    name: "Amphetamine (Hồng Phiến)",
    subtitle: "Chất kích thích nền tảng thế hệ đầu",
    category: "Chất tổng hợp kích thích",
    description: "Amphetamine kích thích thần kinh làm co mạch, tăng nhịp tim. Hồng phiến là hỗn hợp của chất này và cafein cực kỳ phổ biến tại Đông Nam Á.",
    effects: [
      "Hệ tim mạch: Tăng nhịp tim cấp tính gây suy tim co thắt đột ngột.",
      "Tác động tâm lý: Lo âu dữ dội, mất ngủ kinh niên dẫn đến loạn thần.",
      "Kiệt quệ năng lượng: Đốt sạch năng lượng cơ thể gây suy kiệt thể chất."
    ],
    warning: "Hủy hoại hoàn toàn tế bào não thùy trán, suy kiệt trí tuệ nhanh chóng!",
    position: { x: 3.0, y: 0.9, z: -3.8 },
    cabinetId: "cabinet_right",
    audioText: "Amphetamine, hay thường gặp dưới dạng Hồng Phiến, ép ép năng lượng cơ thể hoạt động vượt công suất tối đa. Người dùng hồng phiến sẽ nhanh chóng rơi vào suy nhược nghiêm trọng, mất ngủ kinh niên và loạn thần hoang tưởng cực độ, tàn phá não bộ không thể phục hồi.",
    waveform: [25, 20, 40, 50, 30, 70, 60, 25, 50, 55, 35, 40, 60, 50, 20, 30, 50, 40, 70, 10],
    inspectInfo: "Các viên nén màu hồng cam sặc sỡ có in chữ WY viết tắt đặc trưng của hồng phiến."
  },
  {
    id: "ecstasy",
    name: "Thuốc lắc (MDMA)",
    subtitle: "Kẻ hủy diệt các buổi tiệc âm nhạc",
    category: "Chất tổng hợp gây ảo giác",
    description: "MDMA thường được ép thành những viên nén nhiều màu sắc sặc sỡ và ký hiệu dễ thương. Nó làm biến đổi nhận thức, tăng nhiệt độ cơ thể đến mức nguy kịch.",
    effects: [
      "Tăng thân nhiệt cực đoan: Đẩy nhiệt độ lên 42 độ C gây suy đa phủ tạng.",
      "Hủy hoại Serotonin: Gây trầm cảm lâm sàng sâu sắc sau khi hết thuốc.",
      "Ngộ độc tạp chất: Thường bị trộn thuốc thú y, thuốc diệt chuột cực độc."
    ],
    warning: "Uống thuốc lắc kích động nhảy múa quá sức có thể đột tử do suy tim mất nước!",
    position: { x: 3.0, y: 0.9, z: -3.1 },
    cabinetId: "cabinet_right",
    audioText: "Bạn đang quan sát các viên thuốc lắc MDMA. Thường được ngụy trang dưới những hình thù dễ thương và màu sắc sặc sỡ tại các vũ trường, quán bar. Thuốc lắc kích thích phóng thích ồ ạt hormone hạnh phúc giả tạo, đồng thời gây mất nước nghiêm trọng. Người dùng nhảy múa điên cuồng không biết mệt mỏi, đẩy cơ thể đến trạng thái kiệt quệ lâm sàng, tăng thân nhiệt cực đoan phá hủy phủ tạng.",
    waveform: [50, 30, 60, 80, 40, 70, 90, 30, 50, 40, 80, 60, 70, 30, 40, 90, 60, 20, 50, 40],
    inspectInfo: "Lọ thủy tinh chứa hàng chục viên nén hình tròn, hình tim màu hồng, xanh lục và cam dập nổi logo."
  },
  {
    id: "cocaine",
    name: "Cocaine",
    subtitle: "Chất gây nghiện chiết xuất từ lá Coca",
    category: "Chất tự nhiên tinh chế",
    description: "Cocaine là một alkaloid dạng bột tinh thể màu trắng, thu hoạch từ lá cây Coca ở Nam Mỹ. Nó làm co thắt mạnh mạch máu, tăng nhịp tim và huyết áp lên mức cực đoan chỉ trong vài giây.",
    effects: [
      "Đột tử tim mạch: Co thắt mạch vành đột ngột gây nhồi máu cơ tim xuất huyết não.",
      "Hoại tử đường thở: Hủy hoại hoàn toàn vách ngăn mũi nếu hít trực tiếp.",
      "Rối loạn tâm thần: Hoang tưởng cực độ, lo âu cấp tính dữ dội."
    ],
    warning: "Gây co thắt tim đột ngột trực tiếp giết chết người sử dụng ngay lập tức!",
    position: { x: 3.0, y: 0.9, z: -2.4 },
    cabinetId: "cabinet_right",
    audioText: "Đây là khu vực trưng bày Cocaine, một chất kích thích cực mạnh chiết xuất từ lá cây Coca. Cocaine ngăn cản não hấp thu lại dopamine, tích tụ chất này tạo cảm giác hưng phấn ngắn hạn. Tuy nhiên, cái giá phải trả là vô cùng đắt. Cocaine tàn phá hệ tim mạch khủng khiếp, làm co hẹp động mạch vành và có thể châm ngòi cho các cơn đột quỵ hoặc nhồi máu cơ tim giết người chớp nhoáng.",
    waveform: [40, 50, 30, 60, 80, 50, 30, 70, 40, 60, 90, 50, 40, 30, 60, 80, 20, 70, 50, 30],
    inspectInfo: "Bột tinh thể màu trắng tinh nén nén thành bánh hình chữ nhật có ký hiệu hải quan."
  },
  {
    id: "crack",
    name: "Crack Cocaine (Đá Cocaine)",
    subtitle: "Cocaine dạng hút gây nghiện siêu tốc",
    category: "Chất tự nhiên tinh chế",
    description: "Crack là cocaine base tinh thể được chế biến để hút. Tạo ra tiếng nổ lách tách khi đốt, hấp thụ vào phổi lên não chỉ trong 8 giây gây hưng phấn và nghiện ngay lập tức.",
    effects: [
      "Nghiện tức thì: Cơn thèm khát tột độ bùng phát ngay khi hết tác dụng phê thuốc.",
      "Hội chứng phổi crack: Hủy hoại phế nang phổi, ho ra máu, xơ hóa nhu mô phổi.",
      "Hoại tử mô mặt: Gây bỏng miệng, hoại tử mô vòm họng nghiêm trọng."
    ],
    warning: "Gây nghiện siêu tốc độ và phá hủy tâm thần chỉ sau vài tuần sử dụng!",
    position: { x: 3.0, y: 0.9, z: -1.7 },
    cabinetId: "cabinet_right",
    audioText: "Crack Cocaine là biến thể nguy hiểm hơn của cocaine thông thường. Hấp thu cực nhanh qua phổi, nó kích hoạt cơn nghiện tức thì chỉ sau một hơi hút. Sự hụt hẫng hưng phấn đột ngột đẩy người dùng vào trạng thái thèm muốn điên cuồng, sẵn sàng thực hiện mọi hành vi phạm pháp để có thuốc.",
    waveform: [45, 55, 35, 65, 85, 60, 40, 75, 50, 65, 95, 60, 45, 35, 65, 85, 30, 75, 55, 35],
    inspectInfo: "Các mẩu tinh thể thô vụn màu vàng nhạt trông giống như sỏi đá thô đựng trong lọ nhựa."
  },
  {
    id: "ritalin",
    name: "Ritalin (Methylphenidate)",
    subtitle: "Thuốc hướng thần ADHD bị lạm dụng học đường",
    category: "Chất tổng hợp kích thích",
    description: "Ritalin là dược chất kích thích thần kinh kê đơn cho trẻ tăng động giảm chú ý (ADHD). Bị lạm dụng trái phép làm 'thuốc thông minh' để ôn thi.",
    effects: [
      "Rối loạn nhịp tim: Tăng huyết áp đột ngột, loạn nhịp gây đột tử.",
      "Tâm lý cực đoan: Gây lo âu cấp tính, kích động và trầm cảm sâu sắc.",
      "Suy giảm nhận thức: Làm tổn thương khả năng ghi nhớ tự nhiên khi hết thuốc."
    ],
    warning: "Không tự ý lạm dụng làm thuốc bổ não! Nguy hiểm suy tim loạn thần tiềm ẩn.",
    position: { x: 3.0, y: 0.9, z: -1.0 },
    cabinetId: "cabinet_right",
    audioText: "Ritalin bị gắn mác sai lệch là 'thuốc thông minh' tại các môi trường học đường và công sở. Lạm dụng Ritalin để thức đêm học tập gây áp lực cực lớn lên hệ tim mạch, làm biến đổi sinh hóa não bộ và châm ngòi cho các cơn hoảng loạn nghiêm trọng.",
    waveform: [15, 20, 25, 22, 35, 28, 20, 32, 42, 30, 24, 20, 28, 25, 30, 18, 16, 22, 14, 10],
    inspectInfo: "Hộp thuốc biệt dược vỉ 10 viên nén màu vàng nhạt dập chìm ký hiệu của nhà sản xuất."
  },
  {
    id: "adderall",
    name: "Adderall (Hỗn Hợp Muối Amphetamine)",
    subtitle: "Chất kích thích học tập học đường nguy hại",
    category: "Chất tổng hợp kích thích",
    description: "Adderall chứa muối amphetamine tổng hợp mạnh. Lạm dụng liều lượng cao để duy trì sự tỉnh táo thức đêm ôn thi, tàn phá thể trạng nhanh chóng.",
    effects: [
      "Nguy cơ đột quỵ: Gây co thắt động mạch não làm xuất huyết đột quỵ.",
      "Ảo giác ảo ảnh: Gây hoang tưởng, ảo thanh kích động loạn thần.",
      "Nghiện ngập thể chất: Gây phụ thuộc sâu sắc, kiệt quệ sinh lực."
    ],
    warning: "Tàn phá chất xám thần kinh thầm lặng! Đừng bao giờ lạm dụng để ôn thi.",
    position: { x: 3.0, y: 0.9, z: -0.3 },
    cabinetId: "cabinet_right",
    audioText: "Adderall là con quỷ ẩn mình dưới danh nghĩa bổ não ôn thi. Kích thích ồ ạt hệ thần kinh trung ương, nó vắt kiệt giọt năng lượng cuối cùng của cơ thể, đẩy người lạm dụng vào vòng xoáy hoại tử thùy trán, suy giảm nhận thức nặng nề.",
    waveform: [18, 22, 28, 24, 38, 30, 22, 35, 45, 32, 26, 22, 30, 28, 32, 20, 18, 24, 16, 12],
    inspectInfo: "Viên nang cứng màu cam đất chứa các hạt vi nang giải phóng chậm hướng thần."
  },
  {
    id: "nicotine",
    name: "Nicotine (Thuốc Lá Điện Tử/Vape)",
    subtitle: "Chất gây nghiện học đường thế hệ mới",
    category: "Chất tự nhiên độc hại",
    description: "Nicotine tinh chế liều cao có trong tinh dầu Vape/Pod. Kích thích dopamine ngắn hạn gây nghiện siêu tốc và tàn phá hệ hô hấp non nớt.",
    effects: [
      "Tổn thương phổi: Gây xơ hóa phổi, viêm tiểu phế quản cấp (phổi bỏng ngô).",
      "Hệ tim mạch: Làm xơ vữa động mạch sớm, tăng nguy cơ nhồi máu cơ tim.",
      "Nghiện ngập học đường: Trói buộc giới trẻ vào thói quen hút Vape liên tục."
    ],
    warning: "Thuốc lá điện tử pod/vape thường pha trộn chất hướng thần tổng hợp chết người!",
    position: { x: 3.0, y: 0.9, z: 0.4 },
    cabinetId: "cabinet_right",
    audioText: "Nicotine là hoạt chất gây nghiện cực mạnh ẩn mình sau làn khói thơm ngọt của thuốc lá điện tử Pod, Vape. Nicotine tinh chế tàn phá phổi non nớt của giới trẻ, cướp đi sự tập trung và châm ngòi cho chứng xơ vữa mạch máu sớm.",
    waveform: [12, 16, 20, 18, 26, 22, 16, 24, 30, 25, 20, 18, 22, 20, 24, 14, 12, 16, 10, 6],
    inspectInfo: "Các thiết bị Pod dùng một lần nhiều màu sắc bắt mắt kèm lọ tinh dầu thơm hướng thần."
  },
  {
    id: "caffeine",
    name: "Caffeine nguyên chất",
    subtitle: "Chất kích thích phổ biến nhất thế giới",
    category: "Chất tự nhiên an toàn tương đối",
    description: "Caffeine chiết xuất tinh khiết liều cao. Sử dụng liều cao cực đoan gây ngộ độc kích ứng tim mạch nguy hiểm.",
    effects: [
      "Nhiễm độc caffeine: Nhịp tim nhanh trên 120 nhịp/phút, lo âu cấp tính.",
      "Hệ tiêu hóa: Kích ứng dạ dày dữ dội, tăng tiết axit gây loét.",
      "Hệ bài tiết: Gây lợi tiểu mạnh gây mất nước và khoáng chất cấp."
    ],
    warning: "Bột caffeine nguyên chất liều cao cực kỳ nguy hiểm, có thể gây ngưng tim đột ngột!",
    position: { x: 3.0, y: 0.9, z: 1.1 },
    cabinetId: "cabinet_right",
    audioText: "Mặc dù caffeine trong trà hay cà phê là tương đối an toàn, bột caffeine nguyên chất liều cao lại là độc chất tim mạch nguy hiểm, có thể châm ngòi loạn nhịp thất đe dọa tính mạng nếu lạm dụng vô độ.",
    waveform: [8, 12, 16, 14, 20, 18, 14, 22, 25, 20, 16, 14, 18, 16, 20, 12, 10, 14, 8, 4],
    inspectInfo: "Bột tinh thể màu trắng tinh chất đựng trong lọ thí nghiệm dán nhãn kiểm soát liều lượng."
  },
  {
    id: "khat",
    name: "Lá Khat (Lá Thiên Đường)",
    subtitle: "Thảo mộc kích thích gây ảo giác cực mạnh",
    category: "Chất tự nhiên tự sinh",
    description: "Lá Khat chứa hoạt chất Cathinone mạnh tương tự amphetamine. Nhai lá tươi gây hưng phấn mạnh nhưng kéo theo loạn thần hoang tưởng nghiêm trọng.",
    effects: [
      "Răng miệng: Gây rụng răng hoại tử lợi, ung thư vòm họng mãn tính.",
      "Tâm thần loạn thần: Ảo giác hoang tưởng bị hại, xu hướng tự sát hung ác.",
      "Hệ tim mạch: Nhồi máu cơ tim cấp do co thắt mạch vành đột ngột."
    ],
    warning: "Bị cấm nghiêm ngặt tại Việt Nam vì độc tính phá hủy tâm thần tột độ!",
    position: { x: 3.0, y: 0.9, z: 1.8 },
    cabinetId: "cabinet_right",
    audioText: "Lá Khat, hay lá Thiên Đường ảo giả, chứa hoạt chất cathinone hướng thần cực mạnh. Lạm dụng nhai lá Khat tàn phá khoang miệng khủng khiếp, gây hoại tử lợi răng và đẩy người dùng vào chứng bệnh hoang tưởng, ảo giác điên cuồng dữ tợn.",
    waveform: [20, 26, 32, 28, 42, 35, 26, 38, 48, 38, 30, 26, 32, 30, 36, 24, 20, 28, 18, 12],
    inspectInfo: "Bó lá Khat khô gân đỏ tía giống lá trà xanh, kèm theo lọ tinh chế hướng thần Cathinone."
  },

  // --- TABLE 3: HALLUCINOGENS & DISSOCIATIVES (Back Long Table: Z = 4.5, X runs from -4.5 to 4.5) ---
  {
    id: "cannabis",
    name: "Cần sa (Marijuana)",
    subtitle: "Chất thảo mộc hướng thần ảo giác",
    category: "Chất tự nhiên hướng thần",
    description: "Cần sa gồm lá, hoa khô của cây Cannabis sativa. Nó chứa hoạt chất THC gây biến đổi trạng thái tâm lý, làm suy yếu trí nhớ ngắn hạn và giảm khả năng phối hợp vận động.",
    effects: [
      "Hủy hoại trí tuệ: Suy giảm IQ vĩnh viễn ở thanh thiếu niên.",
      "Tác hại phổi: Khói cần sa chứa lượng hắc ín độc hại gấp 5 lần thuốc lá thường.",
      "Tâm thần loạn thần: Kích hoạt trầm cảm lâm sàng và tâm thần phân liệt."
    ],
    warning: "Cần sa không hề an toàn! Nó là chất dẫn dụ mở đường đến các ma túy nặng hơn.",
    position: { x: -4.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "Chào mừng bạn đến với tiêu bản Cần sa. Mặc dù có nguồn gốc thảo mộc tự nhiên, cần sa chứa chất THC cực kỳ nguy hại cho não bộ đang phát triển. Hút cần sa thường xuyên làm tổn thương nghiêm trọng vùng dưới đồi thị và thùy trán, tước đoạt trí nhớ và động lực sống của giới trẻ. Hơn nữa, nó là bước đệm tinh vi dẫn dắt người trẻ dấn thân vào các con đường sử dụng ma túy tổng hợp chết người.",
    waveform: [20, 30, 50, 40, 70, 50, 30, 60, 80, 40, 20, 50, 60, 30, 40, 70, 50, 30, 40, 20],
    inspectInfo: "Mẫu lá cây hình chân chim có 7 thùy răng cưa khô đặc trưng bảo quản trong hộp mica."
  },
  {
    id: "lsd",
    name: "Bùa lưỡi (LSD)",
    subtitle: "Vua ảo giác tổng hợp hướng thần",
    category: "Chất tổng hợp gây ảo giác",
    description: "LSD là chất gây ảo giác cực mạnh được tẩm vào các mẩu giấy in hoạt hình dễ thương. Gây hoang tưởng biến dạng không gian, thời gian tột độ.",
    effects: [
      "Chuyến đi bão táp (Bad Trip): Ảo giác kinh hoàng gây hoảng loạn tột độ dẫn đến tự sát.",
      "Flashback (Tái hiện): Ảo giác bùng phát bất chợt sau nhiều năm ngừng sử dụng.",
      "Loạn thần mãn tính: Mất hoàn toàn ranh giới giữa đời thực và ảo ảnh phân liệt."
    ],
    warning: "Biến dạng nhận thức cực đoan đẩy người dùng nhảy lầu tự sát do nghĩ mình biết bay!",
    position: { x: -3.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "LSD là chất gây ảo giác hóa học kinh điển nhất. Tác dụng ở liều lượng siêu nhỏ tính bằng microgam, LSD bẻ cong hoàn toàn nhận thức giác quan của người dùng. Họ có thể thấy âm thanh có màu sắc, hình ảnh chuyển động kỳ quái, và những cơn ác mộng bad trip rùng rợn đẩy họ tới hành vi tự hủy hoại bản thân.",
    waveform: [40, 60, 80, 50, 90, 70, 50, 85, 95, 60, 40, 55, 75, 50, 70, 40, 30, 50, 30, 15],
    inspectInfo: "Tờ giấy thấm bùa lưỡi chia thành các ô vuông nhỏ in hình nhân vật hoạt hình ngụy trang tinh vi."
  },
  {
    id: "psilocybin",
    name: "Nấm Thức Thần (Magic Mushroom)",
    subtitle: "Thảo mộc gây ảo giác chứa Psilocybin",
    category: "Chất tự nhiên gây ảo giác",
    description: "Nấm thức thần chứa hoạt chất psilocybin gây ảo giác tự nhiên. Khi ăn vào gan chuyển hóa thành psilocin bẻ cong hệ thống serotonin gây ảo ảnh mạnh mẽ.",
    effects: [
      "Rối loạn giác quan: Nhận thức sai lệch hoàn toàn thực tại xung quanh.",
      "Cơn hoảng loạn cấp: Gây lo âu cực độ, mất tự chủ hành vi bạo lực.",
      "Nhiễm độc cơ thể: Buồn nôn dữ dội, ngộ độc độc tố nấm hoại tử cơ."
    ],
    warning: "Nấm ma thuật độc tính cao hủy hoại tế bào thần kinh thầm lặng!",
    position: { x: -2.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "Nấm thức thần chứa psilocybin kích hoạt ảo ảnh bóp méo không gian, thời gian sâu sắc. Dưới tác dụng của nấm thức thần, người dùng mất khả năng tự vệ và có thể thực hiện những hành vi bạo lực không tự chủ do hoang tưởng bị ma quỷ truy đuổi.",
    waveform: [30, 40, 60, 50, 80, 60, 40, 70, 85, 60, 30, 45, 65, 50, 60, 35, 25, 40, 20, 10],
    inspectInfo: "Cây nấm sấy khô màu xám đen, thân dài mảnh, mũ nấm hình nón có viền vàng nhạt."
  },
  {
    id: "dmt",
    name: "DMT (Phân tử thần linh)",
    subtitle: "Chất thức thần ảo giác tột độ nhanh chóng",
    category: "Chất tự nhiên hướng thần",
    description: "DMT là chất thức thần ảo giác mạnh nhất được chiết xuất từ rễ cây Nam Mỹ. Hút vào phổi tạo ra ảo ảnh thoát xác, biến đổi thực tại kinh hoàng chỉ sau vài giây.",
    effects: [
      "Thoát xác ảo tưởng: Mất hoàn toàn liên kết với thân thể vật lý.",
      "Tim mạch cực đoan: Tăng nhịp tim cấp tính gây co thắt động mạch vành.",
      "Rối loạn tâm thần sâu sắc: Sang chấn tâm lý kéo dài do ảo ảnh bão táp."
    ],
    warning: "Ảo giác cực độ bẻ cong hệ thống nhận thức ý thức chỉ trong chớp mắt!",
    position: { x: -1.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "DMT tạo ra những cơn ảo giác thoát xác dữ dội. Chỉ sau vài giây sử dụng, thế giới thực tại biến mất hoàn toàn, thay thế bằng không gian đa chiều kỳ dị. Sự bẻ cong nhận thức quá nhanh này châm ngòi cho các cơn hoảng loạn nghiêm trọng và chấn thương tâm lý vĩnh viễn.",
    waveform: [45, 65, 85, 75, 95, 80, 60, 90, 100, 75, 50, 70, 80, 60, 75, 45, 35, 55, 35, 20],
    inspectInfo: "Bột tinh thể màu cam vàng lấp lánh chiết xuất thực vật độc hướng thần đặc hiệu."
  },
  {
    id: "ketamine",
    name: "Ketamine (Khay)",
    subtitle: "Chất gây mê y tế bị lạm dụng tàn nhẫn",
    category: "Chất tổng hợp phân ly ảo giác",
    description: "Ketamine là chất gây mê phân ly dùng trong thú y và y tế. Lạm dụng trái phép gây ra hiệu ứng tách rời cơ thể khỏi tâm trí (hố K), tàn phá thể xác thảm hại.",
    effects: [
      "Hủy hoại bàng quang: Gây viêm bàng quang xuất huyết mãn tính, teo bàng quang phải cắt bỏ.",
      "Tổn thương não bộ: Gây hoại tử nhu mô não tạo các ổ khuyết vĩnh viễn.",
      "K-Hole (Hố K): Rơi vào trạng thái liệt vận động hoàn toàn, ảo ảnh kinh dị cô độc."
    ],
    warning: "Ketamine phá hủy bàng quang vĩnh viễn, bắt buộc phải đeo túi nước tiểu nhân tạo cả đời!",
    position: { x: -0.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "Bạn đang đối mặt với tiêu bản Ketamine, thường gọi là Ke. Vốn là chất gây mê, Ke phân lập đường truyền cảm giác từ tủy sống lên não. Lạm dụng Ke đẩy người dùng vào trạng thái liệt cứng thể chất trong khi não bộ chìm trong ác mộng K-hole. Đặc biệt, Ke phá hủy hệ tiết niệu tàn khốc, làm teo và chảy máu bàng quang, khiến nạn nhân phải đeo túi nước tiểu giả suốt đời.",
    waveform: [35, 45, 65, 55, 75, 65, 45, 70, 85, 65, 40, 50, 70, 55, 65, 38, 28, 48, 30, 15],
    inspectInfo: "Lọ dung dịch lỏng y tế dán mác biệt dược kèm đĩa mica có bột trắng mịn dập khay."
  },
  {
    id: "pcp",
    name: "PCP (Bụi Thiên Thần)",
    subtitle: "Chất gây mê phân ly tàn bạo nhất",
    category: "Chất tổng hợp phân ly",
    description: "PCP gây mất cảm giác đau đớn hoàn toàn kèm theo hưng phấn hung hãn điên cuồng. Người ngộ độc PCP sở hữu sức mạnh bạo lực hoang dã do mất cảm giác tự vệ.",
    effects: [
      "Cuồng loạn bạo lực: Xu hướng tấn công điên cuồng, tự cắn xé cơ thể mà không đau.",
      "Co thắt cơ vân: Gây hủy hoại cơ vân cấp dẫn đến suy thận cấp tử vong.",
      "Đột tử tim mạch: Gây tăng huyết áp kịch phát dẫn đến đứt mạch máu não."
    ],
    warning: "Chất ma túy tàn bạo kích hoạt xu hướng bạo lực hoang dã điên cuồng nhất!",
    position: { x: 0.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "PCP, hay Bụi Thiên Thần độc hại, triệt tiêu cảm giác đau của cơ thể đồng thời kích hoạt trạng thái điên loạn hung bạo cấp tính. Người ngộ độc PCP trở nên cực kỳ hung hãn, tấn công mọi người xung quanh và tự cào xé bản thân mà không hề hay biết do dây thần kinh cảm giác đau đã bị phân lập hoàn toàn.",
    waveform: [48, 58, 78, 68, 88, 78, 58, 80, 95, 78, 50, 60, 80, 68, 78, 48, 38, 58, 38, 22],
    inspectInfo: "Bột tinh thể màu vàng đục, đóng trong túi bằng nylon tang vật chống buôn lậu chất cấm."
  },
  {
    id: "salvia",
    name: "Lá Tiên Thảo (Salvia)",
    subtitle: "Thảo mộc gây ảo giác phân ly siêu tốc",
    category: "Chất tự nhiên hướng thần",
    description: "Salvia divinorum chứa chất salvinorin A hướng thần mạnh nhất tự nhiên. Hút lá khô gây mất định hướng không gian hoàn toàn chỉ sau 30 giây.",
    effects: [
      "Mất định hướng cấp: Không nhận biết được cơ thể mình đang ở đâu.",
      "Ảo giác biến hình: Ảo ảnh biến thành đồ vật vô tri như tủ, ghế, tường.",
      "Chấn thương tâm lý: Cơn hoảng loạn kịch liệt do biến đổi thực tại đột ngột."
    ],
    warning: "Bị cấm hoàn toàn vì khả năng gây tai nạn chấn thương do mất tự chủ hành vi!",
    position: { x: 1.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "Salvia divinorum sở hữu hoạt chất salvinorin A gây ảo giác phân ly tột độ nhanh chóng. Người hút Salvia mất kết nối hoàn toàn với thực tại chỉ sau vài hơi thở, trải qua cảm giác cơ thể bị kéo căng hoặc biến thành vật thể vô tri, dễ dẫn tới chấn thương nghiêm trọng do ngã hoặc nhảy lầu.",
    waveform: [25, 35, 45, 40, 60, 50, 35, 55, 70, 60, 45, 40, 50, 45, 55, 30, 25, 35, 20, 10],
    inspectInfo: "Gói lá khô nghiền vụn màu đen sẫm giống thảo mộc xông hơi thơm hướng thần."
  },
  {
    id: "mescaline",
    name: "Mescaline (Nấm Peyote)",
    subtitle: "Ảo giác tự nhiên cổ xưa từ xương rồng",
    category: "Chất tự nhiên gây ảo giác",
    description: "Mescaline là alkaloid hướng thần có trong cây xương rồng Peyote ở Mexico. Gây ảo giác màu sắc rực rỡ và biến đổi sâu sắc ý thức tâm lý.",
    effects: [
      "Hệ tiêu hóa: Gây nôn mửa dữ dội kéo dài kèm nhức đầu kinh niên.",
      "Rối loạn giác quan: Bóp méo thị giác, ảo ảnh hình học chuyển động liên tục.",
      "Hệ tim mạch: Tăng nhịp tim cấp, co thắt dạ dày dữ dội."
    ],
    warning: "Cây xương rồng ảo ảnh độc hại gây suy kiệt tạng nội nhanh chóng!",
    position: { x: 2.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "Mescaline là alkaloid hướng thần từ cây xương rồng Peyote.Mescaline kích hoạt ảo ảnh hình học chuyển động và biến dạng không gian sâu sắc, kèm theo những cơn nôn mửa dữ dội do ngộ độc alkaloids cơ thể.",
    waveform: [28, 38, 48, 42, 62, 52, 38, 58, 72, 62, 48, 42, 52, 48, 58, 32, 28, 38, 22, 12],
    inspectInfo: "Các lát cắt xương rồng Peyote sấy khô co rúm màu nâu xám bám bụi phấn xương rồng."
  },
  {
    id: "ghb",
    name: "Nước biển (GHB)",
    subtitle: "Chất gây mê hướng thần nguy hiểm",
    category: "Chất tổng hợp ức chế hướng thần",
    description: "GHB là chất lỏng không màu, không mùi, vị hơi mặn. Thường bị tội phạm lạm dụng làm 'thuốc bỏ bùa' để xâm hại tình dục do gây mất ý thức nhanh chóng.",
    effects: [
      "Mất trí nhớ ngắn hạn: Mất hoàn toàn ký ức trong thời gian thuốc tác dụng.",
      "Hôn mê hô hấp: Gây hôn mê sâu đột ngột, suy hô hấp ngừng thở dẫn đến tử vong.",
      "Co giật rung giật: Gây co giật cơ bắp toàn thân nghiêm trọng."
    ],
    warning: "Thuốc bẫy xâm hại nguy hiểm! Tuyệt đối không uống đồ uống lạ từ người lạ.",
    position: { x: 3.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "GHB, hay còn gọi là Nước biển, cực kỳ nguy hại do tính chất không màu không mùi dễ dàng hòa tan vào đồ uống. GHB gây ức chế thần kinh trung ương cực mạnh, đẩy nạn nhân vào trạng thái hôn mê sâu và mất hoàn toàn trí nhớ ngắn hạn, bị kẻ xấu lạm dụng xâm hại tàn nhẫn.",
    waveform: [32, 42, 52, 48, 68, 58, 42, 62, 78, 68, 52, 48, 58, 52, 62, 38, 32, 42, 26, 16],
    inspectInfo: "Lọ nhựa chứa chất lỏng không màu trong suốt, kèm theo cốc thủy tinh ngụy trang."
  },
  {
    id: "rohypnol",
    name: "Thuốc ngủ Rohypnol (Flunitrazepam)",
    subtitle: "Thuốc ngủ liều mạnh bị lạm dụng độc hại",
    category: "Chất tổng hợp ức chế thần kinh",
    description: "Flunitrazepam là benzodiazepine gây ngủ siêu mạnh. Bị lạm dụng trái phép làm 'thuốc hiếp dâm ngày hẹn' (date rape drug) kết hợp rượu gây liệt cơ thể mất nhận thức hoàn toàn.",
    effects: [
      "Mất điều hòa vận động: Gây yếu cơ bắp toàn thân, không thể đứng hay di chuyển.",
      "Ức chế ý chí: Mất hoàn toàn khả năng phản kháng hay tự vệ bảo vệ bản thân.",
      "Hôn mê sâu: Nguy cơ suy hô hấp tử vong nếu dùng chung với đồ uống có cồn."
    ],
    warning: "Tuyệt đối cảnh giác! Kẻ xấu thường thả vào đồ uống tại các quán bar vũ trường.",
    position: { x: 4.5, y: 0.9, z: 4.5 },
    cabinetId: "cabinet_back",
    audioText: "Rohypnol là hoạt chất gây ngủ siêu mạnh benzodiazepine. Khi pha vào rượu, Rohypnol tạo ra hiệu ứng cộng hưởng độc hại, làm liệt hoàn toàn hệ cơ vận động khiến nạn nhân tỉnh táo về đầu óc nhưng cơ thể bất động hoàn toàn, không thể phản kháng hay kêu cứu.",
    waveform: [30, 38, 48, 44, 60, 50, 38, 54, 70, 60, 48, 44, 50, 48, 58, 34, 30, 38, 22, 12],
    inspectInfo: "Vỉ thuốc nén Rohypnol viên tròn màu xanh lục có khắc chữ số nhận diện y khoa."
  }
];

export const postersData = [
  {
    id: "poster1",
    title: "Tử thần ma túy",
    subtitle: "MA TÚY - TỪ CÁI CHẾT HÃY NÓI KHÔNG",
    description: "Thông điệp mạnh mẽ cảnh báo về con đường ma túy dẫn thẳng tới cái chết và sự hủy diệt cuộc đời.",
    position: { x: -7.9, y: 2.2, z: -3 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 }, // West wall facing East
    impactText: "Từng giây dấn sâu vào ma túy là từng giây rút ngắn cuộc đời của bạn. Hãy dũng cảm từ chối!"
  },
  {
    id: "poster2",
    title: "Sống ý nghĩa",
    subtitle: "SỐNG ĐẸP KHÔNG MA TÚY",
    description: "Kêu gọi xây dựng một lối sống lành mạnh, cống hiến giá trị, bảo vệ bản thân và những người thân yêu khỏi tệ nạn.",
    position: { x: -7.9, y: 2.2, z: 1.5 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 }, // West wall facing East
    impactText: "Cuộc sống tươi đẹp với bao ước mơ đang chờ bạn thực hiện. Nói KHÔNG với ma túy để bảo vệ tương lai."
  },
  {
    id: "poster3",
    title: "Tránh xa cạm bẫy",
    subtitle: "VÌ TƯƠNG LAI HÃY TRÁNH XA MA TÚY",
    description: "Giáo dục phòng chống tệ nạn xã hội, nhắc nhở thế hệ trẻ giữ gìn bản lĩnh vững vàng trước mọi cám dỗ vật chất.",
    position: { x: 7.9, y: 2.2, z: -3 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 }, // East wall facing West
    impactText: "Đừng đánh đổi cả tương lai tươi sáng lấy một vài phút giây hưng phấn giả tạo. Hãy suy nghĩ tỉnh táo!"
  },
  {
    id: "poster4",
    title: "Gia đình bình an",
    subtitle: "MA TÚY HỦY HOẠI GIA ĐÌNH",
    description: "Lột tả hậu quả đau lòng của ma túy lên hạnh phúc gia đình: ly tán, khánh kiệt, đau đớn cho cha mẹ và con cái.",
    position: { x: 7.9, y: 2.2, z: 1.5 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 }, // East wall facing West
    impactText: "Khi bạn thỏa hiệp với ma túy, người đau khổ nhất không chỉ là bạn, mà là giọt nước mắt của mẹ cha."
  }
];

export const questionsData = [
  {
    question: "Chất nào được gọi là 'Tử thần hóa học thế hệ mới' với độc lực cực mạnh gấp 50 lần heroin và chỉ cần 2 miligam đã đủ gây tử vong chớp nhoáng?",
    options: ["Heroin", "Morphine", "Fentanyl", "Ma túy đá (Meth)"],
    answer: 2,
    explain: "Fentanyl là chất ma túy tổng hợp cực độc mạnh gấp 50 lần heroin. Chỉ 2 miligam (bằng hạt muối) đã đủ gây ngừng thở và tử vong đột ngột chỉ sau vài giây hấp thụ."
  },
  {
    question: "Lạm dụng Ketamine (Ke/Khay) gây ra tác hại cực kỳ tàn khốc và không thể đảo ngược đối với cơ quan nào trong cơ thể?",
    options: ["Hệ tiêu hóa", "Hệ tiết niệu (Bàng quang co teo hoại tử)", "Hệ cơ xương khớp", "Hệ hô hấp cấp"],
    answer: 1,
    explain: "Ketamine phá hủy nghiêm trọng tế bào niêm mạc bàng quang, gây viêm bàng quang xuất huyết, xơ hóa và teo bàng quang cực độ khiến bệnh nhân đau đớn dữ dội và phải đeo túi nước tiểu nhân tạo suốt đời."
  },
  {
    question: "Ma túy đá (Methamphetamine) tàn phá hệ thần kinh và gây ảo giác 'ngáo đá' nguy hại bằng cơ chế sinh học nào?",
    options: [
      "Gây buồn ngủ sâu ức chế hô hấp",
      "Kích hoạt giải phóng ồ ạt Dopamine vượt ngưỡng tự nhiên, hoại tử tế bào não thùy trán",
      "Tăng lượng tuần hoàn hồng cầu",
      "Ức chế tuyến thượng thận bài tiết hormon adrenaline"
    ],
    answer: 1,
    explain: "Methamphetamine kích hoạt giải phóng dopamine vượt ngưỡng tự nhiên hàng chục lần, tạo ảo giác quyền lực giả tạo và chứng hoang tưởng ngáo đá điên cuồng, trực tiếp làm teo hoại tế bào não thùy trán."
  },
  {
    question: "Khi lạm dụng thuốc lắc (MDMA) kích động nhảy múa, người dùng có nguy cơ đột tử rất cao do nguyên nhân chính nào?",
    options: [
      "Hạ đường huyết đột ngột",
      "Tăng thân nhiệt cực đoan (đến 42°C) gây suy đa tạng và mất nước kịch phát",
      "Ngộ độc carbonic đường hô hấp",
      "Suy thận mãn tính đột ngột"
    ],
    answer: 1,
    explain: "MDMA phá hủy hoàn toàn hệ thống kiểm soát nhiệt độ cơ thể, khiến thân nhiệt tăng cao ác tính lên trên 42°C, kết hợp vận động mạnh gây hoại tử cơ vân, suy đa tạng kịch phát dẫn đến đột tử."
  },
  {
    question: "LSD (Bùa lưỡi) có thể để lại hiện tượng thần kinh đáng sợ nào bùng phát bất ngờ nhiều năm sau khi đã ngưng sử dụng hoàn toàn?",
    options: [
      "Rụng toàn bộ răng miệng",
      "Mất phản xạ nuốt",
      "Hiện tượng Flashback (Tái hiện ảo giác kinh dị bất chợt)",
      "Chứng mất trí nhớ ngắn hạn"
    ],
    answer: 2,
    explain: "Hiện tượng Flashback (Tái hiện ảo ảnh) xảy ra bất chợt khi chất chuyển hóa LSD tồn đọng kích hoạt ảo giác bão táp (Bad Trip) kinh dị đột ngột nhiều tuần, nhiều tháng hoặc nhiều năm sau khi đã cai nghiện."
  }
];

