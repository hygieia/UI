import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { CollectorService } from 'src/app/shared/collector.service';
import { DashboardService } from 'src/app/shared/dashboard.service';

@Component({
  selector: 'app-feature-config-form',
  templateUrl: './feature-config-form.component.html',
  styleUrls: ['./feature-config-form.component.scss']
})
export class FeatureConfigFormComponent implements OnInit {

  private widgetConfigId: string;
  private componentId: string;

  featureConfigForm: FormGroup;
  searching = false;
  searchFailed = false;
  typeAheadResults: (text$: Observable<string>) => Observable<any>;

  public featureToolTypes;
  public sprintTypes;
  public featureTypes;

  getProjectName = (collectorItem: any) => {
    if (!collectorItem) {
      return '';
    }
    const name = (collectorItem.projectName as string);
    return name;
  };

  getTeamName = (collectorItem) => {
    if (!collectorItem) {
      return '';
    }
    const description = (collectorItem.options.teamName as string);
    return description;
  };

  // Agile Content Tool Type:
  //   VersionOne
  // Jira
  //
  // Project Name:
  //   Drop down
  //
  // Team Name: drop down
  //
  // Sprint Type:
  //   Kanban
  // Scrum
  // Both
  //
  // List Feature Type:
  //   Epics
  // Issues

  // Agile Content Tool Type: options.featureTool
  // Project Name: options.projectName
  // Team Name: options.teamName
  // Sprint Type: options.showStatus = true or false for kanban, scrum OR sprintType
  // Feature Type: options.listType
  @Input()
  set widgetConfig(widgetConfig: any) {
    if (!widgetConfig) {
      return;
    }
    console.log(widgetConfig.options);
    this.widgetConfigId = widgetConfig.options.id;
    this.featureConfigForm.get('featureTool').setValue(widgetConfig.options.featureTool);
    this.featureConfigForm.get('projectName').setValue(widgetConfig.options.projectName);
    this.featureConfigForm.get('teamName').setValue(widgetConfig.options.teamName);
    this.featureConfigForm.get('sprintType').setValue(widgetConfig.options.showStatus);
    this.featureConfigForm.get('listType').setValue(widgetConfig.options.listType);
    this.featureToolTypes = ['Jira', 'VersionOne'];
    this.featureTypes = ['epics','issues'];
    this.sprintTypes = ['kanban','scrum','both'];
  }

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private collectorService: CollectorService,
    private dashboardService: DashboardService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.typeAheadResults = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        switchMap(term => {
          return term.length < 2 ? of([]) :
            this.collectorService.searchItems('feature', term).pipe(
              tap(() => this.searchFailed = false),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              }));
        }),
        tap(() => this.searching = false)
      );

    this.loadSavedFeatureDetails();
    this.getDashboardComponent();
  }

  private createForm() {
    this.featureConfigForm = this.formBuilder.group({
      featureTool: '',
      projectName: '',
      teamName: '',
      sprintType: '',
      listType: ''
    });
  }

  // id: '5b2aa4232dbb6e05ecb9b55a',
  // name: 'feature',
  // componentId: '59f88f5e6a3cf205f312c62e',
  // options: {
  //   id: 'feature0',
  //   featureTool: 'Jira',
  //   teamName: 'My Team',
  //   teamId: '16910',
  //   projectName: 'MY ART',
  //   projectId: '138300',
  //   showStatus: {
  //     kanban: true,
  //     scrum: false
  //   },
  //   estimateMetricType: 'storypoints',
  //   sprintType: 'kanban',
  //   listType: 'issues'
  private submitForm() {
    const newConfig = {
      name: 'feature',
      componentId: this.componentId,
      options: {
        id: this.widgetConfigId,
        featureTool: this.featureConfigForm.value.featureTool,
        projectName: this.featureConfigForm.value.projectName,
        teamName: this.featureConfigForm.value.teamName,
        sprintType: this.featureConfigForm.value.sprintType,
        listType: this.featureConfigForm.value.listType

      },
    };
    this.activeModal.close(newConfig);
  }

  private loadSavedFeatureDetails() {
    this.dashboardService.dashboardConfig$.pipe(take(1),
      map(dashboard => {
        const featureCollector = dashboard.application.components[0].collectorItems.AgileTool;
        if (featureCollector[0].id) {
          return featureCollector[0].id;
        }
        return null;
      }),
      switchMap(featureId => {
        if (featureId) {
          return this.collectorService.getItemsById(featureId);
        }
        return of(null);
      })).subscribe(collectorData => {
        this.featureConfigForm.get('featureTool').setValue(collectorData);
        this.featureConfigForm.get('projectName').setValue(collectorData);
        this.featureConfigForm.get('teamName').setValue(collectorData);
        this.featureConfigForm.get('sprintType').setValue(collectorData);
        this.featureConfigForm.get('listType').setValue(collectorData);
    });
  }

  private getDashboardComponent() {
    this.dashboardService.dashboardConfig$.pipe(take(1),
      map(dashboard => {
        return dashboard.application.components[0].id;
      })).subscribe(componentId => this.componentId = componentId);
  }
}
