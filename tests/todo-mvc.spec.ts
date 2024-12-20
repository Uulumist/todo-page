import {test, expect} from '@playwright/test';
import {TodoPage} from "./pages/todo-page";

let todoPage: TodoPage

test.beforeEach(async ({page}) => {
    todoPage = new TodoPage(page)
    await todoPage.openToDoPage()
})

test('Logo is visible', async ({page}) => {
    await expect(todoPage.pageLogo).toBeVisible()
});

test('Create and check 1 task', async ({page}) => {
    await todoPage.inputField.fill('Do exercise')
    await todoPage.inputField.press('Enter')
    expect.soft(await todoPage.counterToDoItems()).toBe(1)
});

test('Delete task by name', async ({page}) => {
    await todoPage.inputField.fill('Do exercise')
    await todoPage.inputField.press('Enter')
    await todoPage.deleteItemByName('Do exercise')
    expect.soft(await todoPage.counterToDoItems()).toBe(0)
});

test('Complete task by name', async ({page}) => {
    await todoPage.inputField.fill('Do exercise')
    await todoPage.inputField.press('Enter')
    await todoPage.completeItemByName('Do exercise')
    await todoPage.checkItemCompletedByName('Do exercise')
});

test('Check buttons are visible', async ({page}) => {
    await todoPage.inputField.fill('Do exercise')
    await todoPage.inputField.press('Enter')
    expect.soft(todoPage.filterAll).toBeVisible()
    expect.soft(todoPage.filterActive).toBeVisible()
    expect.soft(todoPage.filterCompleted).toBeVisible()
    expect.soft(todoPage.buttonClearCompletedTasks).toBeVisible()
});

test('Check toggle-all button completes the task', async ({page}) => {
    await todoPage.inputField.fill('Do exercise')
    await todoPage.inputField.press('Enter')
    await todoPage.buttonSelectAll.click()
    await todoPage.checkItemCompletedByName('Do exercise')
});

