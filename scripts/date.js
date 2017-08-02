function JCDtoDObj(A) {
    var Yr, Y, D;
    Yr = + A[0];
    Y = Yr & 3;
    D = (Yr - Y) / 4 * 1461;
    this.setFullYear(Y, A[1] - 1, A[2] - 2 + D);
    this.setHours(0, 0, 0, 0);
    return this;
}

function DObjToJCD() {
    var F, N, D;
    D = 719531 + this / 86400000 - this.getTimezoneOffset() / 1440;
    F = D % 1461;
    N = (D - F) / 1461 * 4;
    D = new Date(2000, 0, F);
    return [D.getFullYear() + N - 2000, D.getMonth() + 1, D.getDate()];
}

//function AddJulMethods() {
    Date.prototype.setJulCal = JCDtoDObj;
    Date.prototype.getJulCal = DObjToJCD;
//}

function JCDtoDate(A) {
    var Y, M, D, QC, DD, ND = new Date(0);
    Y = + A[0];
    M = + A[1];
    D = + A[2];
    QC = Math.floor((Y - (M < 3)) / 100);
    DD = QC - (QC >> 2) - 2;
    ND.setFullYear(Y, M - 1, D + DD);
    alert("Source data:" + Y + " " + (M-1) + " " + (D+DD));
    
    ND.setHours(0, 0, 0, 0);
    alert("Internal " + ND);
    return ND;
}

function DateToJCD(P) {
    var Y, M, D, QC, NQ, XQ, T;
    with (new Date(+ P)) {
        Y = getFullYear();
        M = getMonth() + 1;
        QC = Math.floor((Y - (M < 3)) / 100);
        XQ = QC - (QC >> 2) - 2;
        setDate(getDate() - XQ);
        Y = getFullYear();
        M = getMonth() + 1;
        D = getDate();
        QC = Math.floor((Y - (M < 3)) / 100);
        NQ = QC - (QC >> 2) - 2;
        T = Y & 3;
        setFullYear(T);
        setDate(D + XQ - NQ);
        Y += getFullYear() - T;
        M = getMonth() + 1;
        D = getDate();
        return [Y, M, D];
    }
}

function JCDtoStr(A) {
    return A[0] + "/" + LZ(A[1]) + "/" + LZ(A[2]);
}

function Cycle(F) {
    var Tbl = ["-4712/01/01", "200/02/29", "264/02/29", "1492/10/12", "1582/10/05", "1752/09/03", "2000/02/16"];
    F.INn.value = Tbl[Cyc++];
    Cyc %= Tbl.length;
    JulDatTry(F);
}

function JulDatTry(F) {
    var A1, A2, DO, Z;
    A1 = F.INn.value.split("/");
    F.sJC.value = (DO = (new Date(0)).setJulCal(A1)).ISOlocaldateStr();
    F.gJC.value = JCDtoStr(A2 = DO.getJulCal());
    F.J2D.value = (Z = JCDtoDate(A1)).ISOlocaldateStr();
    F.D2J.value = JCDtoStr(DateToJCD(Z));
    F.OK.value = + A1[0] == + A2[0] && + A1[1] == + A2[1] && + A1[2] == + A2[2];
}

function Up1day(D) {
    D.setDate(D.getDate() + 1);
}

function Up100y(D) {
    D.setFullYear(D.getFullYear() + 100, 2, 0);
}

function Wide(S) {
    while (S.length < 10) {
        S = " " + S;
    }
    return S;
}

function DaysDiff(D1, D2) {
    	D1.setHours(0);
    	D1.setMinutes(0);
    	D1.setSeconds(0);
    	D2.setHours(0);
    	D2.setMinutes(0);
    	D2.setSeconds(0);
    	return Math.round((D1 - D2) / 86400000);
}

