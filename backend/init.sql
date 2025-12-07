Create Table UserMedals (
    UserID INT,
    MedalID INT,
    PRIMARY KEY(UserID, MedalID),
    FOREIGN KEY (UserID) REFERENCES People(UserID),
    FOREIGN KEY (MedalID) REFERENCES Medals(MedalID)
);