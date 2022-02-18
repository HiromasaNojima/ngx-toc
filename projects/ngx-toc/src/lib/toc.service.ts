import {  Injectable, Renderer2 } from '@angular/core';
import { TocCompositeFactory } from './toc-composite';

@Injectable({
  providedIn: 'root'
})
export class TocService {

  private headingTags: ReadonlySet<string> = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

  constructor() { }

  createToc(targetId: string, targetHeadings: string[], path: string, renderer: Renderer2): HTMLElement{
    this.validateTargetHeadings(targetHeadings);
    let target = document.getElementById(targetId);
    if (!target) {
      throw new Error(`[ngx-toc] failed to get element by id. targetId = ${targetId}`);
    }

    let headings = target.querySelectorAll<HTMLElement>(targetHeadings.toString());
    if (!headings || headings.length === 0) {
      throw new Error(`[ngx-toc] there are no heading elements. targetId = ${targetId}`);
    }

    return new TocCompositeFactory(headings, path).createToc().toHtml(renderer);
  }

  private validateTargetHeadings(targetHeadings: string[]) {
    targetHeadings.forEach(e => {
      if(!this.headingTags.has(e)) {
        throw new Error(`[ngx-toc] targetHeadings has not-heading tag. targetHeadings = ${targetHeadings}, invalid element = ${e}. acceptable tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']`);
      }
    });
  }

}