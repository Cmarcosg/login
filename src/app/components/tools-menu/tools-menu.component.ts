import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from '../../services/storage-service/storage.service';
import { MainModalsService } from '../../services/main-modals-service/main-modals.service';
import { ModalsService } from '../../services/modals-service/modals.service';
import { DocumentsService } from '../../services/documents-service/documents.service';
import { ElementsAndPagination } from '../../models/elements-and-pagination/elements-and-pagination.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NewExpedientExportServiceService } from '../../services/new-expedient-export-service/new-expedient-export-service.service';

@Component({
  selector: 'tools-main',
  templateUrl: './tools-menu.component.html',
  styleUrls: ['./tools-menu.component.scss'],
})
export class ToolsMenuComponent implements OnInit {
  @Input() itemsList;
  @Input() isEditMode = false;
  @Input() documentInfo = undefined;
  @Input() documentDocumentation = undefined;
  @Output() clickItem = new EventEmitter<string>();

  selectedDocument = [];
  viewType;
  elements: ElementsAndPagination = {
    elementsPage: 0,
    totalElements: 5,
    page: 1,
  };
  constructor(
    private readonly storageService: StorageService,
    private readonly mainModalsService: MainModalsService,
    private modalsService: ModalsService,
    private documentsService: DocumentsService,
    private translateService: TranslateService,
    public router: Router,
    public newExpedientExportService: NewExpedientExportServiceService
  ) {}

  ngOnInit() {
    this.subscribeToViewType();
    this.subscribeToSelectedDocument();
  }

  subscribeToSelectedDocument() {
    this.storageService.getRecordSelectedObservable().subscribe(document => {
      this.selectedDocument = document;
    });
  }

  subscribeToViewType() {
    this.storageService.getStoreData().subscribe(data => {
      if (this.viewType !== data.viewMode && !this.isEditMode) {
        this.selectedDocument = [];
        this.viewType = data.viewMode;
      }
    });
  }

  public getClasses(item) {
    return {
      disabled: !this.isActive(item),
    };
  }

  private isActive(item): boolean {
    return !!item.isActive
      ? item.isActive({
          documentSelected: this.selectedDocument,
          documentation: this.documentDocumentation,
        })
      : true;
  }

  public hasSomeDocumentSelected(): boolean {
    return this.selectedDocument.length !== 0 || this.isEditMode;
  }

  public onClick(item) {
    if (!!item.onClick && this.isActive(item)) {
      if (!this.isEditMode) {
        this.clickItem.emit(this.translateService.instant(item.name));
      }
      item.onClick({
        mainModalsService: this.mainModalsService,
        modalsService: this.modalsService,
        selectedDocument: this.selectedDocument,
        documentsService: this.documentsService,
        elements: this.elements,
        router: this.router,
        newExportRecord: '',
        newExpedientExportService: this.newExpedientExportService,
        documentInfo: this.documentInfo
      });
    }
  }
}
