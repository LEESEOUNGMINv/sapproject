namespace projectA;

using {
    Country ,
    Currency ,
    Language ,
    User ,
    cuid ,
    extensible ,
    managed ,
    temporal
} from '@sap/cds/common';

entity MEMBER {
    key ID              : String(50);
    PWD                 : String(100);
    NAME                : String(30) default 'NAME';
    EMAIL               : String(100) default 'EMAIL';
    TEL                 : String(30) default 'TEL';
    HIREDAY             : Date default CURRENT_DATE;
    RANK                : String(50) default 'basic';
    SALARY              : Decimal(18, 2) default 0;
    BANK                : String(50) default 'BANK';
    CONTRACT            : String(50) default 'CONTRACT';
    SIGN                : String(100) default 'SIGN';
    AUTHORITY           : String(30) default 'basic';
    ENABLED             : String(30) default 'N';
}