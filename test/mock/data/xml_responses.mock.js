'use strict';

/** Angular will instantiate this singleton by calling "new" on this function the first time it's referenced
 /*  State will persist throughout life of session
 */
angular.module('angularPoint')
    .service('mockXMLService', function () {
        return {
            jsEntities: getJSEntities(),
            listItemsSinceChangeToken: getListItemsSinceChangeToken(),
            xmlWithError: getXMLWithError()
        };

        function getXMLWithError() {
            return '' +
            '<?xml version="1.0" encoding="UTF-8"?>' +
            '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
            '   <soap:Body>' +
            '       <soap:Fault>' +
            '           <soap:Code>' +
            '               <soap:Value>soap:Receiver</soap:Value>' +
            '                   </soap:Code>' +
            '               <soap:Reason>' +
            '                   <soap:Text xml:lang="en">Exception of type \'Microsoft.SharePoint.SoapServer.SoapServerException\' was thrown.</soap:Text>' +
            '               </soap:Reason>' +
            '           <detail>' +
            '               <errorstring xmlns="http://schemas.microsoft.com/sharepoint/soap/">Root element is missing.</errorstring>' +
            '           </detail>' +
            '       </soap:Fault>' +
            '   </soap:Body>' +
            '</soap:Envelope>';
        }

        function getJSEntities() {
            return [{
                "id": 1,
                "modified": "2014-08-20T01:34:41.000Z",
                "created": "2014-08-19T22:41:21.000Z",
                "author": "",
                "editor": "",
                "permMask": "0x7fffffffffffffff",
                "uniqueId": "1;#{DA3FA45D-D874-4C73-AAE5-61556D3E3A79}",
                "titleText": "Mock 1",
                "boolean": true,
                "calculated": "string;#Mock 1",
                "choice": "Option 1",
                "multiChoice": ["Defined Choice 3", "Custom 1"],
                "currency": 15,
                "date": "2014-08-19T07:00:00.000Z",
                "dateTime": "2014-08-13T13:30:00.000Z",
                "integer": 12,
                "json": null,
                "lookup": {"lookupId": 1, "lookupValue": "Lookup 1"},
                "lookupMulti": [{"lookupId": 2, "lookupValue": "Lookup 2"}, {"lookupId": 3, "lookupValue": "Lookup 3"}],
                "user": {"lookupId": 338, "lookupValue": "Scott Peterson"},
                "userMulti": [{"lookupId": 205, "lookupValue": "Russ Peterson"}, {
                    "lookupId": 338,
                    "lookupValue": "Scott Peterson"
                }]
            }, {
                "id": 2,
                "modified": "2014-08-20T01:35:26.000Z",
                "created": "2014-08-19T22:43:05.000Z",
                "author": "",
                "editor": "",
                "permMask": "0x7fffffffffffffff",
                "uniqueId": "2;#{47ED93B6-F6EE-439E-8ED5-E1BF04207DF1}",
                "titleText": "Mock 2",
                "boolean": false,
                "calculated": "string;#Mock 2",
                "choice": "Option 3",
                "multiChoice": ["Defined Choice 2", "Defined Choice 3", "Another Custom Choice"],
                "currency": 19,
                "date": "2014-08-19T07:00:00.000Z",
                "dateTime": "2014-08-29T14:20:00.000Z",
                "integer": 55,
                "json": null,
                "lookup": {"lookupId": 2, "lookupValue": "Lookup 2"},
                "lookupMulti": [{"lookupId": 3, "lookupValue": "Lookup 3"}],
                "user": "",
                "userMulti": [{"lookupId": 338, "lookupValue": "Scott Peterson"}]
            }];
        }

        function getListItemsSinceChangeToken() {
            return $.parseXML('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetListItemChangesSinceTokenResponse xmlns="http://schemas.microsoft.com/sharepoint/soap/"><GetListItemChangesSinceTokenResult><listitems xmlns:s="uuid:BDC6E3F0-6DA3-11d1-A2A3-00AA00C14882" xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" MinTimeBetweenSyncs="0" RecommendedTimeBetweenSyncs="180" MaxBulkDocumentSyncSize="500" AlternateUrls="http://sharepoint.sharepoint-server.com/,https://sharepoint.sharepoint-server.com/" EffectivePermMask="FullMask"><Changes LastChangeToken="1;3;f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61;635440845255970000;384046"><List DocTemplateUrl="" DefaultViewUrl="/OneAppData/Lists/MockList/AllItems.aspx" MobileDefaultViewUrl="" ID="{F5345FE7-2F7C-49F7-87D0-DBFEBDD0CE61}" Title="MockList" Description="Just a mock list to use for prototyping." ImageUrl="/_layouts/images/itgen.png" Name="{F5345FE7-2F7C-49F7-87D0-DBFEBDD0CE61}" BaseType="0" FeatureId="{00BFEA71-DE22-43B2-A848-C05709900100}" ServerTemplate="100" Created="20140819 07:24:09" Modified="20140819 10:35:26" LastDeleted="20140819 07:24:09" Version="16" Direction="none" ThumbnailSize="0" WebImageWidth="0" WebImageHeight="0" Flags="545263616" ItemCount="2" AnonymousPermMask="0" RootFolder="/OneAppData/Lists/MockList" ReadSecurity="1" WriteSecurity="1" Author="338" EventSinkAssembly="" EventSinkClass="" EventSinkData="" EmailAlias="" WebFullUrl="/OneAppData" WebId="5f61f646-1cce-4e92-addc-1626ce9f11cf" SendToLocation="" ScopeId="4f66a976-ca18-459f-9d62-5f1432573f59" MajorVersionLimit="0" MajorWithMinorVersionsLimit="0" WorkFlowId="00000000-0000-0000-0000-000000000000" HasUniqueScopes="False" NoThrottleListOperations="False" HasRelatedLists="False" AllowDeletion="True" AllowMultiResponses="False" EnableAttachments="True" EnableModeration="False" EnableVersioning="False" HasExternalDataSource="False" Hidden="False" MultipleDataList="False" Ordered="False" ShowUser="True" EnablePeopleSelector="False" EnableResourceSelector="False" EnableMinorVersion="False" RequireCheckout="False" ThrottleListOperations="False" ExcludeFromOfflineClient="False" EnableFolderCreation="False" IrmEnabled="False" IsApplicationList="False" PreserveEmptyValues="False" StrictTypeCoercion="False" EnforceDataValidation="False" MaxItemsPerThrottledOperation="5000"><Fields><Field ID="{03e45e84-1992-4d42-9116-26f756012634}" RowOrdinal="0" Type="ContentTypeId" Sealed="TRUE" ReadOnly="TRUE" Hidden="TRUE" DisplayName="Content Type ID" Name="ContentTypeId" DisplaceOnUpgrade="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ContentTypeId" ColName="tp_ContentTypeId" FromBaseType="TRUE"/><Field ID="{fa564e0f-0c70-4ab9-b863-0177e6ddd247}" Type="Text" Name="Title" DisplayName="Title" Required="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Title" FromBaseType="TRUE" ColName="nvarchar1"/><Field ID="{34ad21eb-75bd-4544-8c73-0e08330291fe}" ReadOnly="TRUE" Type="Note" Name="_ModerationComments" DisplayName="Approver Comments" Hidden="TRUE" CanToggleHidden="TRUE" Filterable="FALSE" Sortable="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_ModerationComments" FromBaseType="TRUE" ColName="ntext1"/><Field ID="{39360f11-34cf-4356-9945-25c44e68dade}" ReadOnly="TRUE" Hidden="TRUE" Type="Text" Name="File_x0020_Type" DisplaceOnUpgrade="TRUE" DisplayName="File Type" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="File_x0020_Type" FromBaseType="TRUE" ColName="nvarchar2"/><Field Type="Boolean" DisplayName="Boolean" Description="This is a boolean field.  Default option is yes." EnforceUniqueValues="FALSE" Indexed="FALSE" ID="{fb1ea831-8f27-4d9a-9576-916d606da12c}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Boolean" Name="Boolean" ColName="bit1" RowOrdinal="0"><Default>1</Default></Field><Field Type="Currency" DisplayName="Currency" Description="This is a currency field.  The minimum value is 1 and the maximum value is 20." Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Min="1" Max="20" LCID="1033" ID="{b8e32889-eb7c-4a6e-8467-9bbc736cfd8e}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Currency" Name="Currency" ColName="float1" RowOrdinal="0"/><Field Type="DateTime" DisplayName="Date" Description="This is just a date.  It defaults the current date." Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateOnly" ID="{6bc5ed14-84ba-4783-85b9-fabbc1ad0dc2}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Date" Name="Date" ColName="datetime1" RowOrdinal="0"><Default>[today]</Default><DefaultFormulaValue>2014-08-19T00:00:00Z</DefaultFormulaValue></Field><Field Type="DateTime" DisplayName="DateTime" Description="This is a Date and Time with no default value." Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateTime" ID="{54e4e121-5ab9-4689-b0ae-62e3db9e0e56}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="DateTime" Name="DateTime" ColName="datetime2" RowOrdinal="0"/><Field Type="Number" DisplayName="Integer" Description="This is a simple integer.  Decimal places are set to 0 places." Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Decimals="0" ID="{20562ccc-ea9f-4998-98e7-2a1d8395472a}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Integer" Name="Integer" ColName="float2" RowOrdinal="0"/><Field Type="Note" DisplayName="JSON" Description="This is a JSON field.  Just plain text and 4 lines long." Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" NumLines="4" RichText="FALSE" Sortable="FALSE" ID="{40595f40-d88b-46aa-b7c7-21de9c515282}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="JSON" Name="JSON" ColName="ntext2" RowOrdinal="0"/><Field Type="Lookup" DisplayName="Lookup" Description="Just a simple lookup." Required="FALSE" EnforceUniqueValues="FALSE" List="{d2448413-d9ae-4fe4-a499-1d8fe7201fda}" ShowField="Title" UnlimitedLengthInDocumentLibrary="FALSE" RelationshipDeleteBehavior="None" ID="{283a2f27-4349-4c8b-bf2f-f4daac538657}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Lookup" Name="Lookup" ColName="int1" RowOrdinal="0"/><Field Type="LookupMulti" DisplayName="LookupMulti" Description="Lookup Multi" Required="FALSE" EnforceUniqueValues="FALSE" List="{d2448413-d9ae-4fe4-a499-1d8fe7201fda}" ShowField="Title" Mult="TRUE" Sortable="FALSE" UnlimitedLengthInDocumentLibrary="FALSE" RelationshipDeleteBehavior="None" ID="{71be73b7-21d7-4db4-aa6e-08d96ac57541}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="LookupMulti" Name="LookupMulti" ColName="int2" RowOrdinal="0"/><Field Type="User" DisplayName="User" List="UserInfo" Description="This is a reference to a user\'s name.  No presence." Required="FALSE" ShowField="Title" UserSelectionMode="PeopleOnly" UserSelectionScope="0" ID="{1f7decc6-f924-4ce7-92e8-5850ef5712b3}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="User" Name="User" ColName="int3" RowOrdinal="0"/><Field Type="UserMulti" DisplayName="UserMulti" List="UserInfo" Description="Multiple users referencing the user name with presence." Required="FALSE" ShowField="ImnName" UserSelectionMode="PeopleOnly" UserSelectionScope="0" ID="{37bd3f6e-17d5-46af-ba89-6cad8180bd14}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="UserMulti" Name="UserMulti" ColName="int4" RowOrdinal="0" Group="" Mult="TRUE" Sortable="FALSE" Version="1"/><Field Type="Calculated" DisplayName="Calculated" Description="This is a read only field that consists of the Title." EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateOnly" LCID="1033" ResultType="Text" ReadOnly="TRUE" ID="{0c3c1969-3ebe-45f2-b949-79312a061662}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Calculated" Name="Calculated" ColName="sql_variant1" RowOrdinal="0"><Formula>=Title</Formula><FormulaDisplayNames>=Title</FormulaDisplayNames><FieldRefs><FieldRef Name="Title"/></FieldRefs></Field><Field Type="Choice" DisplayName="Choice" Description="Single select choice without fill-in." Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="Dropdown" FillInChoice="FALSE" ID="{0a292ff8-daed-4262-b7d0-872ae408acd6}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Choice" Name="Choice" ColName="nvarchar3" RowOrdinal="0"><Default>Option 1</Default><CHOICES><CHOICE>Option 1</CHOICE><CHOICE>Option 2</CHOICE><CHOICE>Option 3</CHOICE></CHOICES></Field><Field Type="MultiChoice" DisplayName="MultiChoice" Description="Multiple choice option.  Also allows fill-in choices." Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" FillInChoice="TRUE" ID="{3449ec09-d15a-4601-8d18-62c40a132dd9}" SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="MultiChoice" Name="MultiChoice" ColName="ntext3" RowOrdinal="0"><Default>Defined Choice 1</Default><CHOICES><CHOICE>Defined Choice 1</CHOICE><CHOICE>Defined Choice 2</CHOICE><CHOICE>Defined Choice 3</CHOICE></CHOICES></Field><Field ID="{1d22ea11-1e32-424e-89ab-9fedbadb6ce1}" ColName="tp_ID" RowOrdinal="0" ReadOnly="TRUE" Type="Counter" Name="ID" PrimaryKey="TRUE" DisplayName="ID" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ID" FromBaseType="TRUE"/><Field ID="{c042a256-787d-4a6f-8a8a-cf6ab767f12d}" Type="Computed" DisplayName="Content Type" Name="ContentType" DisplaceOnUpgrade="TRUE" RenderXMLUsingPattern="TRUE" Sortable="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ContentType" Group="_Hidden" PITarget="MicrosoftWindowsSharePointServices" PIAttribute="ContentTypeID" FromBaseType="TRUE"><FieldRefs><FieldRef Name="ContentTypeId"/></FieldRefs><DisplayPattern><MapToContentType><Column Name="ContentTypeId"/></MapToContentType></DisplayPattern></Field><Field ID="{28cf69c5-fa48-462a-b5cd-27b6f9d2bd5f}" ColName="tp_Modified" RowOrdinal="0" ReadOnly="TRUE" Type="DateTime" Name="Modified" DisplayName="Modified" StorageTZ="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Modified" FromBaseType="TRUE"/><Field ID="{8c06beca-0777-48f7-91c7-6da68bc07b69}" ColName="tp_Created" RowOrdinal="0" ReadOnly="TRUE" Type="DateTime" Name="Created" DisplayName="Created" StorageTZ="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Created" FromBaseType="TRUE"/><Field ID="{1df5e554-ec7e-46a6-901d-d85a3881cb18}" ColName="tp_Author" RowOrdinal="0" ReadOnly="TRUE" Type="User" List="UserInfo" Name="Author" DisplayName="Created By" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Author" FromBaseType="TRUE"/><Field ID="{d31655d1-1d5b-4511-95a1-7a09e9b75bf2}" ColName="tp_Editor" RowOrdinal="0" ReadOnly="TRUE" Type="User" List="UserInfo" Name="Editor" DisplayName="Modified By" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Editor" FromBaseType="TRUE"/><Field ID="{26d0756c-986a-48a7-af35-bf18ab85ff4a}" ColName="tp_HasCopyDestinations" RowOrdinal="0" Sealed="TRUE" Hidden="TRUE" ReadOnly="TRUE" Type="Boolean" Name="_HasCopyDestinations" DisplaceOnUpgrade="TRUE" DisplayName="Has Copy Destinations" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_HasCopyDestinations" FromBaseType="TRUE"/><Field ID="{6b4e226d-3d88-4a36-808d-a129bf52bccf}" ColName="tp_CopySource" RowOrdinal="0" Sealed="TRUE" Hidden="TRUE" ReadOnly="TRUE" Type="Text" Name="_CopySource" DisplaceOnUpgrade="TRUE" DisplayName="Copy Source" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_CopySource" FromBaseType="TRUE"/><Field ID="{d4e44a66-ee3a-4d02-88c9-4ec5ff3f4cd5}" ColName="tp_Version" RowOrdinal="0" Hidden="TRUE" ReadOnly="TRUE" Type="Integer" SetAs="owshiddenversion" Name="owshiddenversion" DisplayName="owshiddenversion" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="owshiddenversion" FromBaseType="TRUE"/><Field ID="{f1e020bc-ba26-443f-bf2f-b68715017bbc}" ColName="tp_WorkflowVersion" RowOrdinal="0" Hidden="TRUE" ReadOnly="TRUE" Type="Integer" Name="WorkflowVersion" DisplaceOnUpgrade="TRUE" DisplayName="Workflow Version" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="WorkflowVersion" FromBaseType="TRUE"/><Field ID="{7841bf41-43d0-4434-9f50-a673baef7631}" ColName="tp_UIVersion" RowOrdinal="0" ReadOnly="TRUE" Type="Integer" Name="_UIVersion" DisplaceOnUpgrade="TRUE" DisplayName="UI Version" Hidden="TRUE" CanToggleHidden="TRUE" Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_UIVersion" FromBaseType="TRUE"/><Field ID="{dce8262a-3ae9-45aa-aab4-83bd75fb738a}" ColName="tp_UIVersionString" RowOrdinal="0" ReadOnly="TRUE" Type="Text" Name="_UIVersionString" DisplaceOnUpgrade="TRUE" DisplayName="Version" CanToggleHidden="TRUE" Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_UIVersionString" FromBaseType="TRUE"/><Field ID="{67df98f4-9dec-48ff-a553-29bece9c5bf4}" ColName="tp_HasAttachment" RowOrdinal="0" Type="Attachments" Name="Attachments" DisplayName="Attachments" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Attachments" FromBaseType="TRUE"/><Field ID="{fdc3b2ed-5bf2-4835-a4bc-b885f3396a61}" ColName="tp_ModerationStatus" RowOrdinal="0" ReadOnly="TRUE" Type="ModStat" Name="_ModerationStatus" DisplayName="Approval Status" Hidden="TRUE" CanToggleHidden="TRUE" Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_ModerationStatus" FromBaseType="TRUE"><CHOICES><CHOICE>0;#Approved</CHOICE><CHOICE>1;#Rejected</CHOICE><CHOICE>2;#Pending</CHOICE><CHOICE>3;#Draft</CHOICE><CHOICE>4;#Scheduled</CHOICE></CHOICES><Default>0</Default></Field><Field ID="{503f1caa-358e-4918-9094-4a2cdc4bc034}" ReadOnly="TRUE" Type="Computed" Name="Edit" Sortable="FALSE" Filterable="FALSE" DisplayName="Edit" ClassInfo="Icon" AuthoringInfo="(link to edit item)" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Edit" FromBaseType="TRUE"><DisplayPattern><IfHasRights><RightsChoices><RightsGroup PermEditListItems="required"/></RightsChoices><Then><HTML><![CDATA[<a href="]]></HTML><URL Cmd="Edit"/><HTML><![CDATA[" onclick="EditLink(this, ]]></HTML><Counter Type="View"/><HTML><![CDATA[);return false;" target="_self">]]></HTML><HTML><![CDATA[<img border="0" alt="]]></HTML><HTML>Edit</HTML><HTML><![CDATA[" src="/_layouts/images/edititem.gif"/>]]></HTML><HTML><![CDATA[</a>]]></HTML></Then><Else><HTML><![CDATA[&#160;]]></HTML></Else></IfHasRights></DisplayPattern></Field><Field ID="{bc91a437-52e7-49e1-8c4e-4698904b2b6d}" ReadOnly="TRUE" Type="Computed" Name="LinkTitleNoMenu" DisplayName="Title" Dir="" DisplayNameSrcField="Title" AuthoringInfo="(linked to item)" EnableLookup="TRUE" ListItemMenuAllowed="Prohibited" LinkToItemAllowed="Prohibited" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkTitleNoMenu" FromBaseType="TRUE"><FieldRefs><FieldRef Name="Title"/><FieldRef Name="LinkFilenameNoMenu"/></FieldRefs><DisplayPattern><IfEqual><Expr1><LookupColumn Name="FSObjType"/></Expr1><Expr2>1</Expr2><Then><Field Name="LinkFilenameNoMenu"/></Then><Else><HTML><![CDATA[<a onfocus="OnLink(this)" href="]]></HTML><URL/><HTML><![CDATA[" onclick="EditLink2(this,]]></HTML><Counter Type="View"/><HTML><![CDATA[);return false;" target="_self">]]></HTML><Column HTMLEncode="TRUE" Name="Title" Default="(no title)"/><IfEqual><Expr1><GetVar Name="ShowAccessibleIcon"/></Expr1><Expr2>1</Expr2><Then><HTML><![CDATA[<img src="/_layouts/images/blank.gif" class="ms-hidden" border="0" width="1" height="1" alt="Use SHIFT+ENTER to open the menu (new window)."/>]]></HTML></Then></IfEqual><HTML><![CDATA[</a>]]></HTML><IfNew><HTML><![CDATA[<img src="/_layouts/1033/images/new.gif" alt="]]></HTML><HTML>New</HTML><HTML><![CDATA[" class="ms-newgif" />]]></HTML></IfNew></Else></IfEqual></DisplayPattern></Field><Field ID="{82642ec8-ef9b-478f-acf9-31f7d45fbc31}" ReadOnly="TRUE" Type="Computed" Name="LinkTitle" DisplayName="Title" DisplayNameSrcField="Title" ClassInfo="Menu" AuthoringInfo="(linked to item with edit menu)" ListItemMenuAllowed="Required" LinkToItemAllowed="Prohibited" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkTitle" FromBaseType="TRUE"><FieldRefs><FieldRef Name="Title"/><FieldRef Name="LinkTitleNoMenu"/><FieldRef Name="_EditMenuTableStart2"/><FieldRef Name="_EditMenuTableEnd"/></FieldRefs><DisplayPattern><FieldSwitch><Expr><GetVar Name="FreeForm"/></Expr><Case Value="TRUE"><Field Name="LinkTitleNoMenu"/></Case><Default><Switch><Expr><GetVar Name="MasterVersion"/></Expr><Case Value="4"><HTML><![CDATA[<div class="ms-vb itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML><Field Name="_EditMenuTableStart2"/><HTML><![CDATA[">]]></HTML><Field Name="LinkTitleNoMenu"/><HTML><![CDATA[</div>]]></HTML><HTML><![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[</div>]]></HTML></Case><Default><HTML><![CDATA[<table height="100%" cellspacing="0" class="ms-unselectedtitle itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML><Field Name="_EditMenuTableStart2"/><HTML><![CDATA["><tr><td width="100%" class="ms-vb">]]></HTML><SetVar Name="ShowAccessibleIcon" Value="1"/><Field Name="LinkTitleNoMenu"/><SetVar Name="ShowAccessibleIcon" Value="0"/><HTML><![CDATA[</td><td><img src="/_layouts/images/blank.gif" width="13" style="visibility:hidden" alt=""/></td></tr></table>]]></HTML></Default></Switch></Default></FieldSwitch></DisplayPattern></Field><Field ID="{5f190d91-3dbc-4489-9878-3c092caf35b6}" Hidden="TRUE" ReadOnly="TRUE" Type="Computed" Name="LinkTitle2" DisplayName="Title" DisplayNameSrcField="Title" ClassInfo="Menu" AuthoringInfo="(linked to item with edit menu) (old)" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkTitle2" FromBaseType="TRUE"><FieldRefs><FieldRef Name="Title"/><FieldRef Name="LinkTitleNoMenu"/><FieldRef Name="_EditMenuTableStart"/><FieldRef Name="_EditMenuTableEnd"/></FieldRefs><DisplayPattern><FieldSwitch><Expr><GetVar Name="FreeForm"/></Expr><Case Value="TRUE"><Field Name="LinkTitleNoMenu"/></Case><Default><Field Name="_EditMenuTableStart"/><SetVar Name="ShowAccessibleIcon" Value="1"/><Field Name="LinkTitleNoMenu"/><SetVar Name="ShowAccessibleIcon" Value="0"/><Field Name="_EditMenuTableEnd"/></Default></FieldSwitch></DisplayPattern></Field><Field ID="{b1f7969b-ea65-42e1-8b54-b588292635f2}" ReadOnly="TRUE" Type="Computed" Sortable="FALSE" Filterable="FALSE" Name="SelectTitle" Hidden="TRUE" CanToggleHidden="TRUE" DisplayName="Select" Dir="" AuthoringInfo="(web part connection)" HeaderImage="blank.gif" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="SelectTitle" FromBaseType="TRUE"><FieldRefs><FieldRef Name="ID"/></FieldRefs><DisplayPattern><IfEqual><Expr1><GetVar Name="SelectedID"/></Expr1><Expr2><Column Name="ID"/></Expr2><Then><HTML><![CDATA[<img border="0" align="absmiddle" style="cursor: pointer" src="/_layouts/images/rbsel.gif" alt="]]></HTML><HTML>Selected</HTML><HTML><![CDATA["/>]]></HTML></Then><Else><HTML><![CDATA[<a href="javascript:SelectField(\']]></HTML><GetVar Name="View"/><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><Column Name="ID"/></ScriptQuote><HTML><![CDATA[\');return false;" onclick="javascript:SelectField(\']]></HTML><GetVar Name="View"/><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><Column Name="ID"/></ScriptQuote><HTML><![CDATA[\');return false;" target="_self">]]></HTML><HTML><![CDATA[<img border="0" align="absmiddle" style="cursor: pointer" src="/_layouts/images/rbunsel.gif"  alt="]]></HTML><HTML>Normal</HTML><HTML><![CDATA["/>]]></HTML><HTML><![CDATA[</a>]]></HTML></Else></IfEqual></DisplayPattern></Field><Field ID="{50a54da4-1528-4e67-954a-e2d24f1e9efb}" Name="InstanceID" DisplayName="Instance ID" ColName="tp_InstanceID" RowOrdinal="0" ReadOnly="TRUE" Hidden="TRUE" Type="Integer" Min="0" Max="99991231" Filterable="TRUE" Sortable="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="InstanceID" FromBaseType="TRUE"/><Field ID="{ca4addac-796f-4b23-b093-d2a3f65c0774}" ColName="tp_ItemOrder" RowOrdinal="0" Name="Order" DisplayName="Order" Type="Number" Hidden="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Order" FromBaseType="TRUE"/><Field ID="{ae069f25-3ac2-4256-b9c3-15dbc15da0e0}" ColName="tp_GUID" RowOrdinal="0" ReadOnly="TRUE" Hidden="TRUE" Type="Guid" Name="GUID" DisplayName="GUID" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="GUID" FromBaseType="TRUE"/><Field ID="{de8beacf-5505-47cd-80a6-aa44e7ffe2f4}" ColName="tp_WorkflowInstanceID" RowOrdinal="0" ReadOnly="TRUE" Hidden="TRUE" Type="Guid" Name="WorkflowInstanceID" DisplaceOnUpgrade="TRUE" DisplayName="Workflow Instance ID" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="WorkflowInstanceID" FromBaseType="TRUE"/><Field ID="{94f89715-e097-4e8b-ba79-ea02aa8b7adb}" Name="FileRef" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" Type="Lookup" DisplayName="URL Path" List="Docs" FieldRef="ID" ShowField="FullUrl" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FileRef" FromBaseType="TRUE"/><Field ID="{56605df6-8fa1-47e4-a04c-5b384d59609f}" Name="FileDirRef" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" Type="Lookup" DisplayName="Path" List="Docs" FieldRef="ID" ShowField="DirName" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FileDirRef" FromBaseType="TRUE"/><Field ID="{173f76c8-aebd-446a-9bc9-769a2bd2c18f}" Name="Last_x0020_Modified" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" DisplayName="Modified" Type="Lookup" List="Docs" FieldRef="ID" ShowField="TimeLastModified" Format="TRUE" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Last_x0020_Modified" FromBaseType="TRUE"/><Field ID="{998b5cff-4a35-47a7-92f3-3914aa6aa4a2}" Name="Created_x0020_Date" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" DisplayName="Created" Type="Lookup" List="Docs" FieldRef="ID" ShowField="TimeCreated" Format="TRUE" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Created_x0020_Date" FromBaseType="TRUE"/><Field ID="{30bb605f-5bae-48fe-b4e3-1f81d9772af9}" Name="FSObjType" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="Item Type" List="Docs" FieldRef="ID" ShowField="FSType" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FSObjType" FromBaseType="TRUE"/><Field ID="{423874f8-c300-4bfb-b7a1-42e2159e3b19}" Name="SortBehavior" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="Sort Type" List="Docs" FieldRef="ID" ShowField="SortBehavior" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="SortBehavior" FromBaseType="TRUE"/><Field ID="{ba3c27ee-4791-4867-8821-ff99000bac98}" Name="PermMask" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" RenderXMLUsingPattern="TRUE" ShowInFileDlg="FALSE" Type="Computed" DisplayName="Effective Permissions Mask" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="PermMask" FromBaseType="TRUE"><FieldRefs><FieldRef Name="ID"/></FieldRefs><DisplayPattern><CurrentRights/></DisplayPattern></Field><Field ID="{8553196d-ec8d-4564-9861-3dbe931050c8}" Hidden="TRUE" ShowInFileDlg="FALSE" ShowInVersionHistory="FALSE" Type="File" Name="FileLeafRef" DisplaceOnUpgrade="TRUE" DisplayName="Name" AuthoringInfo="(for use in forms)" List="Docs" FieldRef="ID" ShowField="LeafName" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FileLeafRef" FromBaseType="TRUE"/><Field ID="{4b7403de-8d94-43e8-9f0f-137a3e298126}" Name="UniqueId" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="Unique Id" List="Docs" FieldRef="ID" ShowField="UniqueId" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="UniqueId" FromBaseType="TRUE"/><Field ID="{6d2c4fde-3605-428e-a236-ce5f3dc2b4d4}" Name="SyncClientId" DisplaceOnUpgrade="TRUE" Hidden="TRUE" ReadOnly="TRUE" DisplayName="Client Id" ShowInFileDlg="FALSE" Type="Lookup" List="Docs" FieldRef="ID" ShowField="SyncClientId" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="SyncClientId" FromBaseType="TRUE"/><Field ID="{c5c4b81c-f1d9-4b43-a6a2-090df32ebb68}" Name="ProgId" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="ProgId" List="Docs" FieldRef="ID" ShowField="ProgId" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ProgId" FromBaseType="TRUE"/><Field ID="{dddd2420-b270-4735-93b5-92b713d0944d}" Name="ScopeId" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="ScopeId" List="Docs" FieldRef="ID" ShowField="ScopeId" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ScopeId" FromBaseType="TRUE"/><Field ReadOnly="TRUE" ID="{4ef1b78f-fdba-48dc-b8ab-3fa06a0c9804}" Hidden="TRUE" Type="Computed" Name="HTML_x0020_File_x0020_Type" DisplaceOnUpgrade="TRUE" DisplayName="HTML File Type" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="HTML_x0020_File_x0020_Type" FromBaseType="TRUE"><FieldRefs><FieldRef Name="File_x0020_Type"/></FieldRefs><DisplayPattern/></Field><Field ID="{3c6303be-e21f-4366-80d7-d6d0a3b22c7a}" Hidden="TRUE" ReadOnly="TRUE" Type="Computed" Name="_EditMenuTableStart" DisplaceOnUpgrade="TRUE" DisplayName="Edit Menu Table Start" ClassInfo="Menu" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_EditMenuTableStart" FromBaseType="TRUE"><FieldRefs><FieldRef Name="FileLeafRef"/><FieldRef Name="FileDirRef"/><FieldRef Name="FSObjType"/><FieldRef Name="ID"/><FieldRef Name="ServerUrl"/><FieldRef Name="HTML_x0020_File_x0020_Type"/><FieldRef Name="File_x0020_Type"/><FieldRef Name="PermMask"/><FieldRef Name="_HasCopyDestinations"/><FieldRef Name="_CopySource"/><FieldRef Name="ContentType"/><FieldRef Name="ContentTypeId"/><FieldRef Name="_ModerationStatus"/><FieldRef Name="_UIVersion"/></FieldRefs><DisplayPattern><Switch><Expr><GetVar Name="MasterVersion"/></Expr><Case Value="4"><HTML><![CDATA[<div class="ms-vb" onmouseover="OnItem(this)" CTXName="ctx]]></HTML></Case><Default><HTML><![CDATA[<table height="100%" cellspacing="0" class="ms-unselectedtitle" onmouseover="OnItem(this)" CTXName="ctx]]></HTML></Default></Switch><Counter Type="View"/><HTML>" id="</HTML><Column Name="ID" HTMLEncode="TRUE"/><HTML>" Url="</HTML><Field Name="ServerUrl" URLEncodeAsURL="TRUE"/><HTML>" DRef="</HTML><Field Name="FileDirRef"/><HTML>" Perm="</HTML><Field Name="PermMask"/><HTML>" type="</HTML><Column Name="HTML_x0020_File_x0020_Type"/><HTML>" Ext="</HTML><Column Name="File_x0020_Type"/><HTML>" Icon="</HTML><MapToAll><Column Name="HTML_x0020_File_x0020_Type"/><HTML>|</HTML><Column Name="File_x0020_Type"/></MapToAll><HTML>" OType="</HTML><LookupColumn Name="FSObjType"/><HTML>" COUId="</HTML><HTML>" HCD="</HTML><Column Name="_HasCopyDestinations"/><HTML>" CSrc="</HTML><Column Name="_CopySource" URLEncodeAsURL="TRUE"/><HTML>" MS="</HTML><Column Name="_ModerationStatus"/><HTML><![CDATA[" CType="]]></HTML><Column Name="ContentType" HTMLEncode="TRUE"/><HTML><![CDATA[" CId="]]></HTML><Column Name="ContentTypeId"/><HTML>" UIS="</HTML><Column Name="_UIVersion"/><GetVar Name="_EditMenuTableExtra"/><HTML>" SUrl="</HTML><Switch><Expr><GetVar Name="MasterVersion"/></Expr><Case Value="4"><HTML><![CDATA[">]]></HTML></Case><Default><HTML><![CDATA["><tr><td width="100%" class="ms-vb">]]></HTML></Default></Switch></DisplayPattern></Field><Field ID="{1344423c-c7f9-4134-88e4-ad842e2d723c}" Hidden="TRUE" ReadOnly="TRUE" Type="Computed" Name="_EditMenuTableStart2" DisplaceOnUpgrade="TRUE" DisplayName="Edit Menu Table Start" ClassInfo="Menu" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_EditMenuTableStart2" FromBaseType="TRUE"><FieldRefs><FieldRef Name="ID"/></FieldRefs><DisplayPattern><Counter Type="View"/><HTML>" id="</HTML><Column Name="ID" HTMLEncode="TRUE"/></DisplayPattern></Field><Field ID="{2ea78cef-1bf9-4019-960a-02c41636cb47}" Hidden="TRUE" ReadOnly="TRUE" Type="Computed" Name="_EditMenuTableEnd" DisplaceOnUpgrade="TRUE" DisplayName="Edit Menu Table End" ClassInfo="Menu" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_EditMenuTableEnd" FromBaseType="TRUE"><FieldRefs><FieldRef Name="ID"/></FieldRefs><DisplayPattern><Switch><Expr><GetVar Name="MasterVersion"/></Expr><Case Value="4"><HTML><![CDATA[</div>]]></HTML><HTML><![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[</div>]]></HTML></Case><Default><HTML><![CDATA[</td><td><img src="/_layouts/images/blank.gif" width="13" style="visibility:hidden" alt=""/></td></tr></table>]]></HTML></Default></Switch></DisplayPattern></Field><Field ID="{9d30f126-ba48-446b-b8f9-83745f322ebe}" ReadOnly="TRUE" Type="Computed" Name="LinkFilenameNoMenu" DisplaceOnUpgrade="TRUE" DisplayName="Name" Hidden="TRUE" DisplayNameSrcField="FileLeafRef" Filterable="FALSE" AuthoringInfo="(linked to document)" ListItemMenuAllowed="Prohibited" LinkToItemAllowed="Prohibited" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkFilenameNoMenu" FromBaseType="TRUE"><FieldRefs><FieldRef Name="FileLeafRef"/><FieldRef Name="FSObjType"/><FieldRef Name="Created_x0020_Date"/><FieldRef Name="FileRef"/><FieldRef Name="File_x0020_Type"/><FieldRef Name="HTML_x0020_File_x0020_Type"/><FieldRef Name="ContentTypeId"/><FieldRef Name="PermMask"/></FieldRefs><DisplayPattern><IfEqual><Expr1><LookupColumn Name="FSObjType"/></Expr1><Expr2>1</Expr2><Then><FieldSwitch><Expr><GetVar Name="RecursiveView"/></Expr><Case Value="1"><LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/></Case><Default><SetVar Name="UnencodedFilterLink"><SetVar Name="RootFolder"><HTML>/</HTML><LookupColumn Name="FileRef"/></SetVar><SetVar Name="SkipHost">1</SetVar><SetVar Name="FolderCTID"><FieldSwitch><Expr><ListProperty Select="EnableContentTypes"/></Expr><Case Value="1"><Column Name="ContentTypeId"/></Case></FieldSwitch></SetVar><FilterLink Default="" Paged="FALSE"/></SetVar><HTML><![CDATA[<a onfocus="OnLink(this)" href="]]></HTML><GetVar Name="UnencodedFilterLink" HTMLEncode="TRUE"/><HTML><![CDATA[" onmousedown="javascript:VerifyFolderHref(this,event, \']]></HTML><ScriptQuote NotAddingQuote="TRUE"><GetVar Name="UnencodedFilterLink"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><ListProperty Select="DefaultItemOpen"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><MapToControl><Column Name="HTML_x0020_File_x0020_Type"/><HTML>|</HTML><Column Name="File_x0020_Type"/></MapToControl></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><Column Name="HTML_x0020_File_x0020_Type"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\')"]]></HTML><HTML><![CDATA[" onclick="return HandleFolder(this,event, \']]></HTML><ScriptQuote NotAddingQuote="TRUE"><GetVar Name="UnencodedFilterLink"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><ServerProperty Select="HtmlTransform"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><ListProperty Select="DefaultItemOpen"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><MapToControl><Column Name="HTML_x0020_File_x0020_Type"/><HTML>|</HTML><Column Name="File_x0020_Type"/></MapToControl></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><Column Name="HTML_x0020_File_x0020_Type"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><UserID AllowAnonymous="TRUE"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><ListProperty Select="ForceCheckout"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><Field Name="PermMask"/></ScriptQuote><HTML><![CDATA[\');">]]></HTML><LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/><IfEqual><Expr1><GetVar Name="ShowAccessibleIcon"/></Expr1><Expr2>1</Expr2><Then><HTML><![CDATA[<img src="/_layouts/images/blank.gif" class="ms-hidden" border="0" width="1" height="1" alt="Use SHIFT+ENTER to open the menu (new window)."/>]]></HTML></Then></IfEqual><HTML><![CDATA[</a>]]></HTML></Default></FieldSwitch></Then><Else><HTML><![CDATA[<a onfocus="OnLink(this)" href="]]></HTML><Field Name="ServerUrl" URLEncodeAsURL="TRUE"/><HTML><![CDATA[" onclick="return DispEx(this,event,\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><ServerProperty Select="HtmlTransform"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><ListProperty Select="DefaultItemOpen"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><MapToControl><Column Name="HTML_x0020_File_x0020_Type"/><HTML>|</HTML><Column Name="File_x0020_Type"/></MapToControl></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><Column Name="HTML_x0020_File_x0020_Type"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><UserID AllowAnonymous="TRUE"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><ListProperty Select="ForceCheckout"/></ScriptQuote><HTML><![CDATA[\',\']]></HTML><HTML><![CDATA[\',\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><Field Name="PermMask"/></ScriptQuote><HTML><![CDATA[\')">]]></HTML><UrlBaseName HTMLEncode="TRUE"><LookupColumn Name="FileLeafRef"/></UrlBaseName><IfEqual><Expr1><GetVar Name="ShowAccessibleIcon"/></Expr1><Expr2>1</Expr2><Then><HTML><![CDATA[<img src="/_layouts/images/blank.gif" class="ms-hidden" border="0" width="1" height="1" alt="Use SHIFT+ENTER to open the menu (new window)."/>]]></HTML></Then></IfEqual><HTML><![CDATA[</a>]]></HTML><IfNew Name="Created_x0020_Date"><HTML><![CDATA[<img src="/_layouts/1033/images/new.gif" alt="]]></HTML><HTML>New</HTML><HTML><![CDATA[" class="ms-newgif" />]]></HTML></IfNew></Else></IfEqual></DisplayPattern></Field><Field ID="{5cc6dc79-3710-4374-b433-61cb4a686c12}" ReadOnly="TRUE" Type="Computed" Name="LinkFilename" DisplaceOnUpgrade="TRUE" Hidden="TRUE" DisplayName="Name" DisplayNameSrcField="FileLeafRef" Filterable="FALSE" ClassInfo="Menu" AuthoringInfo="(linked to document with edit menu)" ListItemMenuAllowed="Required" LinkToItemAllowed="Prohibited" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkFilename" FromBaseType="TRUE"><FieldRefs><FieldRef Name="LinkFilenameNoMenu"/><FieldRef Name="_EditMenuTableStart2"/><FieldRef Name="_EditMenuTableEnd"/></FieldRefs><DisplayPattern><FieldSwitch><Expr><GetVar Name="FreeForm"/></Expr><Case Value="TRUE"><Field Name="LinkFilenameNoMenu"/></Case><Default><Switch><Expr><GetVar Name="MasterVersion"/></Expr><Case Value="4"><HTML><![CDATA[<div class="ms-vb itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML><Field Name="_EditMenuTableStart2"/><HTML><![CDATA[">]]></HTML><Field Name="LinkFilenameNoMenu"/><HTML><![CDATA[</div>]]></HTML><HTML><![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[</div>]]></HTML></Case><Default><HTML><![CDATA[<table height="100%" cellspacing="0" class="ms-unselectedtitle itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML><Field Name="_EditMenuTableStart2"/><HTML><![CDATA["><tr><td width="100%" class="ms-vb">]]></HTML><SetVar Name="ShowAccessibleIcon" Value="1"/><Field Name="LinkFilenameNoMenu"/><SetVar Name="ShowAccessibleIcon" Value="0"/><HTML><![CDATA[</td><td><img src="/_layouts/images/blank.gif" width="13" style="visibility:hidden" alt=""/></td></tr></table>]]></HTML></Default></Switch></Default></FieldSwitch></DisplayPattern></Field><Field ID="{224ba411-da77-4050-b0eb-62d422f13d3e}" Hidden="TRUE" ReadOnly="TRUE" Type="Computed" Name="LinkFilename2" DisplaceOnUpgrade="TRUE" DisplayName="Name" DisplayNameSrcField="FileLeafRef" Filterable="FALSE" ClassInfo="Menu" AuthoringInfo="(linked to document with edit menu) (old)" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkFilename2" FromBaseType="TRUE"><FieldRefs><FieldRef Name="LinkFilenameNoMenu"/><FieldRef Name="_EditMenuTableStart"/><FieldRef Name="_EditMenuTableEnd"/></FieldRefs><DisplayPattern><FieldSwitch><Expr><GetVar Name="FreeForm"/></Expr><Case Value="TRUE"><Field Name="LinkFilenameNoMenu"/></Case><Default><Field Name="_EditMenuTableStart"/><SetVar Name="ShowAccessibleIcon" Value="1"/><Field Name="LinkFilenameNoMenu"/><SetVar Name="ShowAccessibleIcon" Value="0"/><Field Name="_EditMenuTableEnd"/></Default></FieldSwitch></DisplayPattern></Field><Field ID="{081c6e4c-5c14-4f20-b23e-1a71ceb6a67c}" Type="Computed" ReadOnly="TRUE" Name="DocIcon" DisplaceOnUpgrade="TRUE" DisplayName="Type" TextOnly="TRUE" ClassInfo="Icon" AuthoringInfo="(icon linked to document)" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="DocIcon" FromBaseType="TRUE"><FieldRefs><FieldRef Name="File_x0020_Type"/><FieldRef Name="FSObjType"/><FieldRef Name="FileRef"/><FieldRef Name="FileLeafRef"/><FieldRef Name="HTML_x0020_File_x0020_Type"/><FieldRef Name="PermMask"/><FieldRef Name="IconOverlay"/></FieldRefs><DisplayPattern><SetVar Name="DocIconImg"><SetVar Name="DocIconAltText"><IfEqual><Expr1><LookupColumn Name="FSObjType"/></Expr1><Expr2>1</Expr2><Then><IfSubString><Expr1>0x0120D5</Expr1><Expr2><Column Name="ContentTypeId"/></Expr2><Then><HTML>Document Collection:</HTML><LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/></Then><Else><HTML>Folder:</HTML><LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/></Else></IfSubString></Then><Else><LookupColumn Name="Title" HTMLEncode="TRUE"/></Else></IfEqual></SetVar><SetVar Name="DocIconFileName"><IfEqual><Expr1><Column Name="IconOverlay"/></Expr1><Expr2/><Then><IfEqual><Expr1><LookupColumn Name="FSObjType"/></Expr1><Expr2>1</Expr2><Then><IfEqual><Expr1><Column Name="HTML_x0020_File_x0020_Type"/><HTML>|</HTML><Column Name="File_x0020_Type"/></Expr1><Expr2><HTML>|</HTML></Expr2><Then><HTML>folder.gif</HTML></Then><Else><SetVar Name="FolderIconFromMap"><MapToIcon><Column Name="HTML_x0020_File_x0020_Type"/><HTML>|</HTML><Column Name="File_x0020_Type"/></MapToIcon></SetVar><IfEqual><Expr1><GetVar Name="FolderIconFromMap"/></Expr1><Expr2><MapToIcon/></Expr2><Then><HTML>folder.gif</HTML></Then><Else><GetVar Name="FolderIconFromMap"/></Else></IfEqual></Else></IfEqual></Then><Else><MapToIcon><Column Name="HTML_x0020_File_x0020_Type"/><HTML>|</HTML><Column Name="File_x0020_Type"/></MapToIcon></Else></IfEqual></Then><Else><MapToIcon><Column Name="IconOverlay"/></MapToIcon></Else></IfEqual></SetVar><HTML><![CDATA[<img border="0" alt="]]></HTML><GetVar Name="DocIconAltText"/><HTML><![CDATA[" title="]]></HTML><GetVar Name="DocIconAltText"/><HTML><![CDATA[" src="/_layouts/images/]]></HTML><GetVar Name="DocIconFileName"/><HTML><![CDATA[" />]]></HTML></SetVar><SetVar Name="DocIconOverlayImg"><IfEqual><Expr1><Column Name="IconOverlay"/></Expr1><Expr2/><Then/><Else><HTML><![CDATA[<img class="ms-vb-icon-overlay" alt="*" src="/_layouts/images/]]></HTML><MapToOverlay><Column Name="IconOverlay"/></MapToOverlay><HTML><![CDATA[" />]]></HTML></Else></IfEqual></SetVar><IfEqual><Expr1><LookupColumn Name="FSObjType"/></Expr1><Expr2>1</Expr2><Then><FieldSwitch><Expr><GetVar Name="RecursiveView"/></Expr><Case Value="1"><GetVar Name="DocIconImg"/><GetVar Name="DocIconOverlayImg"/></Case><Default><SetVar Name="UnencodedFilterLink"><SetVar Name="RootFolder"><HTML>/</HTML><LookupColumn Name="FileRef"/></SetVar><SetVar Name="SkipHost">1</SetVar><SetVar Name="FolderCTID"><FieldSwitch><Expr><ListProperty Select="EnableContentTypes"/></Expr><Case Value="1"><Column Name="ContentTypeId"/></Case></FieldSwitch></SetVar><FilterLink Default="" Paged="FALSE"/></SetVar><FieldSwitch><Expr><GetVar Name="FileDialog"/></Expr><Case Value="1"><GetVar Name="DocIconImg"/><GetVar Name="DocIconOverlayImg"/></Case><Default><HTML><![CDATA[<a href="]]></HTML><GetVar Name="UnencodedFilterLink" HTMLEncode="TRUE"/><HTML><![CDATA[" onclick="javascript:EnterFolder(\']]></HTML><ScriptQuote NotAddingQuote="TRUE"><GetVar Name="UnencodedFilterLink"/></ScriptQuote><HTML><![CDATA[\');javascript:return false;">]]></HTML><GetVar Name="DocIconImg"/><GetVar Name="DocIconOverlayImg"/><HTML><![CDATA[</a>]]></HTML></Default></FieldSwitch></Default></FieldSwitch></Then><Else><HTML><![CDATA[<a onfocus="OnLink(this)" href="]]></HTML><URL/><HTML><![CDATA[" onclick="GoToLink(this);return false;" target="_self">]]></HTML><GetVar Name="DocIconImg"/><GetVar Name="DocIconOverlayImg"/><HTML><![CDATA[</a>]]></HTML></Else></IfEqual></DisplayPattern></Field><Field ID="{105f76ce-724a-4bba-aece-f81f2fce58f5}" ReadOnly="TRUE" Hidden="TRUE" Type="Computed" Name="ServerUrl" DisplaceOnUpgrade="TRUE" DisplayName="Server Relative URL" Filterable="FALSE" RenderXMLUsingPattern="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ServerUrl" FromBaseType="TRUE"><FieldRefs><FieldRef Name="FileRef"/></FieldRefs><DisplayPattern><HTML>/</HTML><LookupColumn Name="FileRef"/></DisplayPattern></Field><Field ID="{7177cfc7-f399-4d4d-905d-37dd51bc90bf}" ReadOnly="TRUE" Hidden="TRUE" Type="Computed" Name="EncodedAbsUrl" DisplaceOnUpgrade="TRUE" DisplayName="Encoded Absolute URL" Filterable="FALSE" RenderXMLUsingPattern="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="EncodedAbsUrl" FromBaseType="TRUE"><FieldRefs><FieldRef Name="FileRef"/></FieldRefs><DisplayPattern><HttpHost URLEncodeAsURL="TRUE"/><HTML>/</HTML><LookupColumn Name="FileRef" IncludeVersions="TRUE" URLEncodeAsURL="TRUE"/></DisplayPattern></Field><Field ID="{7615464b-559e-4302-b8e2-8f440b913101}" ReadOnly="TRUE" Hidden="TRUE" Type="Computed" Name="BaseName" DisplaceOnUpgrade="TRUE" DisplayName="File Name" Filterable="FALSE" RenderXMLUsingPattern="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="BaseName" FromBaseType="TRUE"><FieldRefs><FieldRef Name="FileLeafRef"/><FieldRef Name="FSObjType"/></FieldRefs><DisplayPattern><IfEqual><Expr1><LookupColumn Name="FSObjType"/></Expr1><Expr2>1</Expr2><Then><LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/></Then><Else><UrlBaseName HTMLEncode="TRUE"><LookupColumn Name="FileLeafRef"/></UrlBaseName></Else></IfEqual></DisplayPattern></Field><Field ID="{687c7f94-686a-42d3-9b67-2782eac4b4f8}" Name="MetaInfo" DisplaceOnUpgrade="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="Property Bag" List="Docs" FieldRef="ID" ShowField="MetaInfo" JoinColName="DoclibRowId" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="MetaInfo" FromBaseType="TRUE"/><Field ID="{43bdd51b-3c5b-4e78-90a8-fb2087f71e70}" ColName="tp_Level" RowOrdinal="0" ReadOnly="TRUE" Type="Integer" Name="_Level" DisplaceOnUpgrade="TRUE" DisplayName="Level" Hidden="TRUE" Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_Level" FromBaseType="TRUE"/><Field ID="{c101c3e7-122d-4d4d-bc34-58e94a38c816}" ColName="tp_IsCurrentVersion" DisplaceOnUpgrade="TRUE" RowOrdinal="0" ReadOnly="TRUE" Type="Boolean" Name="_IsCurrentVersion" DisplayName="Is Current Version" Hidden="TRUE" Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_IsCurrentVersion" FromBaseType="TRUE"/><Field ID="{b824e17e-a1b3-426e-aecf-f0184d900485}" Name="ItemChildCount" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="Item Child Count" List="Docs" FieldRef="ID" ShowField="ItemChildCount" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ItemChildCount" FromBaseType="TRUE"/><Field ID="{960ff01f-2b6d-4f1b-9c3f-e19ad8927341}" Name="FolderChildCount" DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" ShowInFileDlg="FALSE" Type="Lookup" DisplayName="Folder Child Count" List="Docs" FieldRef="ID" ShowField="FolderChildCount" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FolderChildCount" FromBaseType="TRUE"/></Fields><RegionalSettings><Language>1033</Language><Locale>1033</Locale><AdvanceHijri>0</AdvanceHijri><CalendarType>1</CalendarType><Time24>False</Time24><TimeZone>300</TimeZone><SortOrder>2070</SortOrder><Presence>True</Presence></RegionalSettings><ServerSettings><ServerVersion>14.0.4762.1000</ServerVersion><RecycleBinEnabled>True</RecycleBinEnabled><ServerRelativeUrl>/OneAppData</ServerRelativeUrl></ServerSettings></List></Changes><rs:data ItemCount="2"><z:row ows_Attachments="0" ows_LinkTitle="Mock 1" ows_Boolean="1" ows_Currency="15.0000000000000" ows_Date="2014-08-19 00:00:00" ows_DateTime="2014-08-13 06:30:00" ows_Integer="12.0000000000000" ows_JSON="&quot;{test: \'val\'}&quot;" ows_Lookup="1;#Lookup 1" ows_LookupMulti="2;#Lookup 2;#3;#Lookup 3" ows_User="338;#Scott Peterson" ows_UserMulti="205;#Russ Peterson;#338;#Scott Peterson" ows_Calculated="string;#Mock 1" ows_Choice="Option 1" ows_MultiChoice=";#Defined Choice 3;#Custom 1;#" ows__ModerationStatus="0" ows__Level="1" ows_UniqueId="1;#{DA3FA45D-D874-4C73-AAE5-61556D3E3A79}" ows_FSObjType="1;#0" ows_Created_x0020_Date="1;#2014-08-19 15:41:21" ows_FileLeafRef="1;#1_.000" ows_PermMask="0x7fffffffffffffff" ows_Modified="2014-08-19 18:34:41" ows_FileRef="1;#OneAppData/Lists/MockList/1_.000" ows_Title="Mock 1" ows_ID="1" ows_owshiddenversion="3" ows_Created="2014-08-19 15:41:21"/><z:row ows_Attachments="0" ows_LinkTitle="Mock 2" ows_Boolean="0" ows_Currency="19.0000000000000" ows_Date="2014-08-19 00:00:00" ows_DateTime="2014-08-29 07:20:00" ows_Integer="55.0000000000000" ows_JSON="[&quot;{test: \'another val\'}&quot;]" ows_Lookup="2;#Lookup 2" ows_LookupMulti="3;#Lookup 3" ows_UserMulti="338;#Scott Peterson" ows_Calculated="string;#Mock 2" ows_Choice="Option 3" ows_MultiChoice=";#Defined Choice 2;#Defined Choice 3;#Another Custom Choice;#" ows__ModerationStatus="0" ows__Level="1" ows_UniqueId="2;#{47ED93B6-F6EE-439E-8ED5-E1BF04207DF1}" ows_FSObjType="2;#0" ows_Created_x0020_Date="2;#2014-08-19 15:43:05" ows_FileLeafRef="2;#2_.000" ows_PermMask="0x7fffffffffffffff" ows_Modified="2014-08-19 18:35:26" ows_FileRef="2;#OneAppData/Lists/MockList/2_.000" ows_Title="Mock 2" ows_ID="2" ows_owshiddenversion="2" ows_Created="2014-08-19 15:43:05"/></rs:data></listitems></GetListItemChangesSinceTokenResult></GetListItemChangesSinceTokenResponse></soap:Body></soap:Envelope>');
            //return '' +
            //'<?xml version="1.0" encoding="utf-8"?>' +
            //'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
            //'               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
            //'    <soap:Body>' +
            //'        <GetListItemChangesSinceTokenResponse xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
            //'            <GetListItemChangesSinceTokenResult>' +
            //'                <listitems xmlns:s="uuid:BDC6E3F0-6DA3-11d1-A2A3-00AA00C14882"' +
            //'                           xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"' +
            //'                           xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema" MinTimeBetweenSyncs="0"' +
            //'                           RecommendedTimeBetweenSyncs="180" MaxBulkDocumentSyncSize="500"' +
            //'                           AlternateUrls="http://my-sharepoint-server.com/,https://my-sharepoint-server.com/"' +
            //'                           EffectivePermMask="FullMask">' +
            //'                    <Changes LastChangeToken="1;3;f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61;635440741847900000;384040">' +
            //'                        <List DocTemplateUrl="" DefaultViewUrl="/OneAppData/Lists/MockList/AllItems.aspx"' +
            //'                              MobileDefaultViewUrl="" ID="{F5345FE7-2F7C-49F7-87D0-DBFEBDD0CE61}" Title="MockList"' +
            //'                              Description="Just a mock list to use for prototyping."' +
            //'                              ImageUrl="/_layouts/images/itgen.png" Name="{F5345FE7-2F7C-49F7-87D0-DBFEBDD0CE61}"' +
            //'                              BaseType="0" FeatureId="{00BFEA71-DE22-43B2-A848-C05709900100}" ServerTemplate="100"' +
            //'                              Created="20140819 07:24:09" Modified="20140819 07:43:05" LastDeleted="20140819 07:24:09"' +
            //'                              Version="14" Direction="none" ThumbnailSize="0" WebImageWidth="0" WebImageHeight="0"' +
            //'                              Flags="545263616" ItemCount="2" AnonymousPermMask="0"' +
            //'                              RootFolder="/OneAppData/Lists/MockList" ReadSecurity="1" WriteSecurity="1" Author="338"' +
            //'                              EventSinkAssembly="" EventSinkClass="" EventSinkData="" EmailAlias=""' +
            //'                              WebFullUrl="/OneAppData" WebId="5f61f646-1cce-4e92-addc-1626ce9f11cf" SendToLocation=""' +
            //'                              ScopeId="4f66a976-ca18-459f-9d62-5f1432573f59" MajorVersionLimit="0"' +
            //'                              MajorWithMinorVersionsLimit="0" WorkFlowId="00000000-0000-0000-0000-000000000000"' +
            //'                              HasUniqueScopes="False" NoThrottleListOperations="False" HasRelatedLists="False"' +
            //'                              AllowDeletion="True" AllowMultiResponses="False" EnableAttachments="True"' +
            //'                              EnableModeration="False" EnableVersioning="False" HasExternalDataSource="False"' +
            //'                              Hidden="False" MultipleDataList="False" Ordered="False" ShowUser="True"' +
            //'                              EnablePeopleSelector="False" EnableResourceSelector="False" EnableMinorVersion="False"' +
            //'                              RequireCheckout="False" ThrottleListOperations="False" ExcludeFromOfflineClient="False"' +
            //'                              EnableFolderCreation="False" IrmEnabled="False" IsApplicationList="False"' +
            //'                              PreserveEmptyValues="False" StrictTypeCoercion="False" EnforceDataValidation="False"' +
            //'                              MaxItemsPerThrottledOperation="5000">' +
            //'                            <Fields>' +
            //'                                <Field ID="{fdc3b2ed-5bf2-4835-a4bc-b885f3396a61}" ColName="tp_ModerationStatus"' +
            //'                                       RowOrdinal="0" ReadOnly="TRUE" Type="ModStat" Name="_ModerationStatus"' +
            //'                                       DisplayName="Approval Status" Hidden="TRUE" CanToggleHidden="TRUE"' +
            //'                                       Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_ModerationStatus" FromBaseType="TRUE">' +
            //'                                    <CHOICES>' +
            //'                                        <CHOICE>0;#Approved</CHOICE>' +
            //'                                        <CHOICE>1;#Rejected</CHOICE>' +
            //'                                        <CHOICE>2;#Pending</CHOICE>' +
            //'                                        <CHOICE>3;#Draft</CHOICE>' +
            //'                                        <CHOICE>4;#Scheduled</CHOICE>' +
            //'                                    </CHOICES>' +
            //'                                    <Default>0</Default>' +
            //'                                </Field>' +
            //'                                <Field Type="Choice" DisplayName="Choice"' +
            //'                                       Description="Single select choice without fill-in." Required="FALSE"' +
            //'                                       EnforceUniqueValues="FALSE" Indexed="FALSE" Format="Dropdown"' +
            //'                                       FillInChoice="FALSE" ID="{0a292ff8-daed-4262-b7d0-872ae408acd6}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Choice"' +
            //'                                       Name="Choice" ColName="nvarchar3" RowOrdinal="0"/>' +
            //'                                    <Default>Option 1</Default>' +
            //'                                    <CHOICES>' +
            //'                                        <CHOICE>Option 1</CHOICE>' +
            //'                                        <CHOICE>Option 2</CHOICE>' +
            //'                                        <CHOICE>Option 3</CHOICE>' +
            //'                                    </CHOICES>' +
            //'                                </Field>' +
            //'                                <Field Type="MultiChoice" DisplayName="MultiChoice"' +
            //'                                       Description="Multiple choice option.  Also allows fill-in choices."' +
            //'                                       Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" FillInChoice="TRUE"' +
            //'                                       ID="{3449ec09-d15a-4601-8d18-62c40a132dd9}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="MultiChoice"' +
            //'                                       Name="MultiChoice" ColName="ntext3" RowOrdinal="0">' +
            //'                                    <Default>Defined Choice 1</Default>' +
            //'                                    <CHOICES>' +
            //'                                        <CHOICE>Defined Choice 1</CHOICE>' +
            //'                                        <CHOICE>Defined Choice 2</CHOICE>' +
            //'                                        <CHOICE>Defined Choice 3</CHOICE>' +
            //'                                    </CHOICES>' +
            //'                                </Field>' +
            //'                                <Field ID="{03e45e84-1992-4d42-9116-26f756012634}" RowOrdinal="0" Type="ContentTypeId"' +
            //'                                       Sealed="TRUE" ReadOnly="TRUE" Hidden="TRUE" DisplayName="Content Type ID"' +
            //'                                       Name="ContentTypeId" DisplaceOnUpgrade="TRUE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ContentTypeId"' +
            //'                                       ColName="tp_ContentTypeId" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{fa564e0f-0c70-4ab9-b863-0177e6ddd247}" Type="Text" Name="Title"' +
            //'                                       DisplayName="Title" Required="TRUE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Title"' +
            //'                                       FromBaseType="TRUE" ColName="nvarchar1"/>' +
            //'                                <Field ID="{34ad21eb-75bd-4544-8c73-0e08330291fe}" ReadOnly="TRUE" Type="Note"' +
            //'                                       Name="_ModerationComments" DisplayName="Approver Comments" Hidden="TRUE"' +
            //'                                       CanToggleHidden="TRUE" Filterable="FALSE" Sortable="FALSE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_ModerationComments" FromBaseType="TRUE" ColName="ntext1"/>' +
            //'                                <Field ID="{39360f11-34cf-4356-9945-25c44e68dade}" ReadOnly="TRUE" Hidden="TRUE"' +
            //'                                       Type="Text" Name="File_x0020_Type" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="File Type" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="File_x0020_Type" FromBaseType="TRUE" ColName="nvarchar2"/>' +
            //'                                <Field Type="Boolean" DisplayName="Boolean"' +
            //'                                       Description="This is a boolean field.  Default option is yes."' +
            //'                                       EnforceUniqueValues="FALSE" Indexed="FALSE"' +
            //'                                       ID="{fb1ea831-8f27-4d9a-9576-916d606da12c}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Boolean"' +
            //'                                       Name="Boolean" ColName="bit1" RowOrdinal="0">' +
            //'                                    <Default>1</Default>' +
            //'                                </Field>' +
            //'                                <Field Type="Currency" DisplayName="Currency"' +
            //'                                       Description="This is a currency field.  The minimum value is 1 and the maximum value is 20."' +
            //'                                       Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Min="1" Max="20"' +
            //'                                       LCID="1033" ID="{b8e32889-eb7c-4a6e-8467-9bbc736cfd8e}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Currency"' +
            //'                                       Name="Currency" ColName="float1" RowOrdinal="0"/>' +
            //'                                <Field Type="DateTime" DisplayName="Date"' +
            //'                                       Description="This is just a date.  It defaults the current date."' +
            //'                                       Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateOnly"' +
            //'                                       ID="{6bc5ed14-84ba-4783-85b9-fabbc1ad0dc2}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Date" Name="Date"' +
            //'                                       ColName="datetime1" RowOrdinal="0">' +
            //'                                    <Default>[today]</Default>' +
            //'                                    <DefaultFormulaValue>2014-08-19T00:00:00Z</DefaultFormulaValue>' +
            //'                                </Field>' +
            //'                                <Field Type="DateTime" DisplayName="DateTime"' +
            //'                                       Description="This is a Date and Time with no default value." Required="FALSE"' +
            //'                                       EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateTime"' +
            //'                                       ID="{54e4e121-5ab9-4689-b0ae-62e3db9e0e56}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="DateTime"' +
            //'                                       Name="DateTime" ColName="datetime2" RowOrdinal="0"/>' +
            //'                                <Field Type="Number" DisplayName="Integer"' +
            //'                                       Description="This is a simple integer.  Decimal places are set to 0 places."' +
            //'                                       Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Decimals="0"' +
            //'                                       ID="{20562ccc-ea9f-4998-98e7-2a1d8395472a}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Integer"' +
            //'                                       Name="Integer" ColName="float2" RowOrdinal="0"/>' +
            //'                                <Field Type="Note" DisplayName="JSON"' +
            //'                                       Description="This is a JSON field.  Just plain text and 4 lines long."' +
            //'                                       Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" NumLines="4"' +
            //'                                       RichText="FALSE" Sortable="FALSE" ID="{40595f40-d88b-46aa-b7c7-21de9c515282}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="JSON" Name="JSON"' +
            //'                                       ColName="ntext2" RowOrdinal="0"/>' +
            //'                                <Field Type="Lookup" DisplayName="Lookup" Description="Just a simple lookup."' +
            //'                                       Required="FALSE" EnforceUniqueValues="FALSE"' +
            //'                                       List="{d2448413-d9ae-4fe4-a499-1d8fe7201fda}" ShowField="Title"' +
            //'                                       UnlimitedLengthInDocumentLibrary="FALSE" RelationshipDeleteBehavior="None"' +
            //'                                       ID="{283a2f27-4349-4c8b-bf2f-f4daac538657}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Lookup"' +
            //'                                       Name="Lookup" ColName="int1" RowOrdinal="0"/>' +
            //'                                <Field Type="LookupMulti" DisplayName="LookupMulti" Description="Lookup Multi"' +
            //'                                       Required="FALSE" EnforceUniqueValues="FALSE"' +
            //'                                       List="{d2448413-d9ae-4fe4-a499-1d8fe7201fda}" ShowField="Title" Mult="TRUE"' +
            //'                                       Sortable="FALSE" UnlimitedLengthInDocumentLibrary="FALSE"' +
            //'                                       RelationshipDeleteBehavior="None" ID="{71be73b7-21d7-4db4-aa6e-08d96ac57541}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="LookupMulti"' +
            //'                                       Name="LookupMulti" ColName="int2" RowOrdinal="0"/>' +
            //'                                <Field Type="User" DisplayName="User" List="UserInfo"' +
            //'                                       Description="This is a reference to a user\'s name.  No presence."' +
            //'                                       Required="FALSE" ShowField="Title" UserSelectionMode="PeopleOnly"' +
            //'                                       UserSelectionScope="0" ID="{1f7decc6-f924-4ce7-92e8-5850ef5712b3}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="User" Name="User"' +
            //'                                       ColName="int3" RowOrdinal="0"/>' +
            //'                                <Field Type="UserMulti" DisplayName="UserMulti" List="UserInfo"' +
            //'                                       Description="Multiple users referencing the user name with presence."' +
            //'                                       Required="FALSE" ShowField="ImnName" UserSelectionMode="PeopleOnly"' +
            //'                                       UserSelectionScope="0" ID="{37bd3f6e-17d5-46af-ba89-6cad8180bd14}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="UserMulti"' +
            //'                                       Name="UserMulti" ColName="int4" RowOrdinal="0" Group="" Mult="TRUE"' +
            //'                                       Sortable="FALSE" Version="1"/>' +
            //'                                <Field Type="Calculated" DisplayName="Calculated"' +
            //'                                       Description="This is a read only field that consists of the Title."' +
            //'                                       EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateOnly" LCID="1033"' +
            //'                                       ResultType="Text" ReadOnly="TRUE" ID="{0c3c1969-3ebe-45f2-b949-79312a061662}"' +
            //'                                       SourceID="{f5345fe7-2f7c-49f7-87d0-dbfebdd0ce61}" StaticName="Calculated"' +
            //'                                       Name="Calculated" ColName="sql_variant1" RowOrdinal="0">' +
            //'                                    <Formula>=Title</Formula>' +
            //'                                    <FormulaDisplayNames>=Title</FormulaDisplayNames>' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="Title"/>' +
            //'                                    </FieldRefs>' +
            //'                                </Field>' +
            //'                                <Field ID="{1d22ea11-1e32-424e-89ab-9fedbadb6ce1}" ColName="tp_ID" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Type="Counter" Name="ID" PrimaryKey="TRUE" DisplayName="ID"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ID"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{c042a256-787d-4a6f-8a8a-cf6ab767f12d}" Type="Computed"' +
            //'                                       DisplayName="Content Type" Name="ContentType" DisplaceOnUpgrade="TRUE"' +
            //'                                       RenderXMLUsingPattern="TRUE" Sortable="FALSE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ContentType"' +
            //'                                       Group="_Hidden" PITarget="MicrosoftWindowsSharePointServices"' +
            //'                                       PIAttribute="ContentTypeID" FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="ContentTypeId"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <MapToContentType>' +
            //'                                            <Column Name="ContentTypeId"/>' +
            //'                                        </MapToContentType>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{28cf69c5-fa48-462a-b5cd-27b6f9d2bd5f}" ColName="tp_Modified" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Type="DateTime" Name="Modified" DisplayName="Modified"' +
            //'                                       StorageTZ="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="Modified" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{8c06beca-0777-48f7-91c7-6da68bc07b69}" ColName="tp_Created" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Type="DateTime" Name="Created" DisplayName="Created"' +
            //'                                       StorageTZ="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="Created" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{1df5e554-ec7e-46a6-901d-d85a3881cb18}" ColName="tp_Author" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Type="User" List="UserInfo" Name="Author"' +
            //'                                       DisplayName="Created By" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="Author" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{d31655d1-1d5b-4511-95a1-7a09e9b75bf2}" ColName="tp_Editor" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Type="User" List="UserInfo" Name="Editor"' +
            //'                                       DisplayName="Modified By" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="Editor" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{26d0756c-986a-48a7-af35-bf18ab85ff4a}" ColName="tp_HasCopyDestinations"' +
            //'                                       RowOrdinal="0" Sealed="TRUE" Hidden="TRUE" ReadOnly="TRUE" Type="Boolean"' +
            //'                                       Name="_HasCopyDestinations" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Has Copy Destinations"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_HasCopyDestinations" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{6b4e226d-3d88-4a36-808d-a129bf52bccf}" ColName="tp_CopySource"' +
            //'                                       RowOrdinal="0" Sealed="TRUE" Hidden="TRUE" ReadOnly="TRUE" Type="Text"' +
            //'                                       Name="_CopySource" DisplaceOnUpgrade="TRUE" DisplayName="Copy Source"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_CopySource"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{d4e44a66-ee3a-4d02-88c9-4ec5ff3f4cd5}" ColName="tp_Version" RowOrdinal="0"' +
            //'                                       Hidden="TRUE" ReadOnly="TRUE" Type="Integer" SetAs="owshiddenversion"' +
            //'                                       Name="owshiddenversion" DisplayName="owshiddenversion"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="owshiddenversion" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{f1e020bc-ba26-443f-bf2f-b68715017bbc}" ColName="tp_WorkflowVersion"' +
            //'                                       RowOrdinal="0" Hidden="TRUE" ReadOnly="TRUE" Type="Integer"' +
            //'                                       Name="WorkflowVersion" DisplaceOnUpgrade="TRUE" DisplayName="Workflow Version"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="WorkflowVersion" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{7841bf41-43d0-4434-9f50-a673baef7631}" ColName="tp_UIVersion" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Type="Integer" Name="_UIVersion" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="UI Version" Hidden="TRUE" CanToggleHidden="TRUE" Required="FALSE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_UIVersion"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{dce8262a-3ae9-45aa-aab4-83bd75fb738a}" ColName="tp_UIVersionString"' +
            //'                                       RowOrdinal="0" ReadOnly="TRUE" Type="Text" Name="_UIVersionString"' +
            //'                                       DisplaceOnUpgrade="TRUE" DisplayName="Version" CanToggleHidden="TRUE"' +
            //'                                       Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_UIVersionString" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{67df98f4-9dec-48ff-a553-29bece9c5bf4}" ColName="tp_HasAttachment"' +
            //'                                       RowOrdinal="0" Type="Attachments" Name="Attachments" DisplayName="Attachments"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Attachments"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{503f1caa-358e-4918-9094-4a2cdc4bc034}" ReadOnly="TRUE" Type="Computed"' +
            //'                                       Name="Edit" Sortable="FALSE" Filterable="FALSE" DisplayName="Edit"' +
            //'                                       ClassInfo="Icon" AuthoringInfo="(link to edit item)"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Edit"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <DisplayPattern>' +
            //'                                        <IfHasRights>' +
            //'                                            <RightsChoices>' +
            //'                                                <RightsGroup PermEditListItems="required"/>' +
            //'                                            </RightsChoices>' +
            //'                                            <Then>' +
            //'                                                <HTML><![CDATA[<a href="]]></HTML>' +
            //'                                                <URL Cmd="Edit"/>' +
            //'                                                <HTML><![CDATA[" onclick="EditLink(this, ]]></HTML>' +
            //'                                                <Counter Type="View"/>' +
            //'                                                <HTML><![CDATA[);return false;" target="_self">]]></HTML>' +
            //'                                                <HTML><![CDATA[<img border="0" alt="]]></HTML>' +
            //'                                                <HTML>Edit</HTML>' +
            //'                                                <HTML><![CDATA[" src="/_layouts/images/edititem.gif"/>]]></HTML>' +
            //'                                                <HTML><![CDATA[</a>]]></HTML>' +
            //'                                            </Then>' +
            //'                                            <Else>' +
            //'                                                <HTML><![CDATA[&#160;]]></HTML>' +
            //'                                            </Else>' +
            //'                                        </IfHasRights>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{bc91a437-52e7-49e1-8c4e-4698904b2b6d}" ReadOnly="TRUE" Type="Computed"' +
            //'                                       Name="LinkTitleNoMenu" DisplayName="Title" Dir="" DisplayNameSrcField="Title"' +
            //'                                       AuthoringInfo="(linked to item)" EnableLookup="TRUE"' +
            //'                                       ListItemMenuAllowed="Prohibited" LinkToItemAllowed="Prohibited"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="LinkTitleNoMenu" FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="Title"/>' +
            //'                                        <FieldRef Name="LinkFilenameNoMenu"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <IfEqual>' +
            //'                                            <Expr1>' +
            //'                                                <LookupColumn Name="FSObjType"/>' +
            //'                                            </Expr1>' +
            //'                                            <Expr2>1</Expr2>' +
            //'                                            <Then>' +
            //'                                                <Field Name="LinkFilenameNoMenu"/>' +
            //'                                            </Then>' +
            //'                                            <Else>' +
            //'                                                <HTML><![CDATA[<a onfocus="OnLink(this)" href="]]></HTML>' +
            //'                                                <URL/>' +
            //'                                                <HTML><![CDATA[" onclick="EditLink2(this,]]></HTML>' +
            //'                                                <Counter Type="View"/>' +
            //'                                                <HTML><![CDATA[);return false;" target="_self">]]></HTML>' +
            //'                                                <Column HTMLEncode="TRUE" Name="Title" Default="(no title)"/>' +
            //'                                                <IfEqual>' +
            //'                                                    <Expr1>' +
            //'                                                        <GetVar Name="ShowAccessibleIcon"/>' +
            //'                                                    </Expr1>' +
            //'                                                    <Expr2>1</Expr2>' +
            //'                                                    <Then>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<img src="/_layouts/images/blank.gif" class="ms-hidden" border="0" width="1" height="1" alt="Use SHIFT+ENTER to open the menu (new window)."/>]]></HTML>' +
            //'                                                    </Then>' +
            //'                                                </IfEqual>' +
            //'                                                <HTML><![CDATA[</a>]]></HTML>' +
            //'                                                <IfNew>' +
            //'                                                    <HTML>' +
            //'                                                        <![CDATA[<img src="/_layouts/1033/images/new.gif" alt="]]></HTML>' +
            //'                                                    <HTML>New</HTML>' +
            //'                                                    <HTML><![CDATA[" class="ms-newgif" />]]></HTML>' +
            //'                                                </IfNew>' +
            //'                                            </Else>' +
            //'                                        </IfEqual>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{82642ec8-ef9b-478f-acf9-31f7d45fbc31}" ReadOnly="TRUE" Type="Computed"' +
            //'                                       Name="LinkTitle" DisplayName="Title" DisplayNameSrcField="Title" ClassInfo="Menu"' +
            //'                                       AuthoringInfo="(linked to item with edit menu)" ListItemMenuAllowed="Required"' +
            //'                                       LinkToItemAllowed="Prohibited"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkTitle"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="Title"/>' +
            //'                                        <FieldRef Name="LinkTitleNoMenu"/>' +
            //'                                        <FieldRef Name="_EditMenuTableStart2"/>' +
            //'                                        <FieldRef Name="_EditMenuTableEnd"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <FieldSwitch>' +
            //'                                            <Expr>' +
            //'                                                <GetVar Name="FreeForm"/>' +
            //'                                            </Expr>' +
            //'                                            <Case Value="TRUE">' +
            //'                                                <Field Name="LinkTitleNoMenu"/>' +
            //'                                            </Case>' +
            //'                                            <Default>' +
            //'                                                <Switch>' +
            //'                                                    <Expr>' +
            //'                                                        <GetVar Name="MasterVersion"/>' +
            //'                                                    </Expr>' +
            //'                                                    <Case Value="4">' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<div class="ms-vb itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML>' +
            //'                                                        <Field Name="_EditMenuTableStart2"/>' +
            //'                                                        <HTML><![CDATA[">]]></HTML>' +
            //'                                                        <Field Name="LinkTitleNoMenu"/>' +
            //'                                                        <HTML><![CDATA[</div>]]></HTML>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML>' +
            //'                                                        <HTML><![CDATA[<span>&nbsp;</span>]]></HTML>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML>' +
            //'                                                        <HTML><![CDATA[<span>&nbsp;</span>]]></HTML>' +
            //'                                                        <HTML><![CDATA[</div>]]></HTML>' +
            //'                                                    </Case>' +
            //'                                                    <Default>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<table height="100%" cellspacing="0" class="ms-unselectedtitle itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML>' +
            //'                                                        <Field Name="_EditMenuTableStart2"/>' +
            //'                                                        <HTML><![CDATA["><tr><td width="100%" class="ms-vb">]]></HTML>' +
            //'                                                        <SetVar Name="ShowAccessibleIcon" Value="1"/>' +
            //'                                                        <Field Name="LinkTitleNoMenu"/>' +
            //'                                                        <SetVar Name="ShowAccessibleIcon" Value="0"/>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[</td><td><img src="/_layouts/images/blank.gif" width="13" style="visibility:hidden" alt=""/></td></tr></table>]]></HTML>' +
            //'                                                    </Default>' +
            //'                                                </Switch>' +
            //'                                            </Default>' +
            //'                                        </FieldSwitch>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{5f190d91-3dbc-4489-9878-3c092caf35b6}" Hidden="TRUE" ReadOnly="TRUE"' +
            //'                                       Type="Computed" Name="LinkTitle2" DisplayName="Title" DisplayNameSrcField="Title"' +
            //'                                       ClassInfo="Menu" AuthoringInfo="(linked to item with edit menu) (old)"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkTitle2"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="Title"/>' +
            //'                                        <FieldRef Name="LinkTitleNoMenu"/>' +
            //'                                        <FieldRef Name="_EditMenuTableStart"/>' +
            //'                                        <FieldRef Name="_EditMenuTableEnd"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <FieldSwitch>' +
            //'                                            <Expr>' +
            //'                                                <GetVar Name="FreeForm"/>' +
            //'                                            </Expr>' +
            //'                                            <Case Value="TRUE">' +
            //'                                                <Field Name="LinkTitleNoMenu"/>' +
            //'                                            </Case>' +
            //'                                            <Default>' +
            //'                                                <Field Name="_EditMenuTableStart"/>' +
            //'                                                <SetVar Name="ShowAccessibleIcon" Value="1"/>' +
            //'                                                <Field Name="LinkTitleNoMenu"/>' +
            //'                                                <SetVar Name="ShowAccessibleIcon" Value="0"/>' +
            //'                                                <Field Name="_EditMenuTableEnd"/>' +
            //'                                            </Default>' +
            //'                                        </FieldSwitch>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{b1f7969b-ea65-42e1-8b54-b588292635f2}" ReadOnly="TRUE" Type="Computed"' +
            //'                                       Sortable="FALSE" Filterable="FALSE" Name="SelectTitle" Hidden="TRUE"' +
            //'                                       CanToggleHidden="TRUE" DisplayName="Select" Dir=""' +
            //'                                       AuthoringInfo="(web part connection)" HeaderImage="blank.gif"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="SelectTitle"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="ID"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <IfEqual>' +
            //'                                            <Expr1>' +
            //'                                                <GetVar Name="SelectedID"/>' +
            //'                                            </Expr1>' +
            //'                                            <Expr2>' +
            //'                                                <Column Name="ID"/>' +
            //'                                            </Expr2>' +
            //'                                            <Then>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[<img border="0" align="absmiddle" style="cursor: pointer" src="/_layouts/images/rbsel.gif" alt="]]></HTML>' +
            //'                                                <HTML>Selected</HTML>' +
            //'                                                <HTML><![CDATA["/>]]></HTML>' +
            //'                                            </Then>' +
            //'                                            <Else>' +
            //'                                                <HTML><![CDATA[<a href="javascript:SelectField(\']]></HTML>' +
            //'                                                <GetVar Name="View"/>' +
            //'                                                <HTML><![CDATA[\',\']]></HTML>' +
            //'                                                <ScriptQuote NotAddingQuote="TRUE">' +
            //'                                                    <Column Name="ID"/>' +
            //'                                                </ScriptQuote>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[\');return false;" onclick="javascript:SelectField(\']]></HTML>' +
            //'                                                <GetVar Name="View"/>' +
            //'                                                <HTML><![CDATA[\',\']]></HTML>' +
            //'                                                <ScriptQuote NotAddingQuote="TRUE">' +
            //'                                                    <Column Name="ID"/>' +
            //'                                                </ScriptQuote>' +
            //'                                                <HTML><![CDATA[\');return false;" target="_self">]]></HTML>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[<img border="0" align="absmiddle" style="cursor: pointer" src="/_layouts/images/rbunsel.gif"  alt="]]></HTML>' +
            //'                                                <HTML>Normal</HTML>' +
            //'                                                <HTML><![CDATA["/>]]></HTML>' +
            //'                                                <HTML><![CDATA[</a>]]></HTML>' +
            //'                                            </Else>' +
            //'                                        </IfEqual>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{50a54da4-1528-4e67-954a-e2d24f1e9efb}" Name="InstanceID"' +
            //'                                       DisplayName="Instance ID" ColName="tp_InstanceID" RowOrdinal="0" ReadOnly="TRUE"' +
            //'                                       Hidden="TRUE" Type="Integer" Min="0" Max="99991231" Filterable="TRUE"' +
            //'                                       Sortable="TRUE" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="InstanceID" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{ca4addac-796f-4b23-b093-d2a3f65c0774}" ColName="tp_ItemOrder" RowOrdinal="0"' +
            //'                                       Name="Order" DisplayName="Order" Type="Number" Hidden="TRUE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Order"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{ae069f25-3ac2-4256-b9c3-15dbc15da0e0}" ColName="tp_GUID" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Hidden="TRUE" Type="Guid" Name="GUID" DisplayName="GUID"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="GUID"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{de8beacf-5505-47cd-80a6-aa44e7ffe2f4}" ColName="tp_WorkflowInstanceID"' +
            //'                                       RowOrdinal="0" ReadOnly="TRUE" Hidden="TRUE" Type="Guid"' +
            //'                                       Name="WorkflowInstanceID" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Workflow Instance ID"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="WorkflowInstanceID" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{94f89715-e097-4e8b-ba79-ea02aa8b7adb}" Name="FileRef"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" Type="Lookup"' +
            //'                                       DisplayName="URL Path" List="Docs" FieldRef="ID" ShowField="FullUrl"' +
            //'                                       JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FileRef"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{56605df6-8fa1-47e4-a04c-5b384d59609f}" Name="FileDirRef"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" Type="Lookup"' +
            //'                                       DisplayName="Path" List="Docs" FieldRef="ID" ShowField="DirName"' +
            //'                                       JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FileDirRef"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{173f76c8-aebd-446a-9bc9-769a2bd2c18f}" Name="Last_x0020_Modified"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" DisplayName="Modified"' +
            //'                                       Type="Lookup" List="Docs" FieldRef="ID" ShowField="TimeLastModified"' +
            //'                                       Format="TRUE" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="Last_x0020_Modified" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{998b5cff-4a35-47a7-92f3-3914aa6aa4a2}" Name="Created_x0020_Date"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" DisplayName="Created"' +
            //'                                       Type="Lookup" List="Docs" FieldRef="ID" ShowField="TimeCreated" Format="TRUE"' +
            //'                                       JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="Created_x0020_Date" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{30bb605f-5bae-48fe-b4e3-1f81d9772af9}" Name="FSObjType"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE"' +
            //'                                       Type="Lookup" DisplayName="Item Type" List="Docs" FieldRef="ID"' +
            //'                                       ShowField="FSType" JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FSObjType"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{423874f8-c300-4bfb-b7a1-42e2159e3b19}" Name="SortBehavior"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE"' +
            //'                                       Type="Lookup" DisplayName="Sort Type" List="Docs" FieldRef="ID"' +
            //'                                       ShowField="SortBehavior" JoinColName="DoclibRowId" JoinRowOrdinal="0"' +
            //'                                       JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="SortBehavior" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{ba3c27ee-4791-4867-8821-ff99000bac98}" Name="PermMask"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE"' +
            //'                                       RenderXMLUsingPattern="TRUE" ShowInFileDlg="FALSE" Type="Computed"' +
            //'                                       DisplayName="Effective Permissions Mask"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="PermMask"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="ID"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <CurrentRights/>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{8553196d-ec8d-4564-9861-3dbe931050c8}" Hidden="TRUE" ShowInFileDlg="FALSE"' +
            //'                                       ShowInVersionHistory="FALSE" Type="File" Name="FileLeafRef"' +
            //'                                       DisplaceOnUpgrade="TRUE" DisplayName="Name" AuthoringInfo="(for use in forms)"' +
            //'                                       List="Docs" FieldRef="ID" ShowField="LeafName" JoinColName="DoclibRowId"' +
            //'                                       JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="FileLeafRef"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{4b7403de-8d94-43e8-9f0f-137a3e298126}" Name="UniqueId"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE"' +
            //'                                       Type="Lookup" DisplayName="Unique Id" List="Docs" FieldRef="ID"' +
            //'                                       ShowField="UniqueId" JoinColName="DoclibRowId" JoinRowOrdinal="0"' +
            //'                                       JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="UniqueId" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{6d2c4fde-3605-428e-a236-ce5f3dc2b4d4}" Name="SyncClientId"' +
            //'                                       DisplaceOnUpgrade="TRUE" Hidden="TRUE" ReadOnly="TRUE" DisplayName="Client Id"' +
            //'                                       ShowInFileDlg="FALSE" Type="Lookup" List="Docs" FieldRef="ID"' +
            //'                                       ShowField="SyncClientId" JoinColName="DoclibRowId" JoinRowOrdinal="0"' +
            //'                                       JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="SyncClientId" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{c5c4b81c-f1d9-4b43-a6a2-090df32ebb68}" Name="ProgId"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE"' +
            //'                                       Type="Lookup" DisplayName="ProgId" List="Docs" FieldRef="ID" ShowField="ProgId"' +
            //'                                       JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ProgId"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{dddd2420-b270-4735-93b5-92b713d0944d}" Name="ScopeId"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE"' +
            //'                                       Type="Lookup" DisplayName="ScopeId" List="Docs" FieldRef="ID" ShowField="ScopeId"' +
            //'                                       JoinColName="DoclibRowId" JoinRowOrdinal="0" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ScopeId"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ReadOnly="TRUE" ID="{4ef1b78f-fdba-48dc-b8ab-3fa06a0c9804}" Hidden="TRUE"' +
            //'                                       Type="Computed" Name="HTML_x0020_File_x0020_Type" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="HTML File Type"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="HTML_x0020_File_x0020_Type" FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="File_x0020_Type"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern/>' +
            //'                                </Field>' +
            //'                                <Field ID="{3c6303be-e21f-4366-80d7-d6d0a3b22c7a}" Hidden="TRUE" ReadOnly="TRUE"' +
            //'                                       Type="Computed" Name="_EditMenuTableStart" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Edit Menu Table Start" ClassInfo="Menu"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_EditMenuTableStart" FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="FileLeafRef"/>' +
            //'                                        <FieldRef Name="FileDirRef"/>' +
            //'                                        <FieldRef Name="FSObjType"/>' +
            //'                                        <FieldRef Name="ID"/>' +
            //'                                        <FieldRef Name="ServerUrl"/>' +
            //'                                        <FieldRef Name="HTML_x0020_File_x0020_Type"/>' +
            //'                                        <FieldRef Name="File_x0020_Type"/>' +
            //'                                        <FieldRef Name="PermMask"/>' +
            //'                                        <FieldRef Name="_HasCopyDestinations"/>' +
            //'                                        <FieldRef Name="_CopySource"/>' +
            //'                                        <FieldRef Name="ContentType"/>' +
            //'                                        <FieldRef Name="ContentTypeId"/>' +
            //'                                        <FieldRef Name="_ModerationStatus"/>' +
            //'                                        <FieldRef Name="_UIVersion"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <Switch>' +
            //'                                            <Expr>' +
            //'                                                <GetVar Name="MasterVersion"/>' +
            //'                                            </Expr>' +
            //'                                            <Case Value="4">' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[<div class="ms-vb" onmouseover="OnItem(this)" CTXName="ctx]]></HTML>' +
            //'                                            </Case>' +
            //'                                            <Default>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[<table height="100%" cellspacing="0" class="ms-unselectedtitle" onmouseover="OnItem(this)" CTXName="ctx]]></HTML>' +
            //'                                            </Default>' +
            //'                                        </Switch>' +
            //'                                        <Counter Type="View"/>' +
            //'                                        <HTML>" id="</HTML>' +
            //'                                        <Column Name="ID" HTMLEncode="TRUE"/>' +
            //'                                        <HTML>" Url="</HTML>' +
            //'                                        <Field Name="ServerUrl" URLEncodeAsURL="TRUE"/>' +
            //'                                        <HTML>" DRef="</HTML>' +
            //'                                        <Field Name="FileDirRef"/>' +
            //'                                        <HTML>" Perm="</HTML>' +
            //'                                        <Field Name="PermMask"/>' +
            //'                                        <HTML>" type="</HTML>' +
            //'                                        <Column Name="HTML_x0020_File_x0020_Type"/>' +
            //'                                        <HTML>" Ext="</HTML>' +
            //'                                        <Column Name="File_x0020_Type"/>' +
            //'                                        <HTML>" Icon="</HTML>' +
            //'                                        <MapToAll>' +
            //'                                            <Column Name="HTML_x0020_File_x0020_Type"/>' +
            //'                                            <HTML>|</HTML>' +
            //'                                            <Column Name="File_x0020_Type"/>' +
            //'                                        </MapToAll>' +
            //'                                        <HTML>" OType="</HTML>' +
            //'                                        <LookupColumn Name="FSObjType"/>' +
            //'                                        <HTML>" COUId="</HTML>' +
            //'                                        <HTML>" HCD="</HTML>' +
            //'                                        <Column Name="_HasCopyDestinations"/>' +
            //'                                        <HTML>" CSrc="</HTML>' +
            //'                                        <Column Name="_CopySource" URLEncodeAsURL="TRUE"/>' +
            //'                                        <HTML>" MS="</HTML>' +
            //'                                        <Column Name="_ModerationStatus"/>' +
            //'                                        <HTML><![CDATA[" CType="]]></HTML>' +
            //'                                        <Column Name="ContentType" HTMLEncode="TRUE"/>' +
            //'                                        <HTML><![CDATA[" CId="]]></HTML>' +
            //'                                        <Column Name="ContentTypeId"/>' +
            //'                                        <HTML>" UIS="</HTML>' +
            //'                                        <Column Name="_UIVersion"/>' +
            //'                                        <GetVar Name="_EditMenuTableExtra"/>' +
            //'                                        <HTML>" SUrl="</HTML>' +
            //'                                        <Switch>' +
            //'                                            <Expr>' +
            //'                                                <GetVar Name="MasterVersion"/>' +
            //'                                            </Expr>' +
            //'                                            <Case Value="4">' +
            //'                                                <HTML><![CDATA[">]]></HTML>' +
            //'                                            </Case>' +
            //'                                            <Default>' +
            //'                                                <HTML><![CDATA["><tr><td width="100%" class="ms-vb">]]></HTML>' +
            //'                                            </Default>' +
            //'                                        </Switch>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{1344423c-c7f9-4134-88e4-ad842e2d723c}" Hidden="TRUE" ReadOnly="TRUE"' +
            //'                                       Type="Computed" Name="_EditMenuTableStart2" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Edit Menu Table Start" ClassInfo="Menu"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_EditMenuTableStart2" FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="ID"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <Counter Type="View"/>' +
            //'                                        <HTML>" id="</HTML>' +
            //'                                        <Column Name="ID" HTMLEncode="TRUE"/>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{2ea78cef-1bf9-4019-960a-02c41636cb47}" Hidden="TRUE" ReadOnly="TRUE"' +
            //'                                       Type="Computed" Name="_EditMenuTableEnd" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Edit Menu Table End" ClassInfo="Menu"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_EditMenuTableEnd" FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="ID"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <Switch>' +
            //'                                            <Expr>' +
            //'                                                <GetVar Name="MasterVersion"/>' +
            //'                                            </Expr>' +
            //'                                            <Case Value="4">' +
            //'                                                <HTML><![CDATA[</div>]]></HTML>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML>' +
            //'                                                <HTML><![CDATA[<span>&nbsp;</span>]]></HTML>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML>' +
            //'                                                <HTML><![CDATA[<span>&nbsp;</span>]]></HTML>' +
            //'                                                <HTML><![CDATA[</div>]]></HTML>' +
            //'                                            </Case>' +
            //'                                            <Default>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[</td><td><img src="/_layouts/images/blank.gif" width="13" style="visibility:hidden" alt=""/></td></tr></table>]]></HTML>' +
            //'                                            </Default>' +
            //'                                        </Switch>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{5cc6dc79-3710-4374-b433-61cb4a686c12}" ReadOnly="TRUE" Type="Computed"' +
            //'                                       Name="LinkFilename" DisplaceOnUpgrade="TRUE" Hidden="TRUE" DisplayName="Name"' +
            //'                                       DisplayNameSrcField="FileLeafRef" Filterable="FALSE" ClassInfo="Menu"' +
            //'                                       AuthoringInfo="(linked to document with edit menu)"' +
            //'                                       ListItemMenuAllowed="Required" LinkToItemAllowed="Prohibited"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkFilename"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="LinkFilenameNoMenu"/>' +
            //'                                        <FieldRef Name="_EditMenuTableStart2"/>' +
            //'                                        <FieldRef Name="_EditMenuTableEnd"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <FieldSwitch>' +
            //'                                            <Expr>' +
            //'                                                <GetVar Name="FreeForm"/>' +
            //'                                            </Expr>' +
            //'                                            <Case Value="TRUE">' +
            //'                                                <Field Name="LinkFilenameNoMenu"/>' +
            //'                                            </Case>' +
            //'                                            <Default>' +
            //'                                                <Switch>' +
            //'                                                    <Expr>' +
            //'                                                        <GetVar Name="MasterVersion"/>' +
            //'                                                    </Expr>' +
            //'                                                    <Case Value="4">' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<div class="ms-vb itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML>' +
            //'                                                        <Field Name="_EditMenuTableStart2"/>' +
            //'                                                        <HTML><![CDATA[">]]></HTML>' +
            //'                                                        <Field Name="LinkFilenameNoMenu"/>' +
            //'                                                        <HTML><![CDATA[</div>]]></HTML>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML>' +
            //'                                                        <HTML><![CDATA[<span>&nbsp;</span>]]></HTML>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML>' +
            //'                                                        <HTML><![CDATA[<span>&nbsp;</span>]]></HTML>' +
            //'                                                        <HTML><![CDATA[</div>]]></HTML>' +
            //'                                                    </Case>' +
            //'                                                    <Default>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[<table height="100%" cellspacing="0" class="ms-unselectedtitle itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML>' +
            //'                                                        <Field Name="_EditMenuTableStart2"/>' +
            //'                                                        <HTML><![CDATA["><tr><td width="100%" class="ms-vb">]]></HTML>' +
            //'                                                        <SetVar Name="ShowAccessibleIcon" Value="1"/>' +
            //'                                                        <Field Name="LinkFilenameNoMenu"/>' +
            //'                                                        <SetVar Name="ShowAccessibleIcon" Value="0"/>' +
            //'                                                        <HTML>' +
            //'                                                            <![CDATA[</td><td><img src="/_layouts/images/blank.gif" width="13" style="visibility:hidden" alt=""/></td></tr></table>]]></HTML>' +
            //'                                                    </Default>' +
            //'                                                </Switch>' +
            //'                                            </Default>' +
            //'                                        </FieldSwitch>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{224ba411-da77-4050-b0eb-62d422f13d3e}" Hidden="TRUE" ReadOnly="TRUE"' +
            //'                                       Type="Computed" Name="LinkFilename2" DisplaceOnUpgrade="TRUE" DisplayName="Name"' +
            //'                                       DisplayNameSrcField="FileLeafRef" Filterable="FALSE" ClassInfo="Menu"' +
            //'                                       AuthoringInfo="(linked to document with edit menu) (old)"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkFilename2"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="LinkFilenameNoMenu"/>' +
            //'                                        <FieldRef Name="_EditMenuTableStart"/>' +
            //'                                        <FieldRef Name="_EditMenuTableEnd"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <FieldSwitch>' +
            //'                                            <Expr>' +
            //'                                                <GetVar Name="FreeForm"/>' +
            //'                                            </Expr>' +
            //'                                            <Case Value="TRUE">' +
            //'                                                <Field Name="LinkFilenameNoMenu"/>' +
            //'                                            </Case>' +
            //'                                            <Default>' +
            //'                                                <Field Name="_EditMenuTableStart"/>' +
            //'                                                <SetVar Name="ShowAccessibleIcon" Value="1"/>' +
            //'                                                <Field Name="LinkFilenameNoMenu"/>' +
            //'                                                <SetVar Name="ShowAccessibleIcon" Value="0"/>' +
            //'                                                <Field Name="_EditMenuTableEnd"/>' +
            //'                                            </Default>' +
            //'                                        </FieldSwitch>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{081c6e4c-5c14-4f20-b23e-1a71ceb6a67c}" Type="Computed" ReadOnly="TRUE"' +
            //'                                       Name="DocIcon" DisplaceOnUpgrade="TRUE" DisplayName="Type" TextOnly="TRUE"' +
            //'                                       ClassInfo="Icon" AuthoringInfo="(icon linked to document)"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="DocIcon"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="File_x0020_Type"/>' +
            //'                                        <FieldRef Name="FSObjType"/>' +
            //'                                        <FieldRef Name="FileRef"/>' +
            //'                                        <FieldRef Name="FileLeafRef"/>' +
            //'                                        <FieldRef Name="HTML_x0020_File_x0020_Type"/>' +
            //'                                        <FieldRef Name="PermMask"/>' +
            //'                                        <FieldRef Name="IconOverlay"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <SetVar Name="DocIconImg">' +
            //'                                            <SetVar Name="DocIconAltText">' +
            //'                                                <IfEqual>' +
            //'                                                    <Expr1>' +
            //'                                                        <LookupColumn Name="FSObjType"/>' +
            //'                                                    </Expr1>' +
            //'                                                    <Expr2>1</Expr2>' +
            //'                                                    <Then>' +
            //'                                                        <IfSubString>' +
            //'                                                            <Expr1>0x0120D5</Expr1>' +
            //'                                                            <Expr2>' +
            //'                                                                <Column Name="ContentTypeId"/>' +
            //'                                                            </Expr2>' +
            //'                                                            <Then>' +
            //'                                                                <HTML>Document Collection:</HTML>' +
            //'                                                                <LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/>' +
            //'                                                            </Then>' +
            //'                                                            <Else>' +
            //'                                                                <HTML>Folder:</HTML>' +
            //'                                                                <LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/>' +
            //'                                                            </Else>' +
            //'                                                        </IfSubString>' +
            //'                                                    </Then>' +
            //'                                                    <Else>' +
            //'                                                        <LookupColumn Name="Title" HTMLEncode="TRUE"/>' +
            //'                                                    </Else>' +
            //'                                                </IfEqual>' +
            //'                                            </SetVar>' +
            //'                                            <SetVar Name="DocIconFileName">' +
            //'                                                <IfEqual>' +
            //'                                                    <Expr1>' +
            //'                                                        <Column Name="IconOverlay"/>' +
            //'                                                    </Expr1>' +
            //'                                                    <Expr2/>' +
            //'                                                    <Then>' +
            //'                                                        <IfEqual>' +
            //'                                                            <Expr1>' +
            //'                                                                <LookupColumn Name="FSObjType"/>' +
            //'                                                            </Expr1>' +
            //'                                                            <Expr2>1</Expr2>' +
            //'                                                            <Then>' +
            //'                                                                <IfEqual>' +
            //'                                                                    <Expr1>' +
            //'                                                                        <Column Name="HTML_x0020_File_x0020_Type"/>' +
            //'                                                                        <HTML>|</HTML>' +
            //'                                                                        <Column Name="File_x0020_Type"/>' +
            //'                                                                    </Expr1>' +
            //'                                                                    <Expr2>' +
            //'                                                                        <HTML>|</HTML>' +
            //'                                                                    </Expr2>' +
            //'                                                                    <Then>' +
            //'                                                                        <HTML>folder.gif</HTML>' +
            //'                                                                    </Then>' +
            //'                                                                    <Else>' +
            //'                                                                        <SetVar Name="FolderIconFromMap">' +
            //'                                                                            <MapToIcon>' +
            //'                                                                                <Column Name="HTML_x0020_File_x0020_Type"/>' +
            //'                                                                                <HTML>|</HTML>' +
            //'                                                                                <Column Name="File_x0020_Type"/>' +
            //'                                                                            </MapToIcon>' +
            //'                                                                        </SetVar>' +
            //'                                                                        <IfEqual>' +
            //'                                                                            <Expr1>' +
            //'                                                                                <GetVar Name="FolderIconFromMap"/>' +
            //'                                                                            </Expr1>' +
            //'                                                                            <Expr2>' +
            //'                                                                                <MapToIcon/>' +
            //'                                                                            </Expr2>' +
            //'                                                                            <Then>' +
            //'                                                                                <HTML>folder.gif</HTML>' +
            //'                                                                            </Then>' +
            //'                                                                            <Else>' +
            //'                                                                                <GetVar Name="FolderIconFromMap"/>' +
            //'                                                                            </Else>' +
            //'                                                                        </IfEqual>' +
            //'                                                                    </Else>' +
            //'                                                                </IfEqual>' +
            //'                                                            </Then>' +
            //'                                                            <Else>' +
            //'                                                                <MapToIcon>' +
            //'                                                                    <Column Name="HTML_x0020_File_x0020_Type"/>' +
            //'                                                                    <HTML>|</HTML>' +
            //'                                                                    <Column Name="File_x0020_Type"/>' +
            //'                                                                </MapToIcon>' +
            //'                                                            </Else>' +
            //'                                                        </IfEqual>' +
            //'                                                    </Then>' +
            //'                                                    <Else>' +
            //'                                                        <MapToIcon>' +
            //'                                                            <Column Name="IconOverlay"/>' +
            //'                                                        </MapToIcon>' +
            //'                                                    </Else>' +
            //'                                                </IfEqual>' +
            //'                                            </SetVar>' +
            //'                                            <HTML><![CDATA[<img border="0" alt="]]></HTML>' +
            //'                                            <GetVar Name="DocIconAltText"/>' +
            //'                                            <HTML><![CDATA[" title="]]></HTML>' +
            //'                                            <GetVar Name="DocIconAltText"/>' +
            //'                                            <HTML><![CDATA[" src="/_layouts/images/]]></HTML>' +
            //'                                            <GetVar Name="DocIconFileName"/>' +
            //'                                            <HTML><![CDATA[" />]]></HTML>' +
            //'                                        </SetVar>' +
            //'                                        <SetVar Name="DocIconOverlayImg">' +
            //'                                            <IfEqual>' +
            //'                                                <Expr1>' +
            //'                                                    <Column Name="IconOverlay"/>' +
            //'                                                </Expr1>' +
            //'                                                <Expr2/>' +
            //'                                                <Then/>' +
            //'                                                <Else>' +
            //'                                                    <HTML>' +
            //'                                                        <![CDATA[<img class="ms-vb-icon-overlay" alt="*" src="/_layouts/images/]]></HTML>' +
            //'                                                    <MapToOverlay>' +
            //'                                                        <Column Name="IconOverlay"/>' +
            //'                                                    </MapToOverlay>' +
            //'                                                    <HTML><![CDATA[" />]]></HTML>' +
            //'                                                </Else>' +
            //'                                            </IfEqual>' +
            //'                                        </SetVar>' +
            //'                                        <IfEqual>' +
            //'                                            <Expr1>' +
            //'                                                <LookupColumn Name="FSObjType"/>' +
            //'                                            </Expr1>' +
            //'                                            <Expr2>1</Expr2>' +
            //'                                            <Then>' +
            //'                                                <FieldSwitch>' +
            //'                                                    <Expr>' +
            //'                                                        <GetVar Name="RecursiveView"/>' +
            //'                                                    </Expr>' +
            //'                                                    <Case Value="1">' +
            //'                                                        <GetVar Name="DocIconImg"/>' +
            //'                                                        <GetVar Name="DocIconOverlayImg"/>' +
            //'                                                    </Case>' +
            //'                                                    <Default>' +
            //'                                                        <SetVar Name="UnencodedFilterLink">' +
            //'                                                            <SetVar Name="RootFolder">' +
            //'                                                                <HTML>/</HTML>' +
            //'                                                                <LookupColumn Name="FileRef"/>' +
            //'                                                            </SetVar>' +
            //'                                                            <SetVar Name="SkipHost">1</SetVar>' +
            //'                                                            <SetVar Name="FolderCTID">' +
            //'                                                                <FieldSwitch>' +
            //'                                                                    <Expr>' +
            //'                                                                        <ListProperty Select="EnableContentTypes"/>' +
            //'                                                                    </Expr>' +
            //'                                                                    <Case Value="1">' +
            //'                                                                        <Column Name="ContentTypeId"/>' +
            //'                                                                    </Case>' +
            //'                                                                </FieldSwitch>' +
            //'                                                            </SetVar>' +
            //'                                                            <FilterLink Default="" Paged="FALSE"/>' +
            //'                                                        </SetVar>' +
            //'                                                        <FieldSwitch>' +
            //'                                                            <Expr>' +
            //'                                                                <GetVar Name="FileDialog"/>' +
            //'                                                            </Expr>' +
            //'                                                            <Case Value="1">' +
            //'                                                                <GetVar Name="DocIconImg"/>' +
            //'                                                                <GetVar Name="DocIconOverlayImg"/>' +
            //'                                                            </Case>' +
            //'                                                            <Default>' +
            //'                                                                <HTML><![CDATA[<a href="]]></HTML>' +
            //'                                                                <GetVar Name="UnencodedFilterLink" HTMLEncode="TRUE"/>' +
            //'                                                                <HTML>' +
            //'                                                                    <![CDATA[" onclick="javascript:EnterFolder(\']]></HTML>' +
            //'                                                                <ScriptQuote NotAddingQuote="TRUE">' +
            //'                                                                    <GetVar Name="UnencodedFilterLink"/>' +
            //'                                                                </ScriptQuote>' +
            //'                                                                <HTML><![CDATA[\');javascript:return false;">]]></HTML>' +
            //'                                                                <GetVar Name="DocIconImg"/>' +
            //'                                                                <GetVar Name="DocIconOverlayImg"/>' +
            //'                                                                <HTML><![CDATA[</a>]]></HTML>' +
            //'                                                            </Default>' +
            //'                                                        </FieldSwitch>' +
            //'                                                    </Default>' +
            //'                                                </FieldSwitch>' +
            //'                                            </Then>' +
            //'                                            <Else>' +
            //'                                                <HTML><![CDATA[<a onfocus="OnLink(this)" href="]]></HTML>' +
            //'                                                <URL/>' +
            //'                                                <HTML>' +
            //'                                                    <![CDATA[" onclick="GoToLink(this);return false;" target="_self">]]></HTML>' +
            //'                                                <GetVar Name="DocIconImg"/>' +
            //'                                                <GetVar Name="DocIconOverlayImg"/>' +
            //'                                                <HTML><![CDATA[</a>]]></HTML>' +
            //'                                            </Else>' +
            //'                                        </IfEqual>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{105f76ce-724a-4bba-aece-f81f2fce58f5}" ReadOnly="TRUE" Hidden="TRUE"' +
            //'                                       Type="Computed" Name="ServerUrl" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Server Relative URL" Filterable="FALSE" RenderXMLUsingPattern="TRUE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="ServerUrl"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="FileRef"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <HTML>/</HTML>' +
            //'                                        <LookupColumn Name="FileRef"/>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{7177cfc7-f399-4d4d-905d-37dd51bc90bf}" ReadOnly="TRUE" Hidden="TRUE"' +
            //'                                       Type="Computed" Name="EncodedAbsUrl" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Encoded Absolute URL" Filterable="FALSE"' +
            //'                                       RenderXMLUsingPattern="TRUE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="EncodedAbsUrl"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="FileRef"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <HttpHost URLEncodeAsURL="TRUE"/>' +
            //'                                        <HTML>/</HTML>' +
            //'                                        <LookupColumn Name="FileRef" IncludeVersions="TRUE" URLEncodeAsURL="TRUE"/>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{7615464b-559e-4302-b8e2-8f440b913101}" ReadOnly="TRUE" Hidden="TRUE"' +
            //'                                       Type="Computed" Name="BaseName" DisplaceOnUpgrade="TRUE" DisplayName="File Name"' +
            //'                                       Filterable="FALSE" RenderXMLUsingPattern="TRUE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="BaseName"' +
            //'                                       FromBaseType="TRUE">' +
            //'                                    <FieldRefs>' +
            //'                                        <FieldRef Name="FileLeafRef"/>' +
            //'                                        <FieldRef Name="FSObjType"/>' +
            //'                                    </FieldRefs>' +
            //'                                    <DisplayPattern>' +
            //'                                        <IfEqual>' +
            //'                                            <Expr1>' +
            //'                                                <LookupColumn Name="FSObjType"/>' +
            //'                                            </Expr1>' +
            //'                                            <Expr2>1</Expr2>' +
            //'                                            <Then>' +
            //'                                                <LookupColumn Name="FileLeafRef" HTMLEncode="TRUE"/>' +
            //'                                            </Then>' +
            //'                                            <Else>' +
            //'                                                <UrlBaseName HTMLEncode="TRUE">' +
            //'                                                    <LookupColumn Name="FileLeafRef"/>' +
            //'                                                </UrlBaseName>' +
            //'                                            </Else>' +
            //'                                        </IfEqual>' +
            //'                                    </DisplayPattern>' +
            //'                                </Field>' +
            //'                                <Field ID="{687c7f94-686a-42d3-9b67-2782eac4b4f8}" Name="MetaInfo"' +
            //'                                       DisplaceOnUpgrade="TRUE" Hidden="TRUE" ShowInFileDlg="FALSE" Type="Lookup"' +
            //'                                       DisplayName="Property Bag" List="Docs" FieldRef="ID" ShowField="MetaInfo"' +
            //'                                       JoinColName="DoclibRowId" JoinType="INNER"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="MetaInfo"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{43bdd51b-3c5b-4e78-90a8-fb2087f71e70}" ColName="tp_Level" RowOrdinal="0"' +
            //'                                       ReadOnly="TRUE" Type="Integer" Name="_Level" DisplaceOnUpgrade="TRUE"' +
            //'                                       DisplayName="Level" Hidden="TRUE" Required="FALSE"' +
            //'                                       SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="_Level"' +
            //'                                       FromBaseType="TRUE"/>' +
            //'                                <Field ID="{c101c3e7-122d-4d4d-bc34-58e94a38c816}" ColName="tp_IsCurrentVersion"' +
            //'                                       DisplaceOnUpgrade="TRUE" RowOrdinal="0" ReadOnly="TRUE" Type="Boolean"' +
            //'                                       Name="_IsCurrentVersion" DisplayName="Is Current Version" Hidden="TRUE"' +
            //'                                       Required="FALSE" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="_IsCurrentVersion" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{b824e17e-a1b3-426e-aecf-f0184d900485}" Name="ItemChildCount"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" ShowInFileDlg="FALSE" Type="Lookup"' +
            //'                                       DisplayName="Item Child Count" List="Docs" FieldRef="ID"' +
            //'                                       ShowField="ItemChildCount" JoinColName="DoclibRowId" JoinRowOrdinal="0"' +
            //'                                       JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="ItemChildCount" FromBaseType="TRUE"/>' +
            //'                                <Field ID="{960ff01f-2b6d-4f1b-9c3f-e19ad8927341}" Name="FolderChildCount"' +
            //'                                       DisplaceOnUpgrade="TRUE" ReadOnly="TRUE" ShowInFileDlg="FALSE" Type="Lookup"' +
            //'                                       DisplayName="Folder Child Count" List="Docs" FieldRef="ID"' +
            //'                                       ShowField="FolderChildCount" JoinColName="DoclibRowId" JoinRowOrdinal="0"' +
            //'                                       JoinType="INNER" SourceID="http://schemas.microsoft.com/sharepoint/v3"' +
            //'                                       StaticName="FolderChildCount" FromBaseType="TRUE"/>' +
            //'                            </Fields>' +
            //'                            <RegionalSettings>' +
            //'                                <Language>1033</Language>' +
            //'                                <Locale>1033</Locale>' +
            //'                                <AdvanceHijri>0</AdvanceHijri>' +
            //'                                <CalendarType>1</CalendarType>' +
            //'                                <Time24>False</Time24>' +
            //'                                <TimeZone>300</TimeZone>' +
            //'                                <SortOrder>2070</SortOrder>' +
            //'                                <Presence>True</Presence>' +
            //'                            </RegionalSettings>' +
            //'                            <ServerSettings>' +
            //'                                <ServerVersion>14.0.4762.1000</ServerVersion>' +
            //'                                <RecycleBinEnabled>True</RecycleBinEnabled>' +
            //'                                <ServerRelativeUrl>/OneAppData</ServerRelativeUrl>' +
            //'                            </ServerSettings>' +
            //'                        </List>' +
            //'                    </Changes>' +
            //'                    <rs:data ItemCount="2">' +
            //'                        <z:row ows_Attachments="0" ows_LinkTitle="Mock 1" ows_Boolean="1"' +
            //'                               ows_Currency="15.0000000000000" ows_Date="2014-08-19 00:00:00"' +
            //'                               ows_DateTime="2014-08-13 06:30:00" ows_Integer="12.0000000000000"' +
            //'                               ows_JSON="&quot;{test: \'val\'}&quot;" ows_Lookup="1;#Lookup 1"' +
            //'                               ows_LookupMulti="2;#Lookup 2;#3;#Lookup 3" ows_User="338;#Scott Peterson"' +
            //'                               ows_UserMulti="205;#Russ Peterson;#338;#Scott Peterson" ows_Calculated="string;#Mock 1"' +
            //'                               ows_Choice="Option 1" ows_MultiChoice=";#Defined Choice 3;#Custom 1;#"' +
            //'                               ows__ModerationStatus="0" ows__Level="1"' +
            //'                               ows_UniqueId="1;#{DA3FA45D-D874-4C73-AAE5-61556D3E3A79}" ows_FSObjType="1;#0"' +
            //'                               ows_Created_x0020_Date="1;#2014-08-19 15:41:21" ows_FileLeafRef="1;#1_.000"' +
            //'                               ows_PermMask="0x7fffffffffffffff" ows_Modified="2014-08-19 18:34:41"' +
            //'                               ows_FileRef="1;#OneAppData/Lists/MockList/1_.000" ows_Title="Mock 1" ows_ID="1"' +
            //'                               ows_owshiddenversion="3" ows_Created="2014-08-19 15:41:21"/>' +
            //'                        <z:row ows_Attachments="0" ows_LinkTitle="Mock 2" ows_Boolean="0"' +
            //'                               ows_Currency="19.0000000000000" ows_Date="2014-08-19 00:00:00"' +
            //'                               ows_DateTime="2014-08-29 07:20:00" ows_Integer="55.0000000000000"' +
            //'                               ows_JSON="[&quot;{test: \'another val\'}&quot;]" ows_Lookup="2;#Lookup 2" ows_LookupMulti="3;#Lookup 3"' +
            //'                               ows_UserMulti="338;#Scott Peterson" ows_Calculated="string;#Mock 2" ows_Choice="Option 3"' +
            //'                               ows_MultiChoice=";#Defined Choice 2;#Defined Choice 3;#Another Custom Choice;#"' +
            //'                               ows__ModerationStatus="0" ows__Level="1"' +
            //'                               ows_UniqueId="2;#{47ED93B6-F6EE-439E-8ED5-E1BF04207DF1}" ows_FSObjType="2;#0"' +
            //'                               ows_Created_x0020_Date="2;#2014-08-19 15:43:05" ows_FileLeafRef="2;#2_.000"' +
            //'                               ows_PermMask="0x7fffffffffffffff" ows_Modified="2014-08-19 18:35:26"' +
            //'                               ows_FileRef="2;#OneAppData/Lists/MockList/2_.000" ows_Title="Mock 2" ows_ID="2"' +
            //'                               ows_owshiddenversion="2" ows_Created="2014-08-19 15:43:05"/>' +
            //'                    </rs:data>' +
            //'                </listitems>' +
            //'            </GetListItemChangesSinceTokenResult>' +
            //'        </GetListItemChangesSinceTokenResponse>' +
            //'    </soap:Body>' +
            //'</soap:Envelope>';
        }


    })
;