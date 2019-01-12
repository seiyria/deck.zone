
import { values } from 'lodash';
import * as JSZip from 'jszip/dist/jszip.min.js';
import { saveAs } from 'file-saver';

import { Component, Input } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Project } from '../project.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-toolbar',
  templateUrl: './create-toolbar.component.html',
  styleUrls: ['./create-toolbar.component.scss']
})
export class CreateToolbarComponent {

  @Input()
  public projectId: string;

  @Input()
  public project: Project;

  @LocalStorage()
  public hideResult: boolean;

  @LocalStorage()
  public hideSidebar: boolean;

  constructor(public authService: AuthService) { }

  private replaceName(filename) { return filename; }

  download() {
    const zip = new JSZip();

    values(this.project.scripts).forEach(script => {
      zip.file(this.replaceName(script.name), script.contents);
    });

    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        saveAs(blob, `${this.project.name}-${Date.now()}.zip`);
      });
  }

}
