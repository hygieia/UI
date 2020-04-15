
Infrastructure As Code : Change Release Details
Is this a Change or Addition: An Addition
What has been added : A Widget on dashboard view page. 
What kind of Widget : A widget to support the terraform cloud app collector details
What is included in Widget: Card Chart , Bar and line chart to show the terraform cloud app details like the Organization, workspace and the job details. Also the Bar and line chart shows the details about the various status of the jobs over a period of time
What files has been changed : Two core files
1. shared.module : The Component classes are imported and added as declarations & entry components
2. dashboard-view: An entry is made for Terraform collector as Infrastrucre as code
3. infrastructure-as-code : The folder and the chart components are added as seperate class componets and they are imported in iac-widget.component
The above is added as a widget folder to widgets folder

Which chart library is used : ngx chart
How the code is organized : As a rule the config form and widget component are pretty much doing the same as expected.
There is an addition of iac-master.component, which is made the parent for all the child the chart components. At the same time we have custom components like drop downs, the use cases are covered in the respective classes


Do we have a  seperate collector created to support the widget :
Yes we have created a terraform collector : https://github.com/Hygieia/hygieia-iac-terraform-collector
An enum as "ÏnfrastructureAsCode" is added
Are there any open questions:
1. Yes I need to know the upsert widget method, as when I passed the config , it does not return any result, So would like to know the logic with it 
2.There is a pop up opening, how to bypass it
 
