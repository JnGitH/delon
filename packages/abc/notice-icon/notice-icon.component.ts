import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DelonLocaleService } from '@delon/theme';
import { InputBoolean, InputNumber } from '@delon/util';
import { Subscription } from 'rxjs';

import { NzDropDownComponent } from 'ng-zorro-antd';
import { NoticeIconSelect, NoticeItem } from './notice-icon.types';

@Component({
  selector: 'notice-icon',
  templateUrl: './notice-icon.component.html',
  host: { '[class.notice-icon__btn]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeIconComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private i18n$: Subscription;
  // tslint:disable-next-line:no-any
  locale: any = {};

  @Input() data: NoticeItem[] = [];
  @Input() @InputNumber() count: number;
  @Input() @InputBoolean() loading = false;
  @Input() @InputBoolean() popoverVisible = false;
  @Output() readonly select = new EventEmitter<NoticeIconSelect>();
  @Output() readonly clear = new EventEmitter<string>();
  @Output() readonly popoverVisibleChange = new EventEmitter<boolean>();

  @ViewChild(NzDropDownComponent) ddc: NzDropDownComponent;

  constructor(private i18n: DelonLocaleService, private cdr: ChangeDetectorRef) { }

  onVisibleChange(result: boolean) {
    this.popoverVisibleChange.emit(result);
  }

  onSelect(i: NoticeIconSelect) {
    this.select.emit(i);
  }

  onClear(title: string) {
    this.clear.emit(title);
  }

  ngOnInit() {
    this.i18n$ = this.i18n.change.subscribe(() => {
      this.locale = this.i18n.getData('noticeIcon');
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.ddc.cdkOverlay.panelClass = ['header-dropdown', 'notice-icon'];
  }

  ngOnChanges() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.i18n$.unsubscribe();
  }
}
